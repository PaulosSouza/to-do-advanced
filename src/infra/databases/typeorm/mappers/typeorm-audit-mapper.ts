import { TypeormAuditModel } from '../models/typeorm-audit-model';

import { Audit } from '@/domain/entities/audit';

export class TypeormAuditMapper {
  public static toDomain(raw: TypeormAuditModel) {
    return Audit.create(
      {
        action: raw.action,
        userId: raw.userId,
        timestamp: raw.timestamp,
        metadata: raw.metadata,
      },
      raw.id,
    );
  }

  public static toPersistency(audit: Audit) {
    const auditTypeormModel = new TypeormAuditModel();

    auditTypeormModel.id = audit.id;
    auditTypeormModel.action = audit.action;
    auditTypeormModel.userId = audit.userId;
    auditTypeormModel.metadata = audit.metadata;
    auditTypeormModel.timestamp = audit.timestamp;

    return auditTypeormModel;
  }
}
