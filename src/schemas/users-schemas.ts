import { CreateUserParams } from '@/services';
import Joi from 'joi';

export const createUserSchema = Joi.object<CreateUserParams>({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(11).max(11).required(),
  password: Joi.string().min(6).required(),
});
 