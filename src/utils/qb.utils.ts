import { Repository, SelectQueryBuilder } from "typeorm";
import { Utils } from "./utils";

// 创建一个基础的查询构造器，带有默认的排序字段
export const createQueryBuilderWithOrder = async <T>(
  alias: string,
  repository: Repository<T>,
  sort: string | string[] | string[][] = [],
): Promise<SelectQueryBuilder<T>> => {
  const queryBuilder = repository.createQueryBuilder(alias);
  const _sort = Utils.parseSortField(sort);
  _sort.forEach((sortItem, index) => {
    const [field, order] = sortItem;
    // 因为数据库中的字段都是 snakeCase 格式，所以这里需要将驼峰格式的字段名转换为 snakeCase 格式
    queryBuilder[index === 0 ? "orderBy" : "addOrderBy"](
      `${alias}.${field}`,
      order,
    );
  });
  return queryBuilder;
};
