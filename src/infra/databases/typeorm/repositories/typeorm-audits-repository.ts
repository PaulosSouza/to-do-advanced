import { Repository } from 'typeorm';

import { TypeormAuditModel } from '../models/typeorm-audit-model';
import { TypeormAuditMapper } from '../mappers/typeorm-audit-mapper';

import { Audit } from '@/domain/entities/audit';
import { AuditsRepository } from '@/domain/repositories/audits-repository';
import { appDataSource } from '@/infra/libs/typeorm';

export class TypeormAuditsRepository implements AuditsRepository {
  private readonly repository: Repository<TypeormAuditModel>;

  constructor() {
    this.repository = appDataSource.getRepository(TypeormAuditModel);
  }

  async create(audit: Audit): Promise<void> {
    const data = TypeormAuditMapper.toPersistency(audit);
    await this.repository.save(data);
  }
}
