const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
// const passwordComplexity = require("joi-password-complexity");
// var passwordValidator = require('password-validator');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: [50, 'name length too long'],
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
        maxlength: 1024,    
        // select: false
    }


}));

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        // password: passwordComplexity(complexityOptions)
        password: Joi.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")).min(8).max(1024).required(),
        // password: new passwordValidator()
        // .is().min(8)                             
        // .is().max(100)                                  // Maximum length 100
        // .has().uppercase()                              // Must have uppercase letters
        // .has().lowercase()                              // Must have lowercase letters
        // .has().digits()                                 // Must have digits
        // .has().not().spaces() 
    });
    // return schema.validate(user);
    const {error} = schema.validate(user);
    return error;
}

exports.User = User;
exports.validate = validateUser;