import { AppError } from '@/core/error/app-error';
import { I18NextDomain } from '@/core/infra/enums/i18next';

export class InvalidNameLengthError extends AppError {
  constructor() {
    super(I18NextDomain.InvalidNameLength);
  }
}
