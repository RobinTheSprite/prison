const mongoose = require('mongoose');
const Person = require('./Person');
const NonPrisoner = require('./NonPrisoner');
const util = require('./Util');

const guard = {
    salary: {type: Number, trim: true},
    shift: {type: String, trim: true},
    guards: {type: [String], enum: util.locations, trim: true},
    supervises: {type: String, trim: true}
};

const guardSchema = Object.assign(guard, NonPrisoner, Person);

module.exports = {
    model: mongoose.model('Guard', guardSchema),
    schema: guardSchema
};