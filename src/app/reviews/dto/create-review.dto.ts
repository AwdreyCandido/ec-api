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

  constructor(
    userId: number,
    productId: number,
    rating: number,
    comment: string,
  ) {
    this.userId = userId;
    this.productId = productId;
    this.rating = rating;
    this.comment = comment;
  }
}
