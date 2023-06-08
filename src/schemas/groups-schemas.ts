import Joi from 'joi';

export const createGroupSchema = Joi.object({
  groupName: Joi.string().min(3).required()
});

export const groupIdSchema = Joi.object({
  groupId:Joi.number().required()
});