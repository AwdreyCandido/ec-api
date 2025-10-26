import { IsNumber } from 'class-validator';

export class OrdergroupDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  totalShipping: number;

  @IsNumber()
  totalAmount: number;

  constructor(userId: number, totalShipping: number, totalAmount: number) {
    this.userId = userId;
    this.totalShipping = totalShipping;
    this.totalAmount = totalAmount;
  }
}
