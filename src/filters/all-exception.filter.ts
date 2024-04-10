import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Result } from "../utils/result";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      throw new HttpException(
        {
          message: (exception.getResponse() as Record<string, any>).message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    response.status(status).json({
      ...Result.fail(status, (exception as Record<string, any>).message),
      path: request.url,
    });
  }
}
