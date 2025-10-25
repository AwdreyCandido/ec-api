import { IsInt, IsPositive } from 'class-validator';

export class AddCartItemDto {
  @IsInt()
  cartId: number;

  @IsInt()
  productId: number;

  @IsInt()
  // @IsPositive()
  quantity: number = 1;
}
