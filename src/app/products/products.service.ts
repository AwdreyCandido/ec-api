import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Review } from '../reviews/entities/review.entity';
import { Store } from '../stores/entities/store.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { storeId, ...rest } = createProductDto;

    const store = await this.storesRepository.findOneBy({ id: storeId });
    if (!store) throw new NotFoundException('Store not found');

    const product = this.productsRepository.create({
      ...rest,
      store,
    });

    return this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find({ relations: ['reviews'] });
  }

  findOne(id: number) {
    return this.productsRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    const { storeId, ...data } = updateProductDto;
    if (storeId) product.store = { id: storeId } as any;

    Object.assign(product, data);

    return this.productsRepository.save(product);
  }

  remove(id: number) {
    return this.productsRepository.delete({ id });
  }

  /* GET RELATIONS */

  async getProductReviews(productId: number) {
    const reviews = await this.reviewsRepository
      .createQueryBuilder('review')
      .leftJoin('review.user', 'user')
      .addSelect(['user.id', 'user.name'])
      .where('review.productId = :productId', { productId })
      .orderBy('review.createdAt', 'DESC')
      .getMany();

    return reviews;
  }
}
