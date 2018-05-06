var socketServer = function (server) {

    var io = require('socket.io')(server);

    var numUsers = 0;
    var roomUsersNum = {};

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

        // emit同个房间
        socket.on('new message', function (data) {
            Chat.create({ uname: socket.user.name, content: data.msg, rid: data.roomId }, function (err, small) {
                if (err) return handleError(err);
            });

            io.sockets.to(data.roomId).emit('new message', {
                user: socket.user,
                message: data
            });
        });

        // emit同个房间
        socket.on('add user', function (user) {
            if (addedUser) return;

            // we store the user in the socket session for this client
            socket.user = user;

            User.find({ name: user.name }).exec()
            .then(
                function(result) {
                    if (result.length === 0) {
                        User.create({ name: user.name, password: '123123', nickname: user.name }, function (err, small) {
                            if (err) return handleError(err);
                        });
                    }
                },
                function(err) {

                }
            );

            socket.join(user.roomId);

            if (roomUsersNum[user.roomId] === undefined) {
                roomUsersNum[user.roomId] = 1;
            } else {
                roomUsersNum[user.roomId]++;
            }
            ++numUsers;

            addedUser = true;

            Chat.find({rid: user.roomId}).select('uname content').exec()
            .then(
                function(result) {
                    var chatNum = result.length;
                    var chatData = [];
                    for (var i = 0; i < chatNum; i++) {
                        chatData.push({
                            username: result[i]['uname'],
                            msg: result[i]['content']
                        })
                    }

                    socket.emit('login', {
                        chatData: chatData
                    });
                },
                function(err) {

                }
            );

            // echo globally (all clients) that a person has connected
            socket.to(user.roomId).emit('user joined', {
                user: socket.user
            });

            io.sockets.emit('user num', {
                numUsers: numUsers,
                roomUsersNum: roomUsersNum
            });
        });

        // 切换房间
        socket.on('change room', function (data) {
            socket.leave(data.oldRoomId);
            socket.join(data.roomId);
            roomUsersNum[data.oldRoomId]--;
            if (roomUsersNum[data.roomId] === undefined) {
                roomUsersNum[data.roomId] = 1;
            } else {
                roomUsersNum[data.roomId]++;
            }
            socket.to(data.roomId).emit('user joined', {
                user: socket.user
            });

            io.sockets.emit('user num', {
                numUsers: numUsers,
                roomUsersNum: roomUsersNum
            });

            Chat.find({rid: data.roomId}).select('uname content').exec()
            .then(
                function(result) {
                    var chatNum = result.length;
                    var chatData = [];
                    for (var i = 0; i < chatNum; i++) {
                        chatData.push({
                            username: result[i]['uname'],
                            msg: result[i]['content']
                        })
                    }
                    socket.emit('room changed', {
                        chatData: chatData
                    });
                },
                function(err) {

                }
            );

        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function () {
            console.log('disconnect', socket.user)
            if (addedUser) {
                --numUsers;

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    user: socket.user
                });

                io.sockets.emit('user num', {
                    numUsers: numUsers
                });
            }
        });
    });
}

module.exports = socketServer;
