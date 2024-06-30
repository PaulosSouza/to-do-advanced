import { AppError } from '../app-error';

import { I18NextCore } from '@/core/infra/enums/i18next';

export class AllUpdatedValuesUndefined extends AppError {
  constructor() {
    super(I18NextCore.AllUpdatedParamsUndefined);
  }
}
