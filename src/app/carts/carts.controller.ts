import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddCartItemDto } from './dto/add-cart-item.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create(@Body() AddCartItemDto: AddCartItemDto) {
    return this.cartsService.addItemToCart(AddCartItemDto);
  }

  @Get(':id')
  getAllCartItems(@Param('id') cartId: number) {
    return this.cartsService.getAllCartItems(cartId);
  }

  @Delete(':id')
  deleteCartItem(@Param('id') cartItemId: number) {
    return this.cartsService.remove(cartItemId);
  }
}
