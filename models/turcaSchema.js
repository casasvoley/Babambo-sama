// Schema para la tabla turcacounter

const mongoose = require('mongoose');

const turcaSchema = new mongoose.Schema({
    serverID : {type: String, required: true, unique: true},
    turcaLastMessage: {type: Date, default: ""}
});

const model = mongoose.model('TurcaCounter', turcaSchema);

module.exports = model;