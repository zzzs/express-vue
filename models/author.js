var mongoose = require('mongoose')

var AuthorSchema = require('./schemas/author')
var Author = mongoose.model('Author',AuthorSchema)

module.exports = Author
