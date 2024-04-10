import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { PasswordValidator } from "../base/custom.validate";

export class LoginByUserNameDTO {
  @ApiProperty({ description: "用户名" })
  @IsNotEmpty({ message: "用户名不能为空" })
  @IsString({ message: "用户名必须为 string" })
  @MinLength(1, { message: "用户名至少1个字符" })
  @MaxLength(20, { message: "用户名最多20个字符" })
  readonly userName: string;

  @ApiProperty({ description: "密码" })
  @IsNotEmpty()
  @IsString({ message: "用户名必须为 string" })
  readonly password: string;
}

export class ResetPasswordDTO {
  @ApiProperty({ description: "用户id" })
  @IsNotEmpty()
  @IsString({ message: "用户id必须为 string" })
  readonly id: string;

  @ApiProperty({ description: "旧密码" })
  @IsNotEmpty()
  @IsString({ message: "旧密码必须为 string" })
  readonly oldPassword: string;

  @ApiProperty({ description: "新密码" })
  @IsNotEmpty()
  @IsString({ message: "新密码必须为 string" })
  @Validate(PasswordValidator)
  readonly newPassword: string;

  @ApiProperty({ description: "确认新密码" })
  @IsNotEmpty()
  @IsString({ message: "确认新密码必须为 string" })
  readonly confirmNewPassword: string;
}
