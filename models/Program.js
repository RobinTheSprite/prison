const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
   name: {type: String, trim: true},
   workers: {type: [String]},
   supervisor: {type: {type: String}}
});

module.exports = mongoose.model('Program', ProgramSchema);