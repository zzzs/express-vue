var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name:  String,
    ctime: { type: Date, default: Date.now },
    mtime: { type: Date, default: Date.now }
});

RoomSchema.methods = {
};

module.exports = RoomSchema
