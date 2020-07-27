const { Customer, validate } = require('../models/customers');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort({name: 1});
    res.send(customers);
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        let customer = new Customer ({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        })

        customer = await customer.save();
        res.send(customer);
    }
    catch (ex) {
        // res.send('Nama sama')
        res.send(ex.message);
    }
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(404).send(error.details[0].message)
    }
    
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, 
            {
                name: req.body.name,
                phone: req.body.phone,
                isGold: req.body.isGold
            }, {
                new: true
             });
        res.send(customer);
    }
    catch {
        res.status(404).send('The customer with the given id was not found');
    }
    //  if(!customer) return 
     
});

router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id)
    
    // if (!customer) return res.status(404).send('The genre with the given ID was not found.');
    
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);
        res.send(customer);
    }
    catch (ex) {
        console.log(ex);
        if (ex.name === 'CastError') {
            return res.status(404).json({ message: 'The customer with the given ID cannot be found' })
          }
          res.status(500).json({ error: 'An Error has occurred' })
          console.log(ex)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
    }
    catch (ex) {
        if( ex.name === 'CastError') {
            return res.status(404).send('The customer with the given ID was not found.');
        }
    }
})

module.exports = router;