(function () {
    'use strict';
    var _ = require('lodash');

    var PLAYER_NAMESPACE = '/players';
    var CHARACTER_NAMESPACE = '/characters';

    var availableCharacters = [{
        name: 'Col. Mustard',
        position: '3-9',
        class: 'mustard'
    }, {
        name: 'Ms. Scarlet',
        position: '1-7',
        class: 'scarlet'
    }, {
        name: 'Mrs. White',
        position: '9-7',
        class: 'white'
    }, {
        name: 'Rev. Green',
        position: '9-3',
        class: 'green'
    }, {
        name: 'Mrs. Peacock',
        position: '7-1',
        class: 'peacock'
    }, {
        name: 'Prof. Plum',
        position: '3-1',
        class: 'plum'
    }];

    var userService = {};
    var users = {};
    var userCount = 0;
    var connectedPlayers = 0;

    var getUser = function (id) {
        return users[id];
    };

    var getUserFromSocketId = function (socketId) {
        return getUser(stripId(socketId));
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
        var selectedCharacter = _.find(availableCharacters, ['name', character]);
        _.remove(availableCharacters, function (val) {
            return val.name === character;
        });
        users[id].character = selectedCharacter.name;
        users[id].position = selectedCharacter.position;
        users[id].class = selectedCharacter.class;
        users[id].active = true;
        return;
    };

    var getPlayers = function () {
        return _.filter(users, ['active', true]);
    };

    
    var getAvailableCharacters = function () {
        return _.map(availableCharacters, 'name');
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
                'characters': getAvailableCharacters(),
                'count': connectedPlayers
            });

            socket.on('character-selected', function (data) {
                connectedPlayers++;
                registerCharacterSelect(stripId(socket.id), data.character);
                socket.broadcast.emit('available-characters', {
                    'characters': getAvailableCharacters()
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

    userService.getAvailableCharacters = getAvailableCharacters;
    userService.getUserFromSocketId = getUserFromSocketId;
    userService.getUser = getUser;
    userService.addUser = addUser;
    userService.registerCharacterSelect = registerCharacterSelect;
    userService.getPlayers = getPlayers;

    module.exports = userService;
}());