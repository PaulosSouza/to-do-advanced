import 'reflect-metadata';
import fastify from 'fastify';

import { indexRouter } from './http/routers';
import { loadFastifyZod } from './plugins/fastify-zod';
import { loadMongodbConnection } from './libs/mongoose';
import { loadTypeormConnection } from './libs/typeorm';
import { loadFastifyAwilix } from './plugins/fastify-awilix';
import { loadFastifyJwt } from './plugins/fastify-jwt';
import { loadI18nextHttpMiddlewarePlugin } from './plugins/i18next-http-middleware';

const app = fastify();

async function getFastifyServer() {
  // Databases
  await loadMongodbConnection();
  await loadTypeormConnection();

  // Fastify Plugins
  await loadFastifyZod(app);
  await loadFastifyAwilix(app);
  await loadFastifyJwt(app);
  await loadI18nextHttpMiddlewarePlugin(app);

  app.register(indexRouter);

  return app;
}

export { getFastifyServer };
