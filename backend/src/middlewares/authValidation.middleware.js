const Joi = require('joi');

const registerValidation = (req, res, next)=> {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
            'string.pattern.base': 'Phone number must be 10 digits long',
        }),
        userType: Joi.string().valid('Builder', 'Broker', 'Agent').required(),
        password: Joi.string().min(6).required(),
    })

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message: "Bad request", error})
    }
    next();
}

const loginValidation = (req, res, next)=> {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message: "Bad request", error})
    }
    next();
}


module.exports = {
    registerValidation,
    loginValidation
}

