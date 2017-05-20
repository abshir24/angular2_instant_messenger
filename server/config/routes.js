var controller = require("./../controllers/controller.js")


module.exports = function(app){
    app.get("/users",controller.get_all_users)
    app.get('/loggedin',controller.loggedin)
    app.post("/create",controller.create)
    app.post('/find',controller.find)
    app.get('/logout', controller.logout)
}