import Joi from 'joi'
import createError from 'http-errors'
import { RequestHandler, Request, Response, NextFunction } from 'express';

export default class ValidationManager {

  schemas = {
    signup: Joi.object({
      email: Joi.string().email().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      password: Joi.string().min(8).required()
    }),

    signin: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required()
    }),

    refreshToken: Joi.object({
      'refresh-token': Joi.string().required()
    }),

    resetPassword: Joi.object({
      email: Joi.string().email().required(),
    })

  }

  validationHelper(schema: any) {
    return async <T extends Request & { file: any }>(req: T, res: Response, next: NextFunction) => {
      try {
        let result = null;
        if (req.file) {
          result = await schema.validateAsync({ ...req.body, file: req.file.buffer }, { abortEarly: false });
        } else result = await schema.validateAsync(req.body, { abortEarly: false });

        res.locals.validatedData = result
        next();
      } catch (err: any) {
        next(new createError.BadRequest(err.message));
      }
    };
  }
}