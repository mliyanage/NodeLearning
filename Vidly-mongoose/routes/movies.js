//@ts-check
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genres');
const auth = require('../middleware/auth');

router.get('/', async(req, res) => {
    const movie = await Movie.find().sort('title');
    res.send(movie);
})

router.get('/:id', async(req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The movie not found for the given id');
    res.send(movie);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');
    let movie = new Movie({ 
      title: req.body.title,
      genre: {
          _id: genre._id,
          name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      
    });
    movie = await movie.save();
    
    res.send(movie);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    }, { new: true })

    if (!movie) return res.status(404).send('The Movie not found for the given id');

    res.send(movie);

});

router.delete('/:id', auth, async(req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('The movie not found for the given id');
    res.send(movie);
});


module.exports = router;