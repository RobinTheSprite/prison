var express = require('express');
var router = express.Router();

const Guard = require('../models/Guard');

//Read
router.get('/guard', function(req, res, next) {
    const query = req.query;
    Guard.model.find(query)
        .then(guard => {
            res.json({
                confirmation: 'success',
                data: guard
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
router.get('/guard/update', (req, res) => {
    const query = req.query;
    var update = {};

    if (query.fieldToUpdate === "addresses" || query.fieldToUpdate === "guards")
    {
        const temp = {};
        temp[query.fieldToUpdate] = query.valueToUpdate;
        update["$push"] = temp;
    }
    else
    {
        update[query.fieldToUpdate] = query.valueToUpdate;
    }

    Guard.model.findOneAndUpdate({ssn: query.ssn}, update)
        .then(guard => {
            res.json({
                confirmation: 'success',
                data: guard
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
router.get('/guard/remove', (req, res) => {
    Guard.model.findOneAndRemove({ssn: req.query.ssn})
        .then(() => {
            res.json({
                confirmation: 'success',
                data: 'Guard with id ' + query.ssn + ' has been removed'
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
router.post('/guard', (req, res) => {
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

    const guards = body.guards.split('\n');
    delete body.guards;

    const guard = new Guard.model(body);
    guard.addresses = addresses;
    guard.guards = guards;

    Guard.model.create(guard)
        .then(guard => {
            res.json({
                confirmation: 'success',
                data: guard
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        });
});

module.exports = router;