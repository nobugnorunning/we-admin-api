import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class PageDTO {
  @ApiProperty({ description: "当前获取的页码" })
  @IsNumber()
  @IsNotEmpty()
  pageNum: number;

  @ApiProperty({ description: "当前获取的数量" })
  @IsNumber()
  @IsNotEmpty()
  pageSize: number;
}

export class PageResult {
  data: any;
  page: {
    current: number;
    size: number;
    total: number;
  };
}
