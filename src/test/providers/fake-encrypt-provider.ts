import { EncryptProvider } from '@/domain/providers/encrypt-provider';

interface FakePayload {
  token: string;
}

export class FakeEncryptProvider implements EncryptProvider {
  public fakePayload = {} as FakePayload;

  encrypt(payload: Record<string, unknown>): string {
    const token = JSON.stringify(payload);

    this.fakePayload = {
      token,
    };

    return token;
  }

  verify<Payload = Record<string, unknown>>(_: string): Payload {
    return {} as unknown as Payload;
  }
}
