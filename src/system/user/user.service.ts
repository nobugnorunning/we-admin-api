import { forwardRef, HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createQueryBuilderWithOrder } from "../../utils/qb.utils";
// import { createQueryBuilderWithOrder } from "../../utils/qb.utils";
// import { Utils } from "../../utils/utils";
import { AuthService } from "../auth/auth.service";
import { PageResult } from "../base/base.dto";
import { CreateUserDTO, UpdateUserDTO, UserFilterDTO } from "./user.dto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * 创建用户
   * @param user 用户注册的基础信息
   * @return UserEntity 创建好的用户信息
   */
  async create(user: CreateUserDTO) {
    user.password = await this.authService.encrypt(user.password);
    const newUser = await this.userRepo.save(user);
    return await this.userRepo.findOneBy({
      id: newUser.id,
    });
  }

  /**
   * 查找所有用户
   */
  async findList() {
    return await this.userRepo.find();
  }

  /**
   * 查询用户分页
   * @param pageDto
   */
  async findPage(pageDto: UserFilterDTO): Promise<PageResult> {
    const { pageNum, pageSize, userName, phone, email, orgId, sort } = pageDto;

    const qb = await createQueryBuilderWithOrder("user", this.userRepo, sort);

    // 添加 where 条件
    if (userName) {
      qb.where("user.userName like :userName", {
        userName: `%${userName}%`,
      });
    }

    if (phone) {
      qb.andWhere("user.phone like :phone", { phone: `%${phone}%` });
    }

    if (email) {
      qb.andWhere("user.email like :email", { email: `%${email}%` });
    }

    if (orgId) {
      qb.andWhere("user.orgId = :orgId", { orgId });
    }

    const [data, total] = await qb
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    return {
      data,
      page: {
        total,
        current: pageNum,
        size: pageSize,
      },
    };
  }

  /**
   * 根据用户名查找用户
   * @param name 用户名
   * @param withPWD 查询结果是否返回密码
   */
  async findByUserName(name: string, withPWD = false) {
    return await this.userRepo
      .createQueryBuilder("user")
      .where("user.userName = :name", { name })
      .addSelect(withPWD ? "user.password" : "")
      .getOne();
  }

  /**
   * 根据手机号查找用户
   * @param phone 手机号
   */
  async findByUserPhone(phone: string) {
    return await this.userRepo.findOneBy({
      phone,
    });
  }

  /**
   * 根据id查找用户信息
   * @param id 用户id
   * @param withPWD 查询结果是否返回密码
   */
  async findByUserId(id: string, withPWD = false) {
    return await this.userRepo
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .addSelect(withPWD ? "user.password" : "")
      .getOne();
  }

  /**
   * 更新用户信息
   * @param id 用户id
   * @param body 用户更新的信息
   * @return UserEntity 更新后的用户信息
   */
  async update(id: string, body: UpdateUserDTO) {
    const oldUser = await this.findByUserId(id, true);
    Object.assign(oldUser, body);
    await this.userRepo.save(oldUser);
    return await this.findByUserId(id);
  }

  async delete(id: string) {
    const exist = await this.userRepo.existsBy({ id });
    if (!exist) {
      throw new HttpException("用户不存在", 400);
    }
    return await this.userRepo.delete({
      id,
    });
  }
}
