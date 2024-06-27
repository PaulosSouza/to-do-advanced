/* eslint-disable promise/catch-or-return */
import { log } from 'node:console';

import 'dotenv-flow/config';

import { getFastifyServer } from './app';
import { env } from './env';

getFastifyServer().then(async (server) => {
  await server.listen({
    host: '0.0.0.0',
    port: env.PORT,
  });

  log('🚀 Http Server Running');
});
