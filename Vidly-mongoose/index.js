
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const express = require('express');
//var bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb+srv://appuser:appuser@cluster0-xbqqh.mongodb.net/vidly?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(() => console.log('Connected to the DB'))
.catch(err => console.error('Not connected', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
//app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
//app.use(bodyParser.json())

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port :  ${port}`))

