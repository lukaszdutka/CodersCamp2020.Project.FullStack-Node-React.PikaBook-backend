import Joi, { ValidationResult } from "joi";
import IAuthReq from './Auth.interface';

const validateAuthReq = (authReq: IAuthReq): ValidationResult => {
    const schema = Joi.object({
        // eslint-disable-next-line max-len
        email: Joi.string().min(5).max(255).required().email(),
        // eslint-disable-next-line max-len
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(authReq);
}

export default validateAuthReq