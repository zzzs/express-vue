var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    uname:  String,
    content: String,
    rid: String,
    ctime: { type: Date, default: Date.now }
});

ChatSchema.methods = {

};

module.exports = ChatSchema
