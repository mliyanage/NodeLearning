const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const {genreSchema} = require('./genres');

const movieSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 250,
        trim: true
    },
    genre: {
      type: genreSchema,
      required: true
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 250
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 250
    }
})

const Movie = mongoose.model('Movie', movieSchema); //compile the schema to a class

function validateMovie(movie) {
    const schema = {
      title: Joi.string().min(5).max(250).required(),
      genreId: Joi.string().required(),
      numberInStock: Joi.number().min(0).required(),
      dailyRentalRate: Joi.number().min(0).required()
    };
  
    return Joi.validate(movie, schema);
  }

  exports.Movie = Movie;
  exports.validate = validateMovie;