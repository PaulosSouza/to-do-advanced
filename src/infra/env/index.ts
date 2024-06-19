/* eslint-disable no-process-env */
import { error } from 'node:console';
import process from 'node:process';

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
});

const envParsed = envSchema.safeParse(process.env);

if (envParsed.success === false) {
  error('Invalid environment variables.', envParsed.error.format());

  throw new Error('Invalid environment variables.');
}

export const env = envParsed.data;
