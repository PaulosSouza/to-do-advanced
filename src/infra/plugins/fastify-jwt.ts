import fastifyJwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';

import { env } from '../env';

export async function loadFastifyJwt(app: FastifyInstance) {
  await app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
      expiresIn: '10m',
    },
  });
}
