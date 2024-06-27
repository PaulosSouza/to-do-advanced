import { DataSource } from 'typeorm';

import { env } from '../env';
import { TypeormAuditModel } from '../databases/typeorm/models/typeorm-audit-model';
import { CreateAudits1719167162794 } from '../databases/typeorm/migrations/1719167162794-create-audits';

export const appDataSource = new DataSource({
  type: 'postgres',
  url: env.POSTGRESQL_URL,
  schema: env.POSTGRESQL_SCHEMA,
  entities: [TypeormAuditModel],
  migrations: [CreateAudits1719167162794],
  migrationsRun: true,
});

export async function loadTypeormConnection() {
  await appDataSource.initialize();

  return appDataSource;
}
