import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { PageDTO } from "../base/base.dto";
import { PasswordValidator } from "../base/custom.validate";

export class CreateUserDTO {
  @ApiProperty({ description: "用户名" })
  @IsString({ message: "userName 类型错误，正确类型 string" })
  @IsNotEmpty({ message: "userName 不能为空" })
  @MinLength(1, { message: "用户名至少1个字符" })
  @MaxLength(20, { message: "用户名最多20个字符" })
  readonly userName: string;

  @ApiProperty({ description: "密码" })
  @IsString()
  @IsNotEmpty()
  @Validate(PasswordValidator)
  password: string;
}

export class UpdateUserDTO {
  @ApiProperty({ description: "用户名" })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @IsOptional()
  userName?: string;

  @ApiProperty({ description: "手机号" })
  @IsString()
  @Length(11, 11)
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: "组织id" })
  @IsString()
  @IsOptional()
  orgId?: string;

  @ApiProperty({ description: "组织名称" })
  @IsString()
  @IsOptional()
  orgName?: string;

  @ApiProperty({ description: "部门id" })
  @IsString()
  @IsOptional()
  departmentId?: string;

  @ApiProperty({ description: "部门名称" })
  @IsString()
  @IsOptional()
  departmentName?: string;

  @ApiProperty({ description: "职位id" })
  @IsString()
  @IsOptional()
  ocpId?: string;

  @ApiProperty({ description: "职位名称" })
  @IsString()
  @IsOptional()
  ocpName?: string;

  @ApiProperty({ description: "邮箱" })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: "头像" })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: "个签" })
  @IsString()
  @IsOptional()
  sign?: string;
}

export class UserFilterDTO {
  @ApiProperty({ description: "用户名" })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({ description: "手机号" })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: "邮箱" })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: "组织id" })
  @IsString()
  @IsOptional()
  orgId?: string;
}

export class UserPageFilterDTO extends PageDTO {
  @ApiProperty({ description: "用户名" })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({ description: "手机号" })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: "邮箱" })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: "组织id" })
  @IsString()
  @IsOptional()
  orgId?: string;
}
