import { Audit } from '@/domain/entities/audit';
import { AuditsRepository } from '@/domain/repositories/audits-repository';

export class InMemoryAuditsRepository implements AuditsRepository {
  public items: Audit[] = [];

  async create(audit: Audit): Promise<void> {
    this.items.push(audit);
  }
}
