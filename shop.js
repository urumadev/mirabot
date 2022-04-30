
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var shop = new mongoose.Schema({
id: String,
roles:{type:Array,default:[]},
items:{type:Array,default:[]},
roles_pr:{type:Array,default:[]},
items_pr:{type:Array,default:[]},
timely:{type:Number,default:100}
});
module.exports = mongoose.model("shop", shop);
