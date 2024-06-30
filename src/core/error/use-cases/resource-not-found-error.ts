import { AppError } from '../app-error';

import { I18NextCore } from '@/core/infra/enums/i18next';

export class ResourceNotFoundError extends AppError {
  constructor(resource: string) {
    super(I18NextCore.ResourceNotFound, { resource });
  }
}
