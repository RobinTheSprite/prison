const mongoose = require('mongoose');
const util = require('./Util');

const ProgramSchema = new mongoose.Schema({
   name: {type: String, trim: true, unique: true},
   workers: {type: [String]},
   supervisor: {type: String},
   clearance: {type: String, enum: util.securityClearances, trim: true}
});

module.exports = mongoose.model('Program', ProgramSchema);