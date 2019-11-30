const mongoose = require('mongoose');
const Person = require('Person');
const NonPrisoner = require('NonPrisoner');

const locations = ['A', 'B', 'C', 'S', 'Perimeter', 'Front Gate', 'Kitchen', 'Yard'];

const guard = {
    salary: {type: Number, trim: true},
    shift: {type: String, trim: true},
    guards: {type: [String], enum: locations, trim: true},
    supervises: Number
};

const guardSchema = Object.assign(guard, NonPrisoner, Person);

module.exports = {
    model: mongoose.model('Guard', guardSchema),
    schema: visitorSchema
};