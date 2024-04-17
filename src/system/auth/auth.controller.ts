import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "../../decorators/public";
import { Result } from "../../utils/result";
import { LoginByUserNameDTO, ResetPasswordDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

@ApiTags("认证")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "登录" })
  @Post("login")
  @Public()
  async login(@Body() body: LoginByUserNameDTO) {
    const data = await this.authService.loginByUserName(body);
    return Result.ok(data, "登录成功");
  }

  @ApiOperation({ summary: "密码重置" })
  @Post("resetPassword")
  async resetPassword(@Body() body: ResetPasswordDTO) {
    await this.authService.resetPassword(body);
    return Result.ok(null, "密码重置成功");
  }
}
