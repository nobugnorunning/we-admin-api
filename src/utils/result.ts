import dayjs from "dayjs";
import { PageResult } from "../system/base/base.dto";
import { pick } from "lodash";

export class Result {
  private code: number;
  private success: boolean;
  private message?: string;
  private data?: any;
  private timestamp?: string;

  constructor(
    code: number,
    msg?: string,
    data?: any,
    extra?: Record<string, any>,
  ) {
    this.code = code;
    this.success = code === 200;
    this.message = msg;
    this.data = data || null;
    if (extra) {
      for (const extraKey in extra) {
        this[extraKey] = extra[extraKey];
      }
    }
    this.timestamp = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
  }

  static ok(data?: any, msg: string = "操作成功") {
    return new Result(200, msg, data);
  }

  static fail(code = 201, msg: string = "操作失败", data?: any) {
    return new Result(code, msg, data);
  }

  static page(result: PageResult) {
    const page = pick(result, ["current", "size", "total"]);
    return new Result(200, "操作成功", result.data, {
      ...page,
      hasNextPage: page.current * page.size < page.total,
    });
  }
}
