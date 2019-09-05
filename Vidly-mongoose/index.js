
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const config = require('config');
//var bodyParser = require('body-parser');

const app = express();

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb+srv://appuser:appuser@cluster0-xbqqh.mongodb.net/vidly?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(() => console.log('Connected to the DB'))
.catch(err => console.error('Not connected', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
//app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
//app.use(bodyParser.json())

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port :  ${port}`))

