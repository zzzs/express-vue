var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VerseSchema = new Schema({
    name: String,
    aid: {
        type: 'ObjectId',
        ref: 'Author'
    },
    content: 'Mixed',
    ctime: { type: Date, default: Date.now },
    mtime: { type: Date, default: Date.now }
});

module.exports = VerseSchema
