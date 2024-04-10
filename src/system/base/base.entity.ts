import { ApiProperty } from "@nestjs/swagger";
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class BaseEntity {
  @ApiProperty({ type: String, description: "id" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ type: Date, description: "创建时间" })
  @CreateDateColumn({
    type: "timestamp",
    name: "create_time",
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createTime: Date;

  @ApiProperty({ type: Date, description: "更新时间" })
  @UpdateDateColumn({
    type: "timestamp",
    name: "update_time",
    comment: "更新时间",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updateTime: Date;
}
