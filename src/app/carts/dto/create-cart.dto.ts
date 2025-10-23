import { IsInt, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsInt()
  userId: number;

  @IsOptional()
  createdAt?: Date;
}
