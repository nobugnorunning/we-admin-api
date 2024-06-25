import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PageDTO } from "../base/base.dto";

export class CreateOrgDTO {
  @ApiProperty({ description: "组织名称" })
  @IsString()
  @IsNotEmpty()
  orgName: string;

  @ApiProperty({ description: "上级组织id" })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiProperty({ description: "上级组织名称" })
  @IsString()
  @IsOptional()
  parentName?: string;
}

export class UpdateOrgDTO {
  @ApiProperty({ description: "组织名称" })
  @IsString()
  @IsOptional()
  orgName?: string;

  @ApiProperty({ description: "上级组织id" })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiProperty({ description: "上级组织名称" })
  @IsString()
  @IsOptional()
  parentName?: string;
}

export class OrgFilterDTO {
  @ApiProperty({ description: "组织名称" })
  @IsString()
  @IsOptional()
  orgName?: string;

  @ApiProperty({ description: "上级组织id" })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiProperty({ description: "上级组织名称" })
  @IsString()
  @IsOptional()
  parentName?: string;
}

export class OrgPageFilterDTO extends PageDTO{
  @ApiProperty({ description: "组织名称" })
  @IsString()
  @IsOptional()
  orgName?: string;

  @ApiProperty({ description: "上级组织id" })
  @IsString()
  @IsOptional()
  parentId?: string;

  @ApiProperty({ description: "上级组织名称" })
  @IsString()
  @IsOptional()
  parentName?: string;
}
