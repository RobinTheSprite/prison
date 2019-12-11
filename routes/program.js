var express = require('express');
var router = express.Router();
const Prisoner = require('../models/Prisoner');
const Guard = require('../models/Guard');
const Program = require('../models/Program');
const util = require('../models/Util');

//Read
router.get('/program', function(req, res) {
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

    async function fillUpdate() {
        let result = true;
        if (query.fieldToUpdate === "workers") {
            await Prisoner.model.findOne({ssn: query.valueToUpdate})
                .then(async prisoner => {
                   await Program.findOne({name: query.name})
                        .then(async program => {
                            if (util.hasClearance(program.clearance, prisoner.clearance)
                            && !program.workers.includes(prisoner.ssn)) {
                               await Prisoner.model.findOneAndUpdate({ssn: query.valueToUpdate}, {worksOn: query.name})
                                    .catch(err => {
                                        res.json({
                                            confirmation: 'fail',
                                            message: err.message
                                        })
                                    });

                                const temp = {};
                                temp[query.fieldToUpdate] = query.valueToUpdate;
                                update["$push"] = temp;
                            } else {
                                result = false;
                            }
                        })
                });
        } else if (query.fieldToUpdate === "supervisor") {
           Program.findOne({name: query.name})
                .then(program => {
                    Guard.model.findOneAndUpdate({ssn: program.supervisor}, {supervises: null})
                        .catch(err => {
                            res.json({
                                confirmation: 'fail',
                                message: err.message
                            })
                        });
                    Guard.model.findOneAndUpdate({ssn: query.valueToUpdate}, {supervises: query.name})
                        .catch(err => {
                            res.json({
                                confirmation: 'fail',
                                message: err.message
                            })
                        });
                });
            update[query.fieldToUpdate] = query.valueToUpdate;
        } else {
            update[query.fieldToUpdate] = query.valueToUpdate;
        }

        return result;
    }

    fillUpdate()
        .then(result => {
            if (result) {
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
            }
            else {
                res.json({
                    confirmation: 'fail',
                    message: 'Prisoner is not cleared for this project or duplicate'
                })
            }

        });
});

//Delete
router.get('/program/remove', (req, res) => {
    const query = req.query;
    Program.findOne({name: query.name})
        .then(program => {
            program.workers.forEach(worker => {
                Prisoner.model.findOneAndUpdate({ssn: worker}, {worksOn: null})
                    .catch(err => {
                        res.json({
                            confirmation: 'fail',
                            message: err.message
                        })
                    });
            });
            Guard.model.findOneAndUpdate({ssn: program.supervisor}, {supervises: null})
                .catch(err => {
                    res.json({
                        confirmation: 'fail',
                        message: err.message
                    })
                });

            Program.findOneAndRemove({name: program.name})
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
    program.clearance = body.clearance;

    async function fillWorkers() {
        let result = true;
        for (const worker of workers) {
            await Prisoner.model.findOne({ssn: worker})
                .then(async prisoner => {
                    if (util.hasClearance(program.clearance, prisoner.clearance)) {
                        program.workers.push(prisoner.ssn);
                        await Prisoner.model.findOneAndUpdate({ssn: prisoner.ssn}, {worksOn: body.name})
                            .catch(err => {
                                res.json({
                                    confirmation: 'fail',
                                    message: err.message
                                })
                            })
                    }
                    else {
                        result = false;
                    }
                })
                .catch(err => {
                    res.json({
                        confirmation: 'fail',
                        message: err.message
                    })
                })
        }

        return result;
    }

    fillWorkers()
        .then(result => {
            if (result) {
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
            }
            else {
                res.json({
                    confirmation: 'fail',
                    message: 'A prisoner does not have clearance for this program'
                })
            }
        })


});

module.exports = router;