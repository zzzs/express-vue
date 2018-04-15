var express = require('express');
var router = express.Router();

var User = require('../models/user');
var user = new User();

/* GET home page. */
router.get('/', function(req, res, next) {
	user.findSimilarTypes(function(err, user) {
		res.json({ title: 'Express' });
	});
});

module.exports = router;
