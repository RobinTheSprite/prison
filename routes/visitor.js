var express = require('express');
var router = express.Router();

const Visitor = require('../models/Visitor');
const Prisoner = require('../models/Prisoner');

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
    const query = req.query;
    Visitor.model.findOneAndRemove({ssn: query.ssn})
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
    const addresses = [];
    const unparsedAddresses = body.addresses.split('\n');
    unparsedAddresses.forEach((address) => {
        const values = address.split(',');
        const temp = {};
        temp.street = values[0];
        temp.city = values[1];
        temp.state = values[2];
        temp.zip = values[3];
        addresses.push(temp);
    });
    delete body.addresses;

    const visitor = new Visitor.model(body);
    visitor.addresses = addresses;

    Prisoner.model.findOne({ssn: body.visited})
        .then(prisoner => {
            visitor.visited = prisoner.ssn;
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
        })
        .catch((err) => {
            res.json({
                confirmation:'fail',
                message: 'Prisoner with SSN ' + body.visited + ' not found'
            })
        })
});

module.exports = router;