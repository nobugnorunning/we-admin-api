import { Controller, Post, Put } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

@Controller("organization")
export class OrganizationController {
  constructor() {}

  @ApiOperation({ summary: "创建组织" })
  @Post("create")
  async create() {}

  @ApiOperation({ summary: "更新组织" })
  @Put(":id")
  async update() {}
}
