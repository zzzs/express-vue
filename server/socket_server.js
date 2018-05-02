var socketServer = function (server) {

    var io = require('socket.io')(server);

    var numUsers = 0;

    var Chat = require('../models/chat');

    var Room = require('../models/room');

    var User = require('../models/user');
    var user = new User();

    io.on('connection', function (socket) {
        var addedUser = false;

        Room.find().exec()
        .then(
            function(result) {
                if (result.length === 0) {

                }
                socket.emit('roomdata', {
                    room: result
                });
            },
            function(err) {

            }
        );

        // when the client emits 'new message', this listens and executes
        socket.on('new message', function (data) {
            console.log(data, 'data');

            Chat.create({ uname: socket.username.name, content: data.msg }, function (err, small) {
                if (err) return handleError(err);
            });

            socket.emit('new message', {
                username: socket.username,
                message: data
            });
            // we tell the client to execute 'new message'
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
            });
        });

        // when the client emits 'add user', this listens and executes
        socket.on('add user', function (username) {
            if (addedUser) return;

            // we store the username in the socket session for this client
            socket.username = username;

            User.find({ name: username.name }).exec()
            .then(
                function(result) {
                    if (result.length === 0) {
                        User.create({ name: username.name, password: '123123', nickname: username.name }, function (err, small) {
                            if (err) return handleError(err);
                        });
                    }
                },
                function(err) {

                }
            );

            // (function (user) {
            //     if (user === null) {
            //         Tank.create({ size: 'small' }, function (err, small) {
            //             if (err) return handleError(err);
            //         })
            //     }
            // });

            ++numUsers;
            addedUser = true;
            socket.emit('login', {
                numUsers: numUsers
            });
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('user joined', {
                username: socket.username,
                numUsers: numUsers
            });
        });

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', function () {
            socket.broadcast.emit('typing', {
                username: socket.username
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', function () {
            socket.broadcast.emit('stop typing', {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function () {
            if (addedUser) {
                --numUsers;

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers
                });
            }
        });
    });
}

module.exports = socketServer;
