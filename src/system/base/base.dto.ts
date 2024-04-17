import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
// import { SortValidator } from "./custom.validate";

export class PageDTO {
  @ApiProperty({ description: "当前获取的页码" })
  // @IsNumber()
  @IsNotEmpty()
  pageNum: number;

  @ApiProperty({ description: "当前获取的数量" })
  // @IsNumber()
  @IsNotEmpty()
  pageSize: number;

  @ApiProperty({ description: "排序字段" })
  // @Validate(SortValidator)
  @IsOptional()
  sort?: string;
}

export class PageResult {
  data: any;
  page: {
    current: number;
    size: number;
    total: number;
  };
}
