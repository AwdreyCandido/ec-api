import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { USER_ROLE } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @MaxLength(60)
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @MaxLength(60)
  @MinLength(3)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
  password: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsEnum(USER_ROLE)
  role: USER_ROLE = USER_ROLE.CLIENT;

  constructor(
    name: string,
    email: string,
    password: string,
    address?: string,
    role?: USER_ROLE,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address ?? '';
    this.role = role ?? USER_ROLE.CLIENT;
  }
}
