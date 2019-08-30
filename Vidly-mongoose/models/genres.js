const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5, 
        maxlength: 50
        }
})

const Genre = mongoose.model('Genre', genreSchema); //compile the schema to a class

function validateGenre(genre) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(10).required()
    });

    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;