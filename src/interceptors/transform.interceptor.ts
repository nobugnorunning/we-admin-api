/** 用来对请求的返回数据进行一层包装 */

import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Result } from "../utils/result";

export class TransformInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<Result> | Promise<Observable<Result>> {
    return next.handle().pipe(map((data) => Result.ok(data)));
  }
}
