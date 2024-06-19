/* eslint-disable promise/catch-or-return */
import { log } from 'node:console';

import { getFastifyServer } from './app';
import { env } from './env';

const server = getFastifyServer();

server
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    log('🚀 Http Server Running');
  });
