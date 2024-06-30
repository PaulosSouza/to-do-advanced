import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class UpdateAuditsAction1719774089816 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'audits',
      'action',
      new TableColumn({
        name: 'action',
        type: 'enum',
        enum: ['USER_REGISTERED', 'USER_AUTHENTICATED', 'TASK_CREATED'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'audits',
      new TableColumn({
        name: 'action',
        type: 'enum',
        enum: ['USER_REGISTERED', 'USER_AUTHENTICATED', 'TASK_CREATED'],
      }),
      new TableColumn({
        name: 'action',
        type: 'enum',
        enum: ['USER_REGISTERED'],
      }),
    );
  }
}
