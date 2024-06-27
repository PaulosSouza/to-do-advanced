import { DomainError } from '@/core/error/domain-error';

export class InvalidEmailError extends Error implements DomainError {
  constructor(email: string) {
    super(`The email "${email}" is invalid.`);
  }
}
