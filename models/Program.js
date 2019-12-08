const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
   name: {type: String, trim: true, unique: true},
   workers: {type: [String]},
   supervisor: {type: String}
});

module.exports = mongoose.model('Program', ProgramSchema);