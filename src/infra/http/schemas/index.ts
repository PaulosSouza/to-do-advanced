import {
  AuthenticateUserRequestSchema,
  AuthenticateUserResponseSchema,
} from '../dtos/authenticate-user-dto';
import { RegisterUserBodySchema } from '../dtos/register-user-dto';

const schemas = {
  RegisterUserBodySchema,
  AuthenticateUserRequestSchema,
  AuthenticateUserResponseSchema,
};

export { schemas };
