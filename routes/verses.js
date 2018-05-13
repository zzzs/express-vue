var express = require('express');
var router = express.Router();

var Verse = require('../models/verse');
var Author = require('../models/author');

// query verse
router.get('/', function(req, res, next) {
    var ret = {errcode: 0, errmsg: 'ok', result: null};
    Verse.find()
    .populate('aid')
    .exec()
    .then(
        function(result) {
            ret['result'] = result;

            res.json(ret);
        },
        function(err) {

        }
    );
});

// add verse
router.post('/add', function(req, res, next) {
    var data = req.body;
    var content = JSON.parse(data.content);

    Author.findOne({ name: data.aid })
    .then(
        function (result) {
            if (result === null) {
                return Author.create({ name: data.aid });
            } else {
                return result._id;
            }
        },
        function(err) {
            console.log('err', err)
        }
    )
    .then(
        function (authorData) {
            if (authorData._id === undefined) {
                return authorData;
            }
            return authorData._id;
        }
    )
    .then(function (aid) {
        Verse.create({ name: data.name, content: content, aid: aid })
        .then(
            function (result) {
                res.json({errcode: 0, errmsg: 'ok', data: null});
            },
            function(err) {
                console.log('err', err)
            }
        );
    })

});

// modify verse
router.post('/modify', function(req, res, next) {
    var data = req.body;
    Verse.create({ name: data.name, content: data.content, aid: data.aid })
    .then(
        function (result) {
            res.json({errcode: 0, errmsg: 'ok', data: null});
        },
        function(err) {
            console.log('err', err)
        }
    );
});

// delete verse
router.post('/delete', function(req, res, next) {
    var data = req.body;
    Verse.deleteOne({ _id: data.id })
    .then(
        function (result) {
            res.json({errcode: 0, errmsg: 'ok', data: null});
        },
        function(err) {
            console.log('err', err)
        }
    );
});

module.exports = router;
