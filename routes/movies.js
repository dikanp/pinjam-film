const {Movie, validate} = require('../models/movies');
const {Genre} = require('../models/genres');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().populate('genre', 'name -_id').sort('name');
    res.send(movies);
});

router.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const genre = await Genre.findById(req.body.genreId);
        if(!genre) return res.status(404).send("Invalid genre");

        let movie = new Movie ({
            title: req.body.title,
            year: req.body.year,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        })
        // genres.push(genre);
        movie = await movie.save();
        res.send(movie);
        }
    catch (error) {
        console.log(error)
        res.send(error)
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