var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var prem = new mongoose.Schema({
guild:String,
date:Date,
stat:Boolean,
});

module.exports = mongoose.model("prem", prem);
