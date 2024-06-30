import { AppError } from '@/core/error/app-error';
import { I18NextUseCase } from '@/core/infra/enums/i18next';

export class WrongCredentialsError extends AppError {
  constructor() {
    super(I18NextUseCase.WrongCredentials);
  }
}
