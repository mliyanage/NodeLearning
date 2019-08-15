
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //res.send('Hello world')
    //use pug to reply html
    res.render('index', {title: 'My Express app', message: 'Hello'})
})

module.exports = router;