import fastify from 'fastify';

import { loadFastifySwaggerPlugin } from './plugins/fastify-swagger';

const app = fastify();

function getFastifyServer() {
  loadFastifySwaggerPlugin(app);

  return app;
}

export { getFastifyServer };
