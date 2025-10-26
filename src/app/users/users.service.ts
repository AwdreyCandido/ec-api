import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from '../carts/entities/shopping-cart.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ShoppingCart)
    private shoppingCartsRepository: Repository<ShoppingCart>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let exists: User | null = null;
    let user: User;

    try {
      exists = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      console.error('Database error on findOne:', error);
      throw new RequestTimeoutException('Unable to process the request', {
        description:
          'Error connecting to the database while checking existing user',
      });
    }

    if (exists) {
      throw new BadRequestException(
        'The user already exists, please check your email',
      );
    }

    try {
      user = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(user);
    } catch (error) {
      console.error('Database error on save user:', error);
      throw new InternalServerErrorException('Failed to create user', {
        description: 'Error saving the user to the database',
      });
    }

    try {
      const cart = this.shoppingCartsRepository.create({ user });
      await this.shoppingCartsRepository.save(cart);
    } catch (error) {
      console.error('Database error on save cart:', error);
      throw new InternalServerErrorException('Failed to create shopping cart', {
        description: 'Error saving the shopping cart to the database',
      });
    }

    try {
      return await this.usersRepository.findOne({
        where: { id: user.id },
        relations: ['cart'],
      });
    } catch (error) {
      console.error('Database error on return user:', error);
      throw new InternalServerErrorException('Failed to fetch user', {
        description: 'Error retrieving the user with cart from the database',
      });
    }
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['cart'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['cart'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }

  async remove(id: number) {
    return await this.usersRepository.delete({ id });
  }
}
