import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderGroup } from './entities/order-group.entity';
import { User } from '../users/entities/user.entity';
import { ShoppingCart } from '../carts/entities/shopping-cart.entity';
import { CartsModule } from '../carts/carts.module';
import { CartItem } from '../carts/entities/cart-item.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    CartsModule,
    TypeOrmModule.forFeature([
      Order,
      OrderGroup,
      User,
      ShoppingCart,
      CartItem,
      Product,
    ]),
  ],
})
export class OrdersModule {}
