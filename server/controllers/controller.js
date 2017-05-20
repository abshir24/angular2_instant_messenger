var mongoose = require("mongoose")
var User = mongoose.model("User")
var Message = mongoose.model("Message")

module.exports = {
    get_all_users: function(req,res){
        User.find({},function(err,data){
            if(err){
                console.log(err)
                res.json(err)
            }else{
                res.json(data)
            }
        })
    },

    create: function(req, res){
        console.log(req.body)
		var newUser = new User(req.body)
		newUser.save(function(err,userinfo){
			if(err){
				console.log("User create error", err)
				res.json({added: false, error: err})
			} else {
                req.session.user = userinfo.Name
				res.json(userinfo)
			}
		})
	},

    find: function(req,res){ 
        console.log("form name", req.body.Name)
        User.findOne({Name:req.body.Name},function(err,data2){
            if(err){
                console.log("User find error",err)
                res.json(err)
            }else{
                if(data2){
                    req.session.user = data2.Name
                    console.log("session find:", req.session.user)
                    res.json(data2)
                }else{
                    res.json(data2)
                } 
            }
        })
    },
               
    loggedin: function(req,res){
        console.log("inside logged")
        if(req.session.user){
            console.log(true)
            User.findOne({Name:req.session.user},function(err,user){
            if(err){
                console.log(err)
                res.json(err)
            }else{
                res.json(user)
            }
        })}else{
            console.log(false)
            res.json(false)
        }
        
    },

    logout: function(req,res){
        console.log("hitting logout controller")
        req.session.destroy(function(err){
            if(err){
                console.log(err)
                res.json(err)
            }
        })
    },
}
 