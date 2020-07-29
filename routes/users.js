const {User, validate} = require('../models/user')
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const router = express.Router();

router.get('/', async (req, res) => {
    const user = await User.find().sort('name');
    res.send(user);
    // res.send(users.map((user) => {
    //     return _.pick(user, ['_id', 'name', 'email']);
    // }));
    // res.send(_.pick(user, ['_id', 'name', 'email']));
});

router.post('/', async (req, res) => {
    

    const error = validate(req.body);

    // if (error) {
    //     return res.status(400).send(error.details[0].message)
    // };
    console.log(error)
    if (error.details[0].message.includes('"name" length must be')) return res.status(400).send(`Nama kurang panjang `);
    if (error) return res.status(400).send(`A new user could not be created. ${error.details[0].message}`);

    let user = await User.findOne({ email: req.body.email});
    if (user) return res.status(400).send('User already registered.');

    user = new User (_.pick(req.body, ['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
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