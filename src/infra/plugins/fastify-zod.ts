import { buildJsonSchemas, register } from 'fastify-zod';
import type { FastifyInstance } from 'fastify';

import { schemas } from '../http/schemas';

const { $ref: gefJsonSchemaFn, schemas: jsonSchemas } =
  buildJsonSchemas(schemas);

export async function loadFastifyZod(app: FastifyInstance) {
  await register(app, {
    jsonSchemas: { $ref: gefJsonSchemaFn, schemas: jsonSchemas },
    swaggerOptions: {
      openapi: {
        openapi: '3.1.0',
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

  app.addHook('onRoute', (routeOptions) => {
    if (routeOptions.schema) {
      routeOptions.schema.headers = {
        'accept-language': {
          enum: ['en', 'pt-br'],
          default: 'en',
          description: 'Language preference for the response.',
        },
      };

      const defaultRequestErrorRef = gefJsonSchemaFn(
        'ErrorResponseSchema',
      ).$ref;

      routeOptions.schema.response = {
        400: {
          $ref: defaultRequestErrorRef,
          description: 'Bad Request',
        },
      };
    }
  });
}
