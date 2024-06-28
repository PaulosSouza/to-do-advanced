import { buildJsonSchemas, register } from 'fastify-zod';
import type { FastifyInstance } from 'fastify';

import { schemas } from '../http/schemas';

export async function loadFastifyZod(app: FastifyInstance) {
  await register(app, {
    jsonSchemas: buildJsonSchemas(schemas),
    swaggerOptions: {
      openapi: {
        openapi: '3.0.0',
        info: {
          title: 'To do - The New Way',
          description:
            'A comprehensive API for managing your to-do lists efficiently using Fastify.',
          version: '1.0.0',
        },
        tags: [
          {
            name: 'users',
            description: 'Operations related to user management',
          },
          {
            name: 'authentication',
            description: 'Endpoints related to user authentication',
          },
        ],
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
    },
    swaggerUiOptions: {
      routePrefix: '/docs',
    },
  });
}
