var express = require('express');
var router = express.Router();

var Verse = require('../models/verse');

// add verse
router.get('/', function(req, res, next) {
    $ret = {errcode: 0, errormsg: 'ok', result: null};
    Verse.find().exec()
    .then(
        function(result) {
            $ret['result'] = result;
            res.json($ret);
        },
        function(err) {

        }
    );
});

// add verse
router.post('/add', function(req, res, next) {
    var data = req.body;
    Verse.create({ name: data.name, content: data.content, aid: data.aid })
    .then(
        function (result) {
            res.json({errcode: 0, errormsg: 'ok', data: null});
        },
        function(err) {
            console.log('err', err)
        }
    );

});

module.exports = router;
