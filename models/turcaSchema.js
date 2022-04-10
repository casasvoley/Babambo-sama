const mongoose = require('mongoose');

const turcaSchema = new mongoose.Schema({
    serverID : {type: String, required: true, unique: true},
    turcaLastMessage: {type: Date, default: ""}
});

const model = mongoose.model('TurcaModel', turcaSchema);

module.exports = model;