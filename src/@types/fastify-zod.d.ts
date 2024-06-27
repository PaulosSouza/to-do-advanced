import type { FastifyZod } from 'fastify-zod';

import { schemas } from '@/infra/http/schemas';

declare module 'fastify' {
  interface FastifyInstance {
    readonly zod: FastifyZod<typeof schemas>;
  }
}
