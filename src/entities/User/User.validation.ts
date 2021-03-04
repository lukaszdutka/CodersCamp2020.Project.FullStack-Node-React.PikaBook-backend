import Joi, { ValidationResult } from "joi";
import User from "./User.interface"

const validateUser = (user: User): ValidationResult => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(), 
        password: Joi.string().min(5).max(255).required(),
        location: Joi.string()
    })
    return schema.validate(user);
}

export default validateUser