const {Genre, validate} = require('../models/genres')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        // if (!req.body.name || req.body.name.length < 3) {
        //     return res.status(400).send('Name is required')
        // }
        let genre = new Genre ({
            name: req.body.name
        })
        // genres.push(genre);
        genre = await genre.save();
        res.send(genre);
        }
    catch (error) {
        console.log('nama sama')
        res.send('Nama sama')
    }
});

router.put('/:id', async (req, res) => {    
    const { error } = validate(req.body);
    if (error) {
        return res.status(404).send(error.details[0].message)
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
        new: true
    })

    // const genre = genres.find(genres => genres.id == parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
    // const result = validate(req.body);
    
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);
    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genres);
})



module.exports = router;