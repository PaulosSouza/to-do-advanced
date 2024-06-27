import { Audit } from '../entities/audit';

export interface AuditsRepository {
  create(audit: Audit): Promise<void>;
}
