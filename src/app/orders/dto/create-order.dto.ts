import { IsEnum, IsInt, IsNumber } from 'class-validator';
import { ORDER_STATUS } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  productId: number;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  shipping: number;

  @IsNumber()
  totalAmount: number;

  @IsEnum(ORDER_STATUS)
  status: ORDER_STATUS = ORDER_STATUS.PENDING;

  constructor(
    userId: number,
    productId: number,
    quantity: number,
    price: number,
    shipping: number,
    totalAmount: number,
    status?: ORDER_STATUS,
  ) {
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.shipping = shipping;
    this.totalAmount = totalAmount;
    if (status) this.status = status;
  }
}
