import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

export function loadFastifySwaggerPlugin(app: FastifyInstance) {
  app.register(fastifySwagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'To do - The New Way',
        description: 'Testing the Fastify swagger API',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      servers: [
        {
          url: 'http://localhost:3333',
          description: 'Development server',
        },
      ],
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });

  const buildSchemas = [];

  const schemas = buildSchemas.flat();

  for (const schema of schemas) {
    app.addSchema(schema);
  }
}
