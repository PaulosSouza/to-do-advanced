import fastify from 'fastify';

const app = fastify();

function getFastifyServer() {
  return app;
}

export { getFastifyServer };
