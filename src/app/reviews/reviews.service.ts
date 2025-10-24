import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const { userId, productId } = createReviewDto;
    const user = await this.usersRepository.findOneBy({ id: userId });
    const product = await this.usersRepository.findOneBy({ id: productId });

    if (!user || !product) {
      throw new NotFoundException('User or Product not found');
    }

    const review = this.reviewsRepository.create({
      ...createReviewDto,
      user,
      product,
    });
    return this.reviewsRepository.save(review);
  }

  findAll() {
    return this.reviewsRepository.find({
      relations: ['user'],
    });
  }

  findOne(id: number) {
    return this.reviewsRepository.findOneBy({ id });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const { userId, productId, ...rest } = updateReviewDto;

    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });

    if (!review) {
      throw new NotFoundException(`Review not found`);
    }

    if (userId) {
      const user = await this.usersRepository.findOneBy({ id: userId });
      if (!user) throw new NotFoundException(`User not found`);
      review.user = user;
    }

    if (productId) {
      const product = await this.productsRepository.findOneBy({
        id: productId,
      });
      if (!product) throw new NotFoundException(`Product with not found`);
      review.product = product;
    }

    Object.assign(review, rest);

    await this.reviewsRepository.save(review);
    return this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'product'],
    });
  }

  remove(id: number) {
    return this.reviewsRepository.delete(id);
  }
}
