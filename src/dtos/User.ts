import Joi from "joi";
import { UserProfileAttributes } from "../interfaces/model.interface";

export const CreateUserProfileDto = Joi.object<UserProfileAttributes>({
  username: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  address: Joi.string().required(),
  email: Joi.string().lowercase().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false });

export const UserSignInDto = Joi.object<{ email: string; password: string }>({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false });

export const UpdateUserProfileDto = Joi.object<UserProfileAttributes>({
  username: Joi.string().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  address: Joi.string().optional(),
}).options({ abortEarly: false });
