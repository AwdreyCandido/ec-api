import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsNumber()
  @IsOptional()
  ratings?: number;
}
