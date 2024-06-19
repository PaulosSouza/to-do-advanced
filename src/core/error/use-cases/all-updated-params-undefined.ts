import { UseCaseError } from '../use-case-error';

export class AllUpdatedValuesUndefined extends Error implements UseCaseError {
  constructor() {
    super(`All values intended for update are undefined.`);
    this.name = 'AllUpdatedParamsUndefined';
  }
}
