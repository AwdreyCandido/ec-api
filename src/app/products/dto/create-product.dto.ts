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

  constructor(
    storeId: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    imageUrl?: string,
  ) {
    this.storeId = storeId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.imageUrl = imageUrl;
  }
}
