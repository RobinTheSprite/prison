var express = require('express');
var router = express.Router();

const Prisoner = require('../models/Prisoner');
const Person = require('../models/Person');

//Read
router.get('/prisoner', function(req, res, next) {
    const query = req.query;
    Prisoner.model.find(query)
        .then(prisoner => {
            res.json({
                confirmation: 'success',
                data: prisoner
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
});

//Update
router.get('/prisoner/update', (req, res) => {
    const query = req.query;
    const prisonerId = query.id;
    delete query['id'];

    Prisoner.model.findByIdAndUpdate(prisonerId, query, {new: true})
        .then(prisoner => {
            res.json({
                confirmation: 'success',
                data: prisoner
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
});

//Delete
router.get('/prisoner/remove', (req, res) => {
    const query = req.query;
    Prisoner.model.findByIdAndRemove(query.id)
        .then(data => {
            res.json({
                confirmation: 'success',
                data: 'Prisoner with id ' + query.id + ' has been removed'
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
});

//Create
router.post('/prisoner', (req, res) => {
    Prisoner.model.create(req.body)
        .then(prisoner => {
            res.json({
                confirmation: 'success',
                data: prisoner
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
});

module.exports = router;