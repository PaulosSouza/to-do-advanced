export interface HashProvider {
  generate(plain: string): Promise<string>;
  compare(plain: string, hash: string): Promise<boolean>;
}
