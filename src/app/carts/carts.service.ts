import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from '../carts/dto/create-cart.dto';
import { UpdateCartDto } from '../carts/dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from '../carts/entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from '../carts/entities/cart-item.entity';
import { AddCartItemDto } from '../carts/dto/add-cart-item.dto';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ShoppingCart)
    private shoppingCartsRepository: Repository<ShoppingCart>,
    @InjectRepository(CartItem)
    private cartItemsRepository: Repository<CartItem>,
  ) {}

  async addItemToCart(addItemDto: AddCartItemDto) {
    const { cartId, productId, quantity } = addItemDto;

    const cart = await this.shoppingCartsRepository.findOne({
      where: { id: cartId },
      relations: ['items'],
    });
    if (!cart) throw new NotFoundException(`Cart not found`);

    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) throw new NotFoundException(`Prod not found`);

    /* CHECK IF PRODUCT IS ALREADY IN THE CART */
    const existingItem = cart.items.find(
      (item) => item.product.id === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.unitPrice * existingItem.quantity;
      await this.cartItemsRepository.save(existingItem);
      return existingItem;
    }
    /* --------------------------------------- */

    const cartItem = this.cartItemsRepository.create({
      cart,
      product,
      quantity,
      unitPrice: product?.price,
      totalPrice: product!.price * quantity,
    });

    return this.cartItemsRepository.save(cartItem);
  }

  getAllCartItems(cartId: number) {
    return this.shoppingCartsRepository.findOne({
      where: { id: cartId },
      relations: ['items', 'items.product'],
    });
  }

  remove(productId: number) {
    return this.cartItemsRepository.delete(productId);
  }
}
