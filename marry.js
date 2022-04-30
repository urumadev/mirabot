var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var marry= new mongoose.Schema({
guild:String,
user_1:String,
user_2:String,
date:Date,
reg:Date,
bal:{type:Number,default:0},
users:Array,
voice:{type:Number,default:0},
bol:Boolean,
ch:String,
});

module.exports = mongoose.model("marry", marry);
