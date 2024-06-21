import type { FastifyZod } from 'fastify-zod';

declare module 'fastify' {
  interface FastifyInstance {
    readonly zod: FastifyZod<typeof models>;
  }
}
