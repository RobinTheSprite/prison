const mongoose = require('mongoose');
const PersonSchema = require('./Person');
const NonPrisonerSchema = require('./NonPrisoner');

const visitorSchema = mongoose.Schema({
    personInfo: {type: PersonSchema},
    nonPrisonerInfo: {type: NonPrisonerSchema},
    visitDate: {type: Date},
    timeIn: {type: Date, default: Date.now},
    timeOut: {type: Date, default: Date.now},
    visited: {type: mongoose.Schema.ObjectId}
});

module.exports = {
    model: mongoose.model('Person', visitorSchema),
    schema: visitorSchema
};