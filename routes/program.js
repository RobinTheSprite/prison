var express = require('express');
var router = express.Router();
const Prisoner = require('../models/Prisoner');
const Guard = require('../models/Guard');
const Program = require('../models/Program');

//Read
router.get('/program', function(req, res, next) {
    const query = req.query;
    Program.find(query)
        .then(program => {
            res.json({
                confirmation: 'success',
                data: program
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
router.get('/program/update', (req, res) => {
    const query = req.query;
    var update = {};

    if (query.fieldToUpdate === "workers")
    {
        Prisoner.model.findOneAndUpdate({ssn: query.valueToUpdate}, {worksOn: query.name})
            .catch(err => {
                res.json({
                    confirmation: 'fail',
                    message: err.message
                })
            });

        const temp = {};
        temp[query.fieldToUpdate] = query.valueToUpdate;
        update["$push"] = temp;
    }
    else
    {
        update[query.fieldToUpdate] = query.valueToUpdate;
    }

    Program.findOneAndUpdate({name: query.name}, update)
        .then(program => {
            res.json({
                confirmation: 'success',
                data: program
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
router.get('/program/remove', (req, res) => {
    Program.findOne({name: req.query.name})
        .then(data => {
            data.workers.forEach(worker => {
                Prisoner.model.findOneAndUpdate({ssn: worker}, {worksOn: null})
                    .catch(err => {
                        res.json({
                            confirmation: 'fail',
                            message: err.message
                        })
                    });

                Guard.model.findOneAndUpdate({ssn: data.supervisor}, {supervises: null})
                    .catch(err => {
                        res.json({
                            confirmation: 'fail',
                            message: err.message
                        })
                    });

                Program.findOneAndRemove({name: data.name})
                    .catch(err => {
                        res.json({
                            confirmation: 'fail',
                            message: err.message
                        })
                    });

                res.json({
                    confirmation: 'success',
                    data: 'Program with name ' + query.name + ' has been removed'
                })
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            })
        });
});

//Create
    router.post('/program', (req, res) => {
        const body = req.body;
        const workers = body.workers.split(/[\r][\n]+/);

        const program = new Program();
        program.name = body.name;

        workers.forEach((worker) => {
            Prisoner.model.findOne({ssn: worker})
                .then(prisoner => {
                    program.workers.push(prisoner.ssn);
                    Prisoner.model.findOneAndUpdate({ssn: prisoner.ssn}, {worksOn: body.name})
                        .catch(err => {
                            res.json({
                                confirmation: 'fail',
                                message: err.message
                            })
                        })
                })
                .catch(err => {
                    res.json({
                        confirmation: 'fail',
                        message: err.message
                    })
                })
        });

        Guard.model.findOne({ssn: body.supervisor})
            .then(guard => {
                program.supervisor = guard.ssn;

                Guard.model.findOneAndUpdate({ssn: guard.ssn}, {supervises: body.name})
                    .catch(err => {
                        res.json({
                            confirmation: 'fail',
                            message: err.message
                        })
                    });

                Program.create(program)
                    .then(program => {
                        res.json({
                            confirmation: 'success',
                            data: program
                        })
                    })
                    .catch(err => {
                        res.json({
                            confirmation: 'fail',
                            message: err.message
                        })
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