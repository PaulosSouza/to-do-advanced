import { Schema, model, Document, Types } from 'mongoose';

interface User {
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
  },
});

export const MongooseUserModel = model('User', userSchema, 'users');

export type MongooseUserModelType = Document<unknown, object, User> &
  User & {
    _id: Types.ObjectId;
  };
