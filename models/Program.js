const mongoose = require('mongoose');

const ProgramSchema = mongoose.Schema({
   name: {type: String, trim: true},
   workers: {type: [mongoose.Schema.ObjectId]},
   supervisor: {type: mongoose.Schema.ObjectId}
});

module.exports = mongoose.model('Program', ProgramSchema);