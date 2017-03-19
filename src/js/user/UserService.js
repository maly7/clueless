(function () {
    'use strict';

    var userService = {};
    var users = [];
    var userCount = 0;

    userService.getUser = function (id) {
        console.log('get user function called with id: ' + id);
        return {
            id: id
        };
    };

    var addUser = function(id) {
        userCount++;
        var newUser = {
            'id': id,
            'playerNumber': userCount
        };
        users.push(newUser);

        return newUser;
    };

    userService.init = function (io) {
        var playerNsp = io.of('/players');

        playerNsp.on('connection', function (socket) {
            var newPlayer = addUser(socket.id)

            playerNsp.emit('player-joined', {
                'message': 'Hello Player ' + newPlayer.playerNumber,
                'id': newPlayer.id
            });
        });
    };

    module.exports = userService;
}());