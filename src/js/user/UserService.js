(function () {
    'use strict';
    var _ = require('lodash')

    var PLAYER_NAMESPACE = '/players';
    var CHARACTER_NAMESPACE = '/characters';

    var availableCharacters = ['Col. Mustard', 'Ms. Scarlet', 'Mrs. White', 'Rev. Green', 'Mrs. Peacock', 'Prof. Plum'];

    var userService = {};
    var users = {};
    var userCount = 0;

    userService.getUser = function (id) {
        return users[id];
    };

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
        availableCharacters = _.remove(availableCharacters, character);
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
            socket.on('character-selected', function (data) {
                registerCharacterSelect(stripId(socket.id), data.character);
            });
        });
    };

    userService.getCount = function () {
        return userCount;
    };

    userService.getAvailableCharacters = function () {
        return availableCharacters;
    }

    userService.addUser = addUser;
    userService.registerCharacterSelect = registerCharacterSelect;

    module.exports = userService;
}());