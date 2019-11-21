var express = require('express');
var router = express.Router();

const Person = require('../models/Person');
//Read
router.get('/person', function(req, res, next) {
    const query = req.query;
    Person.model.find(query)
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
//Update
router.get('/person/update', (req, res) => {
    const query = req.query;
    const personId = query.id;
    delete query['id'];

    Person.model.findByIdAndUpdate(personId, query, {new: true})
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

//Delete
router.get('/person/remove', (req, res) => {
   const query = req.query;
   const childId = query.child;
   Person.model.findByIdAndRemove(query.id)
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

//Create
router.post('/person', (req, res) => {
    Person.model.create(req.body)
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
