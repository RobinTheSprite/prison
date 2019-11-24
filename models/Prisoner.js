const mongoose = require('mongoose');
const Person = require('./Person');

const prisoner = {
    crimes: {type: [{type: String, trim: true}]},
    admitDate: {type: Date},
    releaseDate: {type: Date},
    clearance: {type: String},
    courtDates: {type: [Date]}
};

const personPrisoner = Object.assign(Person, prisoner);

const prisonerSchema = mongoose.Schema(personPrisoner);

module.exports = {
    model: mongoose.model('Prisoner', prisonerSchema),
    schema: prisonerSchema
};