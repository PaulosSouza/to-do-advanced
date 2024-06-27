import { error as logError } from 'node:console';

import mongoose from 'mongoose';

import { env } from '../env';

export async function loadMongodbConnection(url = env.MONGODB_URL) {
  try {
    await mongoose.connect(url, {
      minPoolSize: 2,
      maxPoolSize: 10,
      authSource: 'admin',
    });

    return mongoose;
  } catch (error) {
    logError(error);

    throw new Error('Failed to load mongodb!');
  }
}
