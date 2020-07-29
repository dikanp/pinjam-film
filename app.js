const Joi = require('@hapi/joi');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rental = require('./routes/rental');
const user = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to mongo'))
    .catch(err => console.log('Could not connect to MongoDB', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rental', rental)
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use(express.urlencoded());

const port = process.env.PORT || 3000;
// app.listen(3000);
app.listen(port, () => console.log(`Listening on port ${port} ...`));