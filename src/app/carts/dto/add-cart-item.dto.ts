import { IsInt } from 'class-validator';

export class AddCartItemDto {
  @IsInt()
  cartId: number;

  @IsInt()
  productId: number;

  @IsInt()
  quantity: number = 1;

  constructor(cartId: number, productId: number, quantity: number = 1) {
    this.cartId = cartId;
    this.productId = productId;
    this.quantity = quantity;
  }
}
