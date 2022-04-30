var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user = new mongoose.Schema({
  userID: String,
  rep:{type:Number, default:0},
  voice:{type: Number, default: 0},
  nar: { type: Number, default: 0},
  left: Boolean,
  age:String,
  bio:{type:Number, default:0} ,
  channel: { type: Number, default: null},
  reason: { type: String, default: 'не в муте'},
  warns:{ type: Number, default: 0},
  msg:{ type: Number, default: 0},
  muted: Boolean,
  muteinfo: String,
  time: String,
  unmute: Date,
  level:{ type: Number, default: 1},
  guild: String,
 withmoney:{type:Number,default:0},
 depmoney:Number,
 xp: Number,
 kd1:String,
vip_id:String,
user_marry:String,
marry:String,

});

module.exports = mongoose.model("users", user);
