var express = require("express")
var app = express()
var path = require("path")
var bodyParser = require("body-parser")
var session = require('express-session')
var mongoose = require("mongoose")

app.use(bodyParser.json())

app.use(session({secret: 'nice'}));
app.use(express.static(path.join(__dirname, "./ang2/dist")))
app.use(express.static(path.join(__dirname, "./node_modules")))
require("./server/config/mongoose.js")

require("./server/config/routes.js")(app)

let server = app.listen(5000, () => {
  console.log('started on port 5000');
});

controller = require("./server/controllers/controller.js")
  let io = require("socket.io")(server)
  var User = mongoose.model("User")
  var Message = mongoose.model("Message")

  io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('logged-user', (username)=>{
      console.log("logged_user socket", username)
      var user_name = username
    }),

    socket.on('add-message', (message)=>{
      console.log("addmessage socket", message)
      
      add_message = function(){
        console.log("add_message controller")
        console.log("**********************************")
        console.log("message info:", message)
        console.log("message recipient", typeof(message.Message))
        var newMessage = new Message()
        newMessage.Recipient = message.Recipient
        newMessage.Message = message.Message 
        newMessage.Sender = "abshir"
        newMessage.save().then(getusermessages)
    },
      
    getusermessages = function(){ 
        Message.find({Recipient: "jack"},function(err,data){
            console.log("last-message",data[data.length-1])
            io.emit('message',{type:'new-message',text:data[data.length-1]});
        }) 
      }  
      add_message()
      
    });

  socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

