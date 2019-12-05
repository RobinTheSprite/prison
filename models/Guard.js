const mongoose = require('mongoose');
const Person = require('./Person');
const NonPrisoner = require('./NonPrisoner');
const Locations = require('./Locations');

const guard = {
    salary: {type: Number, trim: true},
    shift: {type: String, trim: true},
    guards: {type: [String], enum: Locations, trim: true},
    supervises: {type: Number, trim: true}
};

const guardSchema = Object.assign(guard, NonPrisoner, Person);

module.exports = {
    model: mongoose.model('Guard', guardSchema),
    schema: guardSchema
};