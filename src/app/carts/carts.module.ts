import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CartItem } from './entities/cart-item.entity';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [TypeOrmModule.forFeature([User, CartItem, ShoppingCart, Product])],
  exports: [CartsService],
})
export class CartsModule {}
