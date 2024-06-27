import { DomainError } from '@/core/error/domain-error';

export class InvalidNameLengthError extends Error implements DomainError {
  constructor() {
    super('The name must have between 2 and 255 characters');
  }
}
