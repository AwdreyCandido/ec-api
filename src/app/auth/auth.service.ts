import {
  Body,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { HashingProvider } from './providers/hashing.provider';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { ShoppingCart } from '../carts/entities/shopping-cart.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => HashingProvider))
    private hashingProvider: HashingProvider,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ShoppingCart)
    private shoppingCartsRepository: Repository<ShoppingCart>,
  ) {}

  async signIn(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (!user) throw new NotFoundException('User not found');

    const exists = await this.hashingProvider.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!exists) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    return result;
  }

  async signUp(registerDto: CreateUserDto) {
    const hashed = await this.hashingProvider.hashPassword(
      registerDto.password,
    );

    const user = await this.usersService.create({
      ...registerDto,
      password: hashed,
    });
    if (!user) throw new Error('Unable to create new user');

    const { password, ...result } = user;

    return result;
  }
}
