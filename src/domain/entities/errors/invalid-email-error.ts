import { AppError } from '@/core/error/app-error';
import { I18NextDomain } from '@/core/infra/enums/i18next';

export class InvalidEmailError extends AppError {
  constructor(email: string) {
    super(I18NextDomain.InvalidEmail, { email });
  }
}
