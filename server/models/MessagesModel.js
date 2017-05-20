var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
     Recipient:{type:String, required: true},
     Message:{type:String, required: true},
     Sender:{type:String, required:true}
},{timestamps:true})

var Message = mongoose.model("Message", MessageSchema)
