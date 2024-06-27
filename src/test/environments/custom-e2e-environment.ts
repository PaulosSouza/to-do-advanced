/* eslint-disable no-process-env */
import 'dotenv-flow/config';
import { randomUUID } from 'node:crypto';

import { Environment } from 'vitest';
import dotenvFlow from 'dotenv-flow';

import { loadTypeormConnection } from '@/infra/libs/typeorm';
import { loadMongodbConnection } from '@/infra/libs/mongoose';

dotenvFlow.config({
  default_node_env: process.env.NODE_ENV || 'test',
  files: ['.env', '.env.test'],
});

function generatePostgreSQLDatabaseUrl(schema: string) {
  if (!process.env.POSTGRESQL_URL) {
    throw new Error('Please provide a POSTGRESQL_URL environment variable.');
  }

  const url = new URL(process.env.POSTGRESQL_URL);
  url.searchParams.set('schema', schema);

  return url.toString();
}

function generateMongodbUrl(databaseName: string) {
  if (!process.env.MONGODB_URL) {
    throw new Error('Please provide a POSTGRESQL_URL environment variable.');
  }

  const url = new URL(process.env.MONGODB_URL);
  url.pathname = databaseName;

  return url.toString();
}

export default {
  name: 'custom',
  transformMode: 'ssr',
  async setup(global, options) {
    const randomString = randomUUID();

    const postgresDatabaseURL = generatePostgreSQLDatabaseUrl(randomString);
    const mongodbDatabaseURL = generateMongodbUrl(randomString);

    process.env.POSTGRESQL_URL = postgresDatabaseURL;
    process.env.POSTGRESQL_SCHEMA = randomString;
    process.env.MONGODB_URL = mongodbDatabaseURL;

    const mongodbDataSource = await loadMongodbConnection(mongodbDatabaseURL);
    const typeormDataSource = await loadTypeormConnection();

    await typeormDataSource.query(
      `CREATE SCHEMA IF NOT EXISTS "${randomString}"`,
    );

    return {
      async teardown() {
        await typeormDataSource.query(
          `DROP SCHEMA IF EXISTS "${randomString}" CASCADE`,
        );
        await typeormDataSource.destroy();

        await mongodbDataSource.connection.dropDatabase();
        await mongodbDataSource.connection.destroy();
      },
    };
  },
} as Environment;
