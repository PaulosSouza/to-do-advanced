import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { Action } from '@/domain/enums/action';

@Entity('audits')
export class TypeormAuditModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    name: 'user_id',
  })
  userId!: string;

  @Column({
    type: 'enum',
    enum: Action,
    default: Action.UserRegistered,
  })
  action!: Action;

  @Column({
    type: 'timestamp',
  })
  timestamp!: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  metadata?: string | null;
}
