var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:  String,
	password:  String,
    nickname: String,
    ctime: { type: Date, default: Date.now },
    mtime: { type: Date, default: Date.now },
    logincount: Number
});

UserSchema.methods = {
	findSimilarTypes: function(cb) {
		return this.model('User').find({ name: '' }, cb);
	}
};

module.exports = UserSchema
