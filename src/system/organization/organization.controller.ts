import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Result } from "../../utils/result";
import {
  CreateOrgDTO,
  OrgPageFilterDTO,
  UpdateOrgDTO,
} from "./organization.dto";
import { OrganizationService } from "./organization.service";

@Controller("organization")
export class OrganizationController {
  constructor(private readonly orgService: OrganizationService) {}

  @ApiOperation({ summary: "创建组织" })
  @Post()
  async create(@Body() body: CreateOrgDTO) {
    return Result.ok(await this.orgService.create(body));
  }

  @ApiOperation({ summary: "更新组织" })
  @Patch(":id")
  async update(@Param("id") id: string, @Body() body: UpdateOrgDTO) {
    return Result.ok(await this.orgService.update(id, body));
  }

  @ApiOperation({ summary: "获取组织列表" })
  @Get()
  async list() {
    return Result.ok(await this.orgService.findList());
  }

  @ApiOperation({ summary: "获取组织分页" })
  @Post("page")
  async page(@Body() body: OrgPageFilterDTO) {
    return Result.page(await this.orgService.findPage(body));
  }

  @ApiOperation({ summary: "获取组织详情" })
  @Get(":id")
  async detail(@Param("id") id: string) {
    return Result.ok(await this.orgService.findById(id));
  }

  @ApiOperation({ summary: "删除组织" })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return Result.ok(await this.orgService.delete(id));
  }
}
