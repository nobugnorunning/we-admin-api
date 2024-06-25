import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createQueryBuilderWithOrder } from "../../utils/qb.utils";
import { PageResult } from "../base/base.dto";
import {
  CreateOrgDTO,
  OrgPageFilterDTO,
  UpdateOrgDTO,
} from "./organization.dto";
import { OrganizationEntity } from "./organization.entity";

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly orgRepo: Repository<OrganizationEntity>,
  ) {}

  /**
   * Create a new organization
   * @param body
   */
  async create(body: CreateOrgDTO) {
    const org = await this.orgRepo.save(body);
    return await this.orgRepo.findOneBy({
      id: org.id,
    });
  }

  /**
   * update organizations by id
   * @param id
   * @param body
   */
  async update(id: string, body: UpdateOrgDTO) {
    const org = await this.orgRepo.findOneBy({ id });
    if (!org) {
      throw new HttpException("组织不存在", 400);
    }
    return await this.orgRepo.update(id, body);
  }

  /**
   * find organizations list
   */
  async findList() {
    return await this.orgRepo.find();
  }

  /**
   * find organizations page
   * @param pageDto
   */
  async findPage(pageDto: OrgPageFilterDTO): Promise<PageResult> {
    const { current, size, orgName, parentName, parentId, sort } = pageDto;

    const qb = await createQueryBuilderWithOrder("org", this.orgRepo, sort);

    if (orgName) {
      qb.where("org.name like :orgName", { orgName: `%${orgName}%` });
    }
    if (parentName) {
      qb.where("org.parent.name like :parentName", {
        parentName: `%${parentName}%`,
      });
    }
    if (parentId) {
      qb.where("org.parent.id = :parentId", { parentId });
    }

    const [data, total] = await qb
      .skip((current - 1) * size)
      .take(size)
      .getManyAndCount();

    return {
      data,
      total,
      current,
      size,
    };
  }

  /**
   * find organizations by id
   * @param id
   */
  async findById(id: string) {
    return await this.orgRepo.findOneBy({ id });
  }

  async delete(id: string) {
    return await this.orgRepo.delete(id);
  }
}
