import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "../../decorators/public";
import { Result } from "../../utils/result";
import { PageDTO } from "../base/base.dto";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import { UserService } from "./user.service";

@ApiTags("用户")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "注册用户" })
  @Post("create")
  @Public()
  async create(@Body() body: CreateUserDTO) {
    return Result.ok(await this.userService.create(body));
  }

  @ApiOperation({ summary: "更新用户" })
  @Put(":id")
  async update(@Param("id") id: string, @Body() body: UpdateUserDTO) {
    return Result.ok(await this.userService.update(id, body));
  }

  @ApiOperation({ summary: "查找用户列表" })
  @Post("list")
  async findList() {
    const data = await this.userService.findList();
    return Result.ok(data);
  }

  @ApiOperation({ summary: "分页查找用户" })
  @Post("page")
  async findPage(@Body() body: PageDTO) {
    const pageResult = await this.userService.findPage(body);
    return Result.page(pageResult);
  }

  @ApiOperation({ summary: "根据id查找用户" })
  @Get(":id")
  async findUserById(@Param("id") id: string) {
    return Result.ok(await this.userService.findByUserId(id));
  }

  @ApiOperation({ summary: "删除用户" })
  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    await this.userService.delete(id);
    return Result.ok();
  }
}
