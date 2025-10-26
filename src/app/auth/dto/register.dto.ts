import {
  IsEmail,
  MaxLength,
  MinLength,
  IsString,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class RegisterDto {
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

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
