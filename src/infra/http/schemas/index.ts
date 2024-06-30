import {
  AuthenticateUserRequestSchema,
  AuthenticateUserResponseSchema,
} from '../dtos/authenticate-user-dto';
import { ErrorResponseSchema } from '../dtos/error-dto';
import { RegisterUserBodySchema } from '../dtos/register-user-dto';

const schemas = {
  ErrorResponseSchema,
  RegisterUserBodySchema,
  AuthenticateUserRequestSchema,
  AuthenticateUserResponseSchema,
};

export { schemas };
