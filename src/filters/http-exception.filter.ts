import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Result } from "../utils/result";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as
      | Record<string, any>
      | string;
    const message: string =
      typeof exceptionResponse !== "string"
        ? exceptionResponse.message
        : exceptionResponse;
    response.status(200).json({
      ...Result.fail(status, message),
      path: request.url,
    });
  }
}
