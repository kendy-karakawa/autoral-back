import Joi from 'joi';

export const participantIdSchema = Joi.object({
  participantId:Joi.number().required()
});