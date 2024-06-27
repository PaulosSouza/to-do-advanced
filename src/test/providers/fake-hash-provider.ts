import { HashProvider } from '@/domain/providers/hash-provider';

export class FakeHashProvider implements HashProvider {
  async generate(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }
}
