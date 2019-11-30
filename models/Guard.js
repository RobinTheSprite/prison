const mongoose = require('mongoose');
const Person = require('Person');
const NonPrisoner = require('NonPrisoner');

const guard = {

};

const guardSchema = Object.assign(guard, NonPrisoner, Person);

module.exports = {
    model: mongoose.model('Guard', guardSchema),
    schema: visitorSchema
};