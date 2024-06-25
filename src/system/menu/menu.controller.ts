import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Result } from "../../utils/result";
import { CreateMenuDTO } from "./menu.dto";
import { MenuService } from "./menu.service";

@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: "创建菜单" })
  @Post()
  async create(@Body() body: CreateMenuDTO) {
    return Result.ok(await this.menuService.create(body));
  }

  @ApiOperation({ summary: "获取菜单列表" })
  @Post("list")
  async list() {
    return Result.ok(await this.menuService.list());
  }

  @ApiOperation({ summary: "获取菜单树" })
  @Post("tree")
  async tree() {
    return Result.ok(await this.menuService.tree());
  }
}
