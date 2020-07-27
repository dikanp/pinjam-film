const Joi = require('@hapi/joi')
const { Genre, genreSchema } = require('../models/genres')
const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
        // unique: [true, 'name must be unique']
    },
    year: Number,
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    // genre: {
    //     type: genreSchema,
    //     required: true
    // },
    numberInStock: {
        type: Number,
        min: 0,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        required: true
    }
}));

function validateMovie(movie) {
    const schema = Joi.Object({
        title: Joi.string().min(1).required(),
        genreId: Joi.required(),
        year: Joi.number(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });
    schema.validate(movie);
}

async function changeGenre() {
    const genre = await Genre.findById()

}

// async function updateAuthor(courseId, newAuthorName) {
//     try {
//         let course = await Course.findById(courseId);
//         if(course) {
//             const newAuthor = await Author.find({name: newAuthorName});
//             if(newAuthor && newAuthor.length > 0) {
//                 const newAuthorId = newAuthor[0]._id;
//                 course.author = newAuthorId;
//                 const updatedAuthorCourse = await course.save();
//                 if(updatedAuthorCourse) console.log(updatedAuthorCourse);
//             }
            
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

exports.Movie = Movie;
exports.validate = validateMovie;