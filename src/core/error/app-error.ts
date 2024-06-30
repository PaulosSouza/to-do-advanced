export interface AppErrorProps {
  i18nKey: string;
  i18nResources?: Record<string, unknown>;
}

export class AppError extends Error implements AppErrorProps {
  public readonly i18nKey: string;
  public readonly i18nResources: Record<string, unknown>;

  constructor(i18nKey: string, i18nResources: Record<string, unknown> = {}) {
    super();

    this.i18nKey = i18nKey;
    this.i18nResources = i18nResources;
  }
}
