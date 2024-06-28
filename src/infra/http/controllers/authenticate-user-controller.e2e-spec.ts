import 'dotenv-flow/config';
import request from 'supertest';

import { getFastifyServer } from '@/infra/app';

describe('Authenticate User (e2e)', async () => {
  const app = await getFastifyServer();

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate a user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1@Password123',
    });

    const response = await request(app.server).post('/login').send({
      email: 'johndoe@example.com',
      password: '1@Password123',
    });

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });
});
