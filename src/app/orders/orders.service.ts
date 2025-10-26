import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderGroup } from './entities/order-group.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { CartsService } from '../carts/carts.service';
import { CartItem } from '../carts/entities/cart-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderGroup)
    private ordersGroupRepository: Repository<OrderGroup>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(CartItem)
    private cartItemsRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private cartsService: CartsService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto[]) {
    // CREATE ORDER GROUP
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['cart'],
    });

    if (!user) throw new NotFoundException('User not found');

    const totalAmount = createOrderDto.reduce(
      (sum, item) => sum + item.totalAmount,
      0,
    );
    const totalShipping = createOrderDto.reduce(
      (sum, item) => sum + item.shipping,
      0,
    );

    const orderGroup = this.ordersGroupRepository.create({
      user,
      totalAmount,
      totalShipping,
    });
    await this.ordersGroupRepository.save(orderGroup);

    // CREATE ORDERS BY PRODUCT
    const orders = createOrderDto.map((item) =>
      this.ordersRepository.create({
        user,
        product: { id: item.productId } as Product,
        orderGroup,
        quantity: item.quantity,
        price: item.price,
        shipping: item.shipping,
        totalAmount: item.totalAmount,
        status: item.status,
      }),
    );

    await this.ordersRepository.save(orders);

    //  UPDATE PRODUCT STOCK
    for (const item of createOrderDto) {
      await this.productsRepository
        .createQueryBuilder()
        .update(Product)
        .set({ stock: () => `stock - ${item.quantity}` })
        .where('id = :id AND stock >= :quantity', {
          id: item.productId,
          quantity: item.quantity,
        })
        .execute();
    }

    // REMOVE ITEMS FROM CART
    for (const item of createOrderDto) {
      await this.cartItemsRepository.delete({
        cart: { id: user.cart.id },
        product: { id: item.productId },
      });
    }

    const safeOrders = orders.map((item) => {
      const { orderGroup, user, ...rest } = item;
      return rest;
    });

    return {
      orderGroup: {
        id: orderGroup.id,
        totalAmount: orderGroup.totalAmount,
        totalShipping: orderGroup.totalShipping,
      },
      orders: safeOrders,
    };
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOrders(userId: number) {
    return this.ordersGroupRepository.find({
      where: { user: { id: userId } },
      relations: ['orders', 'orders.product'],
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
