var express = require('express');
var router = express.Router();

const Person = require('../models/Person');

router.get('/person', function(req, res, next) {
    const query = req.query;
    Person.find(query)
        .then(person => {
            res.json({
              confirmation: 'success',
              data: person
            })
        })
        .catch(err => {
            res.json({
              confirmation: 'fail',
              message: err.message
            })
        })
});

//TODO: Learn how to use put
router.get('/person/update', (req, res) => {
    const query = req.query;
    const personId = query.id;
    delete query['id'];

    Person.findByIdAndUpdate(personId, query, {new: true})
        .then(person => {
            res.json({
                confirmation: 'success',
                data: person
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        })
});

router.get('/person/remove', (req, res) => {
   const query = req.query;
   Person.findByIdAndRemove(query.id)
       .then(data => {
           res.json({
               confirmation: 'success',
               data: 'Person with id ' + query.id + ' has been removed'
           })
       })
       .catch(err => {
           res.json({
               confirmation: 'fail',
               message: err.message
           })
       })
});

router.post('/person', (req, res) => {
    Person.create(req.body)
        .then(person => {
            res.json({
                confirmation: 'success',
                data: person
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
