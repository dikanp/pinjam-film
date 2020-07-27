const {User, validate} = require('../models/user')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    // const user = await User.find().sort('name');
    // res.send(user);

    const {error} = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    user = await user.save();
    res.send(user);
});

module.exports = router;