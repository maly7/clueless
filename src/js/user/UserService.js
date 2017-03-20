(function () {
    'use strict';
    var _ = require('lodash');

    var PLAYER_NAMESPACE = '/players';
    var CHARACTER_NAMESPACE = '/characters';

    var availableCharacters = ['Col. Mustard', 'Ms. Scarlet', 'Mrs. White', 'Rev. Green', 'Mrs. Peacock', 'Prof. Plum'];

    var userService = {};
    var users = {};
    var userCount = 0;
    var connectedPlayers = 0;

    var getUser = function (id) {
        return users[id];
    };

    var getUserFromSocketId = function (socketId) {
        return getUser(stripId(socketId));
    }

    var stripId = function (id) {
        return id.substring(id.indexOf('#') + 1);
    };

    var addUser = function (id) {
        userCount++;
        var newId = stripId(id);
        var newUser = {
            'id': newId,
            'playerNumber': userCount
        };
        users[newId] = newUser;

        return newUser;
    };

    var registerCharacterSelect = function (id, character) {
        _.remove(availableCharacters, function (val) {
            return val === character;
        });
        users[id].character = character;
        return;
    };

    userService.init = function (io) {
        var playerNsp = io.of(PLAYER_NAMESPACE);
        var characterNsp = io.of(CHARACTER_NAMESPACE);

        playerNsp.on('connection', function (socket) {
            var newPlayer = addUser(socket.id);

            playerNsp.emit('player-joined', {
                'message': 'Hello Player ' + newPlayer.playerNumber,
                'id': newPlayer.id
            });
        });

        characterNsp.on('connection', function (socket) {
            socket.emit('available-characters', {
                'characters': availableCharacters,
                'count': connectedPlayers
            });

            socket.on('character-selected', function (data) {
                connectedPlayers++;
                registerCharacterSelect(stripId(socket.id), data.character);
                socket.broadcast.emit('available-characters', {
                    'characters': availableCharacters
                });
                characterNsp.emit('player-count', {
                    'count': connectedPlayers
                });
                var user = getUserFromSocketId(socket.id);
                var message = 'Player ' + user.playerNumber + ' selected ' + user.character;
                io.emit('player-action', {
                    'player': user.playerNumber,
                    'action': 'selected character',
                    'message': message
                });
            });
        });
    };

    userService.getCount = function () {
        return userCount;
    };

    userService.getConnectedPlayerCount = function () {
        return connectedPlayers;
    };

    userService.getAvailableCharacters = function () {
        return availableCharacters;
    };

    userService.getUserFromSocketId = getUserFromSocketId;
    userService.getUser = getUser;
    userService.addUser = addUser;
    userService.registerCharacterSelect = registerCharacterSelect;

    module.exports = userService;
}());