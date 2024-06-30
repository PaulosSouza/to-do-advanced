import path from 'node:path';

import { FastifyInstance } from 'fastify';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import i18nextFsBackend, { FsBackendOptions } from 'i18next-fs-backend';

import { listDirectoriesNames } from '../utils/list-directories-names';

const i18nDirectory = path.join(__dirname, '..', 'i18n');

export async function loadI18nextHttpMiddlewarePlugin(app: FastifyInstance) {
  i18next
    .use(i18nextMiddleware.LanguageDetector)
    .use(i18nextFsBackend)
    .init<FsBackendOptions>({
      initImmediate: false,
      lowerCaseLng: true,
      fallbackLng: 'en',
      preload: listDirectoriesNames(i18nDirectory),
      ns: 'translations',
      defaultNS: 'translations',
      backend: {
        loadPath: path.join(i18nDirectory, '{{lng}}/{{ns}}.json'),
      },
    });

  await app.register(i18nextMiddleware.plugin, { i18next });
}
