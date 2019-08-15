//@ts-check
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

let cources = [
    { id: 1, name: 'cource1' },
    { id: 2, name: 'cource2' },
    { id: 3, name: 'cource3' }
];

router.get('/', (req, res) => {
    res.send(cources)
})

router.get('/:id', (req, res) => {
    const cource = cources.find(c => c.id === parseInt(req.params.id));
    if (!cource) return res.status(404).send('The cource not found for the given id');
    res.send(cource);
});

router.post('/', (req, res) => {

    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const cource = {
        id: cources.length + 1,
        name: req.body.name
    };
    cources.push(cource);
    res.send(cource);
});

router.put('/:id', (req, res) => {
    const cource = cources.find(c => c.id === parseInt(req.params.id));
    if (!cource) return res.status(404).send('The cource not found for the given id');

    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    cource.name = req.body.name;
    res.send(cource);

});

router.delete('/:id', (req, res) => {
    const cource = cources.find(c => c.id === parseInt(req.params.id));
    if (!cource) return res.status(404).send('The cource not found for the given id');

    const index = cources.indexOf(cource);
    cources.splice(index, 1);
    res.send(cource);
});

function validateCourse(course) {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).max(10).required()
    });

    return Joi.validate(course, schema);
}

module.exports = router;