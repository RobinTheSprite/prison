const mongoose = require('mongoose');
const Person = require('./Person');
const NonPrisoner = require('./NonPrisoner');

const visitor = {
    visitDate: {type: Date},
    timeIn: {type: String, default: Date.now},
    timeOut: {type: String, default: Date.now},
    visited: {type: String}
};

const visitorSchema = Object.assign(visitor, Person, NonPrisoner);

module.exports = {
    model: mongoose.model('Visitor', visitorSchema),
    schema: visitorSchema
};