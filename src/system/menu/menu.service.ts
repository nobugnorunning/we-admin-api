import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createQueryBuilderWithOrder } from "../../utils/qb.utils";
import { TreeUtils } from "../../utils/tree";
import { CreateMenuDTO } from "./menu.dto";
import { MenuEntity } from "./menu.entity";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepo: Repository<MenuEntity>,
  ) {}

  async create(body: CreateMenuDTO) {
    const menu = await this.menuRepo.save(body);
    return await this.menuRepo.findOne({
      where: { id: menu.id },
    });
  }

  async list() {
    return await this.menuRepo.find();
  }

  async tree() {
    const qb = await createQueryBuilderWithOrder(
      "menu",
      this.menuRepo,
      "order_asc,createTime_desc",
    );

    /** 找到根菜单，就是父级为LAYOUT的菜单 */
    const rootMenus = await qb
      .where({
        parent: "LAYOUT",
      })
      .getMany();

    return await TreeUtils.buildTree<MenuEntity>(rootMenus, (item) => {
      return qb
        .where({
          parent: item.path,
        })
        .getMany();
    });
  }
}
