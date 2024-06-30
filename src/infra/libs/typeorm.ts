import { DataSource } from 'typeorm';

import { env } from '../env';
import { TypeormAuditModel } from '../databases/typeorm/models/typeorm-audit-model';
import { CreateAudits1719167162794 } from '../databases/typeorm/migrations/1719167162794-create-audits';
import { UpdateAuditsAction1719774089816 } from '../databases/typeorm/migrations/1719774089816-update-audits-action';

const schema =
  new URL(env.POSTGRESQL_URL).searchParams.get('schema') ?? 'public';

export const appDataSource = new DataSource({
  type: 'postgres',
  url: env.POSTGRESQL_URL,
  schema,
  entities: [TypeormAuditModel],
  migrations: [CreateAudits1719167162794, UpdateAuditsAction1719774089816],
  migrationsRun: true,
});

export async function loadTypeormConnection() {
  await appDataSource.initialize();

  return appDataSource;
}
