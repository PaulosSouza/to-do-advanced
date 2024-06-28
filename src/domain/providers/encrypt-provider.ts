export interface EncryptProvider {
  encrypt(payload: Record<string, unknown>): string;
  verify<Payload = Record<string, unknown>>(token: string): Payload;
}
