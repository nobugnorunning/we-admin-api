import { HttpException, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AllExceptionFilter } from "./filters/all-exception.filter";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
// import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  /** 全局配置 */
  const config = app.get(ConfigService);
  const port = config.get<number>("app.port");
  const prefix = config.get<string>("app.prefix");
  app.setGlobalPrefix(prefix);

  /** Swagger */
  const options = new DocumentBuilder()
    .setTitle("we-admin")
    .setDescription("nestjs-end")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const swaggerPath = `${prefix}/docs`;
  SwaggerModule.setup(swaggerPath, app, document);

  /** 捕捉异常 */
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  /** 拦截器 */
  // app.useGlobalInterceptors(new TransformInterceptor());

  /** 添加验证 */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: config.get<string>("env") === "development", // 开发环境
      disableErrorMessages: false,
      stopAtFirstError: true, // 在第一个错误处停止验证
      exceptionFactory(error) {
        console.log(error);
        throw new HttpException(
          {
            // message: `invalid param: ${error[0].property}, ${JSON.stringify(error[0].constraints)}`,
            message: `invalid param: ${error[0].property}`,
          },
          400,
        );
      },
    }),
  );

  await app.listen(port);
}
bootstrap().then((r) => r);
