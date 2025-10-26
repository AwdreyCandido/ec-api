import { IsInt, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsInt()
  userId: number;

  @IsOptional()
  createdAt?: Date;

  constructor(userId: number, createdAt?: Date) {
    this.userId = userId;
    this.createdAt = createdAt;
  }
}
