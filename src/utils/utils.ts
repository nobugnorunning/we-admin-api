import { BadRequestException } from "@nestjs/common";

type OrderType = "ASC" | "DESC";

type SortItem = [string, OrderType];

type SortType = SortItem[];

export const ORDER_TYPE = ["ASC", "DESC"];

export class Utils {
  static parseSortField(sort: string | string[] | string[][]): SortType {
    /**
     * string : "field1_asc,field2_desc"
     * */

    // 处理空值情况（这种情况不能处理二维数组中第一个元素为空数组的情况）
    if (!sort || !sort.length) {
      return [["create_time", "DESC"]];
    }

    function parseStringType(sort: string): SortType {
      const errorMsg =
        "Invalid sort format, string type should be like 'field1_asc,field2_desc'";
      const arr = sort.split(",");
      return arr.map((item) => {
        if (!item.includes("_")) {
          throw new BadRequestException(errorMsg);
        }
        // 校验格式
        const [field, order] = item.split("_");
        if (!ORDER_TYPE.includes(order.toUpperCase())) {
          throw new BadRequestException(errorMsg);
        }
        return [field, order.toUpperCase() as OrderType];
      });
    }

    // 流程到达此处，说明sort字段一定有值
    if (typeof sort === "string") {
      // string形式的只会有一种情况
      return parseStringType(sort);
    } else {
      throw new BadRequestException(
        "Invalid sort format, string type should be like 'field1_asc,field2_desc'",
      );
      // // 数组形式的
      // return sort.map((item: string | string[]) => {
      //   if (typeof item === "string") {
      //     if (item.indexOf("_") !== -1) {
      //       // ["field1_asc", "field2_desc"]
      //       return parseStringType(item).flat(1);
      //     } else {
      //       throw new BadRequestException(
      //         "Invalid sort format, string type should be like `['field1_asc', 'field2_desc']`",
      //       );
      //     }
      //   } else {
      //     // 二维数组形式的 item : string[]
      //   }
      // });
    }
  }
}
