import Joi from 'joi';

export const createExpenseSchema = Joi.object({
  name: Joi.string().min(1).required(),
  totalValue: Joi.number().required(),
  groupId: Joi.number().required(),
  participantsIds: Joi.array().items(
    Joi.object({
        id:Joi.number().required()
    })
  )
});