const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
   ssn: {type: Number, trim: true, maxlength: 9},
   firstName: {type: String},
   middleName: {type: String},
   lastName: {type: String}
});

module.exports = mongoose.model('Person', personSchema);