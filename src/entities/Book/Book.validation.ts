import Joi, { ValidationResult } from 'joi';
import BookReq from './Book.interface';

const validateBookReq = (bookReq: BookReq): ValidationResult => {
    const schema = Joi.object({
      name: Joi.string().required(),
      author: Joi.array().items(Joi.string()),
      genres: Joi.array().items(Joi.string()),
      year: Joi.number(),
      publisher: Joi.string(),
      description: Joi.string(),
    })
    return schema.validate(bookReq);
}

export default validateBookReq;
