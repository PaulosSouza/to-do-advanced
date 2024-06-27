import { DomainError } from '@/core/error/domain-error';

export class AtLeastOneSpecialCharacterPasswordError
  extends Error
  implements DomainError
{
  constructor() {
    super('The password must contain at least one special character.');
  }
}
