import { IsEnum, IsInt, IsNumber } from 'class-validator';
import { ORDER_STATUS } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  orderGroupId: number;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  shipping: number;

  @IsNumber()
  totalAmount: number;

  @IsEnum(ORDER_STATUS)
  role: ORDER_STATUS = ORDER_STATUS.PENDING;
}
