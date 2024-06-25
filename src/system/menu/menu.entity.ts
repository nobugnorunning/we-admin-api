import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base/base.entity";

@Entity("we_system_menu")
export class MenuEntity extends BaseEntity {
  @ApiProperty({ description: "菜单名称" })
  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string; // 菜单名称

  @ApiProperty({ description: "菜单路径" })
  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
    unique: true,
  })
  path: string;

  @ApiProperty({ description: "菜单组件路径" })
  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  component?: string;

  @ApiProperty({ description: "是否隐藏菜单" })
  @Column({
    type: "boolean",
    nullable: false,
    comment: "是否隐藏菜单",
    default: false,
  })
  hidden: boolean; // 是否隐藏菜单

  @ApiProperty({ description: "父菜单" })
  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  parent: string; // 父菜单

  @ApiProperty({ description: "排序值" })
  @Column({
    type: "int",
    nullable: false,
    default: 1,
  })
  order: number; // 菜单排序

  @ApiProperty({ description: "菜单图标" })
  @Column({
    type: "varchar",
  })
  icon?: string; // 菜单图标
}
