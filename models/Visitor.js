const mongoose = require('mongoose');
const Person = require('./Person');
const NonPrisoner = require('./NonPrisoner');

const visitor = {
    visitDate: {type: Date},
    timeIn: {type: Date, default: Date.now},
    timeOut: {type: Date, default: Date.now},
    visited: {type: mongoose.Schema.ObjectId}
};

visitorSchema = Object.assign(Person, NonPrisoner, visitor);

module.exports = {
    model: mongoose.model('Person', visitorSchema),
    schema: visitorSchema
};