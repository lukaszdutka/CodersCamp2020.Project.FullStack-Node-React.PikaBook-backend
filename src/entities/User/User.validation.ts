import Joi, { ValidationResult } from "joi";
import User from "./User.interface"

const validateUser = (user: User): ValidationResult => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        // eslint-disable-next-line max-len
        email: Joi.string().min(5).max(255).required().email().pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/), 
        // eslint-disable-next-line max-len
        password: Joi.string().min(5).max(255).required(),
        location: Joi.string()
    })
    return schema.validate(user);
}

export default validateUser