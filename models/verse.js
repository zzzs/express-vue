var mongoose = require('mongoose')

var VerseSchema = require('./schemas/verse')
var Verse = mongoose.model('Verse',VerseSchema)

module.exports = Verse
