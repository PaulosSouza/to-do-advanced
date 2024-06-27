import * as bcrypt from 'bcrypt';

import { HashProvider } from '@/domain/providers/hash-provider';

export class BcryptHashProvider implements HashProvider {
  private readonly HASH_SALT = 10;

  async generate(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.HASH_SALT);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
