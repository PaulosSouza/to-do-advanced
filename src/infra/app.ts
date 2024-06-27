import 'reflect-metadata';
import fastify from 'fastify';

import { indexRouter } from './http/routers';
import { loadFastifyZod } from './plugins/fastify-zod';
import { loadMongodbConnection } from './libs/mongoose';
import { loadTypeormConnection } from './libs/typeorm';
import { loadFastifyAwilix } from './plugins/fastify-awilix';

const app = fastify();

async function getFastifyServer() {
  // Databases
  await loadMongodbConnection();
  await loadTypeormConnection();

  // Fastify Plugins
  await loadFastifyZod(app);
  await loadFastifyAwilix(app);

  app.register(indexRouter);

  return app;
}

export { getFastifyServer };
