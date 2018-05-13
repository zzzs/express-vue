var mongoose = require('mongoose')

var RoomSchema = require('./schemas/room')
var Room = mongoose.model('Room',RoomSchema)

module.exports = Room
