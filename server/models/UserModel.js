var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    Name:{type:String, required: true},
},{timestamps:true})

var User = mongoose.model("User", UserSchema)
