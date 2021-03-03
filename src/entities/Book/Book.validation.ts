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
      ownerId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    })
    return schema.validate(bookReq);
}

export default validateBookReq;

// USE:
//  router.post(...) => {
//   const { error } = validateBookReq(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   ...
// }