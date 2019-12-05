var express = require('express');
var router = express.Router();
const Prisoner = require('../models/Prisoner');
const Guard = require('../models/Guard');
const Program = require('../models/Program');

//Read
router.get('/program', function(req, res, next) {
    const query = req.query;
    Program.model.find(query)
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

    Program.model.findOneAndUpdate({name: query.name}, update)
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
    Program.model.findOneAndRemove({name: req.query.name})
        .then(data => {
            data.workers.forEach(worker => {
                Prisoner.model.findByIdAndUpdate(worker, {worksOn: null})
                    .catch(err => {
                        res.json({
                            confirmation: 'fail',
                            message: err.message
                        })
                    });

                Guard.model.findByIdAndRemove(data.supervisor)
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

        const program = new Program(body);

        workers.forEach((worker) => {
            Prisoner.model.findOne({ssn: worker})
                .then(prisoner => {
                    program.workers.push(prisoner._id);
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
                program.supervisor = guard._id;

                Program.model.create(program)
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