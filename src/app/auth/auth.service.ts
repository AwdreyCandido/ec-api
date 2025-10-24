import {
  Body,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async signIn(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (user?.password != loginDto.password) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    return result;
  }

  async signUp(registerDto: RegisterDto) {}
}
