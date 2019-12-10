const mongoose = require('mongoose');

const incidentSchema = mongoose.Schema({
    type: {type: String, trim: true},
    date: {type: Date, trim: true},
    peopleInvolved: {type: [{type: String, maxlength: 9, minlength: 9}]}
});

module.exports = {
    model: mongoose.model('Incident', incidentSchema),
    schema: incidentSchema
};