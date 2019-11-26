var express = require('express');
var router = express.Router();

const Visitor = require('../models/Visitor');

//Read
router.get('/visitor', function(req, res, next) {
    const query = req.query;
    Visitor.model.find(query)
        .then(visitor => {
            res.json({
                confirmation: 'success',
                data: visitor
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
router.get('/visitor/update', (req, res) => {
    const query = req.query;
    var update = {};

    if (query.fieldToUpdate === "addresses")
    {
        const temp = {};
        temp[query.fieldToUpdate] = query.valueToUpdate;
        update["$push"] = temp;
    }
    else
    {
        update[query.fieldToUpdate] = query.valueToUpdate;
    }

    Visitor.model.findOneAndUpdate({ssn: query.ssn}, update)
        .then(visitor => {
            res.json({
                confirmation: 'success',
                data: visitor
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
router.get('/visitor/remove', (req, res) => {
    Visitor.model.findOneAndRemove({ssn: parseInt(req.query.ssn)})
        .then(data => {
            res.json({
                confirmation: 'success',
                data: 'Visitor with id ' + query.ssn + ' has been removed'
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
router.post('/visitor', (req, res) => {
    const body = req.body;
    const addresses = body.addresses.split('\n');
    delete body.addresses;

    const prisoner = new Visitor.model(body);
    prisoner.addresses = addresses;

    Visitor.model.create(visitor)
        .then(visitor => {
            res.json({
                confirmation: 'success',
                data: visitor
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