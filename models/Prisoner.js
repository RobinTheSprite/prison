const mongoose = require('mongoose');
const Person = require('./Person');

const prisoner = {
    crimes: {type: [{type: String, trim: true}]},
    admitDate: {type: Date},
    releaseDate: {type: Date},
    clearance: {type: String},
    cellLocation: {type: String, trim: true},
    courtDates: {type: [Date]},
    worksOn: {type: String}
};

const personPrisoner = Object.assign(prisoner, Person);

const prisonerSchema = mongoose.Schema(personPrisoner);

module.exports = {
    model: mongoose.model('Prisoner', prisonerSchema),
    schema: prisonerSchema
};