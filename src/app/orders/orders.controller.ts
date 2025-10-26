import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':id')
  create(
    @Param('id') userId: number,
    @Body() createOrderDto: CreateOrderDto[],
  ) {
    return this.ordersService.create(userId, createOrderDto);
  }

  @Get(':id')
  findOrders(@Param('id') id: string) {
    return this.ordersService.findOrders(+id);
  }
}
