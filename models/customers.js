const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    phone: {
        type: String,
        unique: true,
        required: true
    }
}));


function validateCustomer(customer) {
    const schema = Joi.Object({
        name: Joi.string().min(1).required(),
        phone: Joi.string().required(),
        isGold: Joi.boolean()
    });
    return schema.validate(customer);
}

module.exports.Customer = Customer;
exports.validate = validateCustomer;