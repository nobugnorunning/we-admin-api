import { ApiProperty } from "@nestjs/swagger";
import { Column } from "typeorm";
import { BaseEntity } from "../base/base.entity";

export class OrganizationEntity extends BaseEntity {
  @ApiProperty({ type: String, description: "组织名称" })
  @Column({
    type: "varchar",
    length: 100,
    name: "org_name",
    comment: "组织名称",
    nullable: false,
    unique: true,
  })
  orgName: string;

  @ApiProperty({ type: String, description: "上级组织id" })
  @Column({
    type: "varchar",
    length: 100,
    name: "parent_id",
    comment: "上级组织id",
    unique: true,
  })
  parentId?: string;

  @ApiProperty({ type: String, description: "上级组织名称" })
  @Column({
    type: "varchar",
    length: 100,
    name: "parent_name",
    comment: "上级组织名称",
    unique: true,
  })
  parentName?: string;
}
