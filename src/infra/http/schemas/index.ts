import {
  AuthenticateUserRequestSchema,
  AuthenticateUserResponseSchema,
} from '../dtos/authenticate-user-dto';
import {
  CreateTaskRequestSchema,
  CreateTaskResponseSchema,
} from '../dtos/create-task-dto';
import { ErrorResponseSchema } from '../dtos/error-dto';
import { RegisterUserBodySchema } from '../dtos/register-user-dto';

const schemas = {
  ErrorResponseSchema,
  RegisterUserBodySchema,
  CreateTaskRequestSchema,
  CreateTaskResponseSchema,
  AuthenticateUserRequestSchema,
  AuthenticateUserResponseSchema,
};

export { schemas };
