import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  productId: number;

  @IsInt()
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
