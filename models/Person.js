const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
   firstName: {type:String},
   lastName: {type:String}
});

module.exports = mongoose.model('Person', personSchema);