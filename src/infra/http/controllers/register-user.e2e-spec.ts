import 'dotenv-flow/config';
import request from 'supertest';

import { getFastifyServer } from '@/infra/app';

describe('Register (e2e)', async () => {
  const app = await getFastifyServer();

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register a user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1@Password123',
    });

    console.log(response.body);

    expect(response.statusCode).toEqual(201);
  });
});
