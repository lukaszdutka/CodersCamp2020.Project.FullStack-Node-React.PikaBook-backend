import Joi, { ValidationResult } from "joi";
import AuthReq from './Auth.interface';

const validateAuthReq = (authReq: AuthReq): ValidationResult => {
    const schema = Joi.object({
        // eslint-disable-next-line max-len
        email: Joi.string().min(5).max(255).required().email().pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/), 
        // eslint-disable-next-line max-len
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(authReq);
}

export default validateAuthReq