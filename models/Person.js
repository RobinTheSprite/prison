const mongoose = require('mongoose');

const personSchema = {
   ssn: {type: String, trim: true, maxlength: 9},
   firstName: {type: String},
   middleName: {type: String},
   lastName: {type: String},
};

module.exports = personSchema;