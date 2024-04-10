import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./config/config";
import { AuthGuard } from "./guards/auth.guard";
import { UserModule } from "./system/user/user.module";
import { AuthModule } from "./system/auth/auth.module";
import { OrganizationModule } from "./system/organization/organization.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "mysql",
          autoLoadEntities: true,
          keepConnectionAlive: true,
          dateStrings: true,
          ...config.get("db.mysql"),
        } as TypeOrmModuleOptions;
      },
    }),
    UserModule,
    AuthModule,
    JwtModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
