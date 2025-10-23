import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  storeId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  stock: number;
}
