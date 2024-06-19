import { UseCaseError } from '../use-case-error';

export class ResourceNotFound extends Error implements UseCaseError {
  constructor(resource: string) {
    super(`Resource ${resource} not found.`);
    this.name = 'ResourceNotFound';
  }
}
