const mongoose = require('mongoose');

const ProgramSchema = mongoose.Schema({
   name: {type: String, trim: true},
   workers: {type: [mongoose.Schema.ObjectID]},
   supervisor: {type: mongoose.Schema.ObjectID}
});

module.exports = mongoose.Model('Program', ProgramSchema);