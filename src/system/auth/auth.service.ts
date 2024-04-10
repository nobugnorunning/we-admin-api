import { forwardRef, HttpException, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { omit } from "lodash";
import ms from "ms";
import { UserEntity } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { LoginByUserNameDTO, ResetPasswordDTO } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 生成密文密码
   * @param pwd 原密码
   * @return Promise<string> 加密后的密码
   */
  async encrypt(pwd: string) {
    return await argon2.hash(pwd);
  }

  /**
   * 验证密码
   * @param hashPwd 加密过的密码
   * @param pwd 输入的密码
   * @return Promise<boolean> 布尔值
   */
  async verify(hashPwd: string, pwd: string) {
    return await argon2.verify(hashPwd, pwd);
  }

  /**
   * 生成token
   * @param payload 载体
   * @return Promise<string> 字符串
   */
  async generateToken(payload: {
    id: string;
    userName: string;
    phone: string;
  }) {
    console.log(ms(await this.configService.get("jwt.expiresIn")));
    return await this.jwtService.signAsync(payload, {
      secret: await this.configService.get("jwt.secret"),
      expiresIn:
        // 这里需要将ms转化为秒，因为jwt模块的expiresIn参数是以秒为单位的
        Number(ms(await this.configService.get("jwt.expiresIn"))) / 1000,
    });
  }

  /**
   * 根据用户名登录
   * @param loginInfo LoginByUserNameDto
   */
  async loginByUserName(loginInfo: LoginByUserNameDTO): Promise<{
    userInfo: Omit<UserEntity, "password">;
    access_token: string;
  }> {
    const { userName, password } = loginInfo;
    const user = await this.userService.findByUserName(userName, true);
    if (!user) {
      throw new HttpException("用户名不存在", 400);
    }
    const verifyRet = await this.verify(user.password, password);
    if (!verifyRet) {
      throw new HttpException("密码错误", 400);
    }

    const token = await this.generateToken({
      id: user.id,
      userName: user.userName,
      phone: user.phone,
    });

    return {
      userInfo: omit(user, "password"),
      access_token: token,
    };
  }

  async resetPassword(dto: ResetPasswordDTO) {
    // TODO: 重置密码
    const { id, oldPassword, newPassword, confirmNewPassword } = dto;

    /** 通过id先把用户查出来 */
    const user = await this.userService.findByUserId(id, true);
    if (!user) {
      throw new HttpException("用户不存在", 400);
    }

    /** 验证新旧密码不能一样 */
    if (newPassword === oldPassword) {
      throw new HttpException("新密码不能和旧密码一样", 400);
    }

    /** 验证旧密码 */
    const verifyRet = await this.verify(user.password, oldPassword);

    if (!verifyRet) {
      throw new HttpException("旧密码错误", 400);
    }

    /** 验证新密码 */
    if (newPassword !== confirmNewPassword) {
      throw new HttpException("两次密码输入不一致", 400);
    }

    user.password = await this.encrypt(newPassword);

    return await this.userService.update(id, user);
  }
}
