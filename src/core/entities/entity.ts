import { randomUUID } from 'node:crypto';

import { Optional } from '../types/optional';

export interface EntityProps {
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export abstract class Entity<T extends EntityProps> {
  protected readonly props: Optional<T, 'createdAt'>;

  private readonly _id: string;
  private readonly _createdAt: Date;
  private _updatedAt?: Date | null;
  private _deletedAt?: Date | null;

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  protected set updatedAt(newUpdatedAtDate: Date | undefined | null) {
    this._updatedAt = newUpdatedAtDate;
  }

  get deletedAt() {
    return this._deletedAt;
  }

  protected set deletedAt(newDeletedAtDate: Date | undefined | null) {
    this._deletedAt = newDeletedAtDate;
  }

  protected constructor(props: Optional<T, 'createdAt'>, id?: string) {
    this._id = id ?? randomUUID();

    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt;
    this._deletedAt = props.deletedAt;

    this.props = props;
  }

  protected updateLastModified() {
    this.updatedAt = new Date();
  }

  protected softDelete() {
    this._deletedAt = new Date();
  }
}
