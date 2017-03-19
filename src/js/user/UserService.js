(function () {
    'use strict';
    var PLAYER_NAMESPACE = '/players';

    var userService = {};
    var users = [];
    var userCount = 0;

    userService.getUser = function (id) {
        console.log('get user function called with id: ' + id);
        return {
            id: id
        };
    };

    var addUser = function (id) {
        userCount++;
        var plainId = id.substring(id.indexOf('#') + 1);
        var newUser = {
            'id': plainId,
            'playerNumber': userCount
        };
        users.push(newUser);

        return newUser;
    };

    userService.init = function (io) {
        var playerNsp = io.of(PLAYER_NAMESPACE);

        playerNsp.on('connection', function (socket) {
            var newPlayer = addUser(socket.id)
            console.log(newPlayer.id);
            playerNsp.emit('player-joined', {
                'message': 'Hello Player ' + newPlayer.playerNumber,
                'id': newPlayer.id
            });
        });
    };

    module.exports = userService;
}());