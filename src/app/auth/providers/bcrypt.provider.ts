import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async hashPassword(password: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashed = bcrypt.hash(password, salt);
    return hashed;
  }

  comparePassword(password: string | Buffer, encrypted: string): Promise<boolean> {
    return bcrypt.compare(password, encrypted);
  }
}
