
const personSchema = {
   ssn: {type: String, trim: true, maxlength: 9, index: true},
   firstName: {type: String},
   middleName: {type: String},
   lastName: {type: String},
};

module.exports = personSchema;