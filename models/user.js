var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test')

var UserSchema = require('./schemas/user')
var User = mongoose.model('User',UserSchema)

module.exports = User
