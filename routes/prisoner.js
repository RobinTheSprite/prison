var express = require('express');
var router = express.Router();

const Prisoner = require('../models/Prisoner');

//Read
router.get('/prisoner', (req, res) => {
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
    var update = {};

    if (query.fieldToUpdate === "crimes" || query.fieldToUpdate === "courtDates")
    {
        update[query.fieldToUpdate] = query.valueToUpdate.split(/[\r][\n]+/);
    }
    else
    {
        update[query.fieldToUpdate] = query.valueToUpdate;
    }

    Prisoner.model.findOneAndUpdate({ssn: query.ssn}, update)
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

//Add
router.get('/prisoner/add', (req, res) => {
    const query = req.query;
    var update = {};

    if (query.fieldToUpdate === "crimes" || query.fieldToUpdate === "courtDates")
    {
        const temp = {};
        temp[query.fieldToUpdate] = query.valueToUpdate;
        update["$push"] = temp;
    }
    else
    {
        update[query.fieldToUpdate] = query.valueToUpdate;
    }

    Prisoner.model.findOneAndUpdate({ssn: query.ssn}, update)
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
    Prisoner.model.findOneAndRemove({ssn: req.query.ssn})
        .then(data => {
            res.json({
                confirmation: 'success',
                data: 'Prisoner with id ' + query.ssn + ' has been removed'
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
    const body = req.body;
    const crimes = body.crimes.split('\n');
    const courtDates = body.courtDates.split('\n');
    delete body.courtDates;
    delete  body.crimes;

    const prisoner = new Prisoner.model(body);
    prisoner.courtDates = courtDates;
    prisoner.crimes = crimes;

    Prisoner.model.create(prisoner)
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