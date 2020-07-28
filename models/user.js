const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const passwordComplexity = require("joi-password-complexity");
  
const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: [true, 'name must be unique']
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024    
    }


}));

function validateUser(user) {
    const complexityOptions = {
        min: 5,
        max: 250,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 2,
      };

    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        // password: passwordComplexity(complexityOptions)
        password: Joi.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")).min(5).max(255).required(),
    });
    // return schema.validate(user);
    const {error} = schema.validate(user);
    return error;
}

exports.User = User;
exports.validate = validateUser;