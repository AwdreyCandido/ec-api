import { IsNumber } from 'class-validator';

export class OrdergroupDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  totalShipping: number;

  @IsNumber()
  totalAmount: number;
}
