import { UseCaseError } from '../use-case-error';

export class AlreadyExists extends Error implements UseCaseError {
  constructor(resource: string) {
    super(`Resource ${resource} already exists.`);
    this.name = 'AlreadyExists';
  }
}
