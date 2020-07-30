const { jwtPrivateKey } = require('../config');
const {User} = require('../models/user')
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const router = express.Router();

router.post('/', async (req, res) => {
    

    const error = validate(req.body);
    
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email});
    console.log(user);
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: user._id }, jwtPrivateKey);
    res.send(token);

});

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")).min(8).max(1024).required(),
    });
    const {error} = schema.validate(user);
    return error;
}

module.exports = router;