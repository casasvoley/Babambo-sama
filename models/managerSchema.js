// Schema para la tabla managercounter

const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    serverID : {type: String, required: true, unique: true},
    lastPlay: {type: Date, default: ""}
});

const model = mongoose.model('ManagerCounter', managerSchema);

module.exports = model;