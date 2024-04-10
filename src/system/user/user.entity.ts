import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity("we_system_user")
export class UserEntity extends BaseEntity {
  @ApiProperty({ type: String, description: "用户名" })
  @Column({
    type: "varchar",
    length: 100,
    name: "user_name",
    comment: "用户名",
    nullable: false,
    unique: true,
  })
  userName: string;

  @ApiProperty({ type: String, description: "密码" })
  @Column({
    type: "varchar",
    length: 100,
    name: "password",
    comment: "密码",
    nullable: false,
    select: false,
  })
  password: string;

  @ApiProperty({ type: String, description: "手机号" })
  @Column({
    type: "varchar",
    length: 11,
    name: "phone",
    comment: "手机号",
    nullable: false,
    unique: true,
  })
  phone: string;

  @ApiProperty({ type: String, description: "用户工号" })
  @Column({
    type: "varchar",
    length: 100,
    comment: "用户工号",
  })
  code?: string;

  @ApiProperty({ type: String, description: "组织id" })
  @Column({
    type: "varchar",
    length: 100,
    name: "org_id",
    comment: "组织名称",
  })
  orgId?: string;

  @ApiProperty({ type: String, description: "组织名称" })
  @Column({
    type: "varchar",
    length: 100,
    name: "org_name",
    comment: "组织名称",
  })
  orgName?: string;

  @ApiProperty({ type: String, description: "部门id" })
  @Column({
    type: "varchar",
    length: 100,
    name: "department_id",
    comment: "部门id",
  })
  departmentId?: string;

  @ApiProperty({ type: String, description: "部门名称" })
  @Column({
    type: "varchar",
    length: 100,
    name: "department_name",
    comment: "部门名称",
  })
  departmentName?: string;

  @ApiProperty({ type: String, description: "职位id" })
  @Column({
    type: "varchar",
    length: 100,
    name: "ocp_id",
    comment: "职位id",
  })
  ocpId?: string;

  @ApiProperty({ type: String, description: "职位名称" })
  @Column({
    type: "varchar",
    length: 100,
    name: "ocp_name",
    comment: "职位名称",
  })
  ocpName?: string;

  @ApiProperty({ type: Number, description: "性别：1男 2女" })
  @Column({
    type: "tinyint",
    comment: "性别： 1男 2女",
  })
  gender?: number;

  @ApiProperty({ type: String, description: "用户头像" })
  @Column({
    type: "varchar",
    length: 100,
    comment: "头像",
  })
  avatar?: string;

  @ApiProperty({ type: String, description: "邮箱" })
  @Column({
    type: "varchar",
    length: 100,
    comment: "邮箱",
  })
  email?: string;

  @ApiProperty({ type: String, description: "个性签名" })
  @Column({
    type: "varchar",
    length: 100,
    comment: "个性签名",
  })
  sign?: string;
}
