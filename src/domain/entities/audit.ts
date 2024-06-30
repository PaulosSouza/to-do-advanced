import { Action } from '../enums/action';

import { Optional } from '@/core/types/optional';
import { Entity, EntityProps } from '@/core/entities/entity';

export interface AuditProps extends EntityProps {
  userId: string;
  action: Action;
  timestamp: Date;
  metadata?: string | null;
}

export class Audit extends Entity<AuditProps> {
  get userId() {
    return this.props.userId;
  }

  get action() {
    return this.props.action;
  }

  get timestamp() {
    return this.props.timestamp;
  }

  get metadata() {
    return this.props.metadata;
  }

  static create(props: Optional<AuditProps, 'timestamp'>, id?: string) {
    const audit = new Audit(
      {
        timestamp: props.timestamp ?? new Date(),
        ...props,
      },
      id,
    );

    return audit;
  }
}
