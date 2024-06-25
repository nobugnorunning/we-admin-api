import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateMenuDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsString()
  @IsOptional()
  component?: string;

  @IsNotEmpty()
  @IsBoolean()
  hidden: boolean;

  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsNotEmpty()
  @IsString()
  parent: string;

  @IsString()
  @IsOptional()
  icon?: string;
}
