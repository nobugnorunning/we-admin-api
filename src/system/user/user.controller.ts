import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "../../decorators/public";
import { Result } from "../../utils/result";
import { CreateUserDTO, UpdateUserDTO, UserPageFilterDTO } from "./user.dto";
import { UserService } from "./user.service";

@ApiTags("用户")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "注册用户" })
  @Post()
  @Public()
  async create(@Body() body: CreateUserDTO) {
    return Result.ok(await this.userService.create(body));
  }

  @ApiOperation({ summary: "更新用户" })
  @Patch(":id")
  async update(@Param("id") id: string, @Body() body: UpdateUserDTO) {
    return Result.ok(await this.userService.update(id, body));
  }

  @ApiOperation({ summary: "查找用户列表" })
  @Post("list")
  async list() {
    const data = await this.userService.findList();
    return Result.ok(data);
  }

  @ApiOperation({ summary: "分页查找用户" })
  @Post("page")
  async page(@Body() body: UserPageFilterDTO) {
    const pageResult = await this.userService.findPage(body);
    return Result.page(pageResult);
  }

  @ApiOperation({ summary: "根据id查找用户" })
  @Get(":id")
  async detail(@Param("id") id: string) {
    return Result.ok(await this.userService.findByUserId(id));
  }

  @ApiOperation({ summary: "获取用户信息" })
  @Get()
  async userInfo(@Req() req: Request) {
    const user = await this.userService.findByUserId(req["user"]["id"]);
    return Result.ok(user);
  }

  @ApiOperation({ summary: "删除用户" })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    await this.userService.delete(id);
    return Result.ok();
  }
}
