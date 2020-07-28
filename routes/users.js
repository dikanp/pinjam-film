const {User, validate} = require('../models/user')
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/', async (req, res) => {
    const user = await User.find().sort('name');
    res.send(user);
});

router.post('/', async (req, res) => {
    

    const error = validate(req.body);

    // if (error) {
    //     return res.status(400).send(error.details[0].message)
    // };
    console.log(error)
    if (error) return res.status(400).send(`A new user could not be created. ${error.details[0].message}`);

    let user = await User.findOne({ email: req.body.email});
    if (user) return res.status(400).send('User already registered.');

    user = new User (_.pick(req.body, ['name', 'email', 'password']))
    // user = new User(
    //     {
    //         name: req.body.name,
    //         email: req.body.email,
    //         password: req.body.password
    //     }
    // );

    user = await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;