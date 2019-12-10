var express = require('express');
var router = express.Router();

const Incident = require('../models/Incident');

//Read
router.get('/incident', function(req, res) {
    const query = req.query;
    Incident.model.find(query)
        .then(incident => {
            res.json({
                confirmation: 'success',
                data: incident
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
router.get('/incident/update', (req, res) => {
    const query = req.query;
    var update = {};

    if (query.fieldToUpdate === "peopleInvolved")
    {
        const temp = {};
        temp[query.fieldToUpdate] = query.valueToUpdate;
        update["$push"] = temp;
    }
    else
    {
        update[query.fieldToUpdate] = query.valueToUpdate;
    }

    Incident.model.findOneAndUpdate({id: query.id}, update)
        .then(incident => {
            res.json({
                confirmation: 'success',
                data: incident
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
router.get('/incident/remove', (req, res) => {
    const query = req.query;
    Incident.model.findOneAndRemove({id: query.id})
        .then(() => {
            res.json({
                confirmation: 'success',
                data: 'Incident has been removed'
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
router.post('/incident', (req, res) => {
    const body = req.body;

    const peopleInvolved = body.peopleInvolved.split(/[\r][\n]+/);
    delete body.peopleInvolved;

    const incident = new Incident.model(body);
    incident.guards = peopleInvolved;

    Incident.model.create(incident)
        .then(incident => {
            res.json({
                confirmation: 'success',
                data: incident
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