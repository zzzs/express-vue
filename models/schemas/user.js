var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:  String,
	password:  String
});

UserSchema.methods = {
	findSimilarTypes: function(cb) {
		return this.model('User').find({ name: '' }, cb);
	}
};

module.exports = UserSchema
