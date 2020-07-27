const Joi = require('@hapi/joi')
const mongoose = require('mongoose');

// const genreSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 50,
//         unique: [true, 'name must be unique']
//     }
// });

// const Genre = mongoose.model('Genre', genreSchema);

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: [true, 'name must be unique']
    }
}));

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;