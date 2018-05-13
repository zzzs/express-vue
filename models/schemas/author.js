var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VerseSchema = new Schema({
    name: String,
    nickname: { type: String, default: '' },
    dynasty: { type: String, default: '' },
    ctime: { type: Date, default: Date.now },
    style: { type: String, default: '' }
});

module.exports = VerseSchema
