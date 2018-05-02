var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    uname:  String,
    content: String,
    ctime: { type: Date, default: Date.now }
});

ChatSchema.methods = {

};

module.exports = ChatSchema
