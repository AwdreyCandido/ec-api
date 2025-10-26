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

  constructor(
    name: string,
    description: string,
    email: string,
    phone: string,
    logoUrl?: string,
    ratings?: number,
  ) {
    this.name = name;
    this.description = description;
    this.email = email;
    this.phone = phone;
    this.logoUrl = logoUrl;
    this.ratings = ratings;
  }
}
