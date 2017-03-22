(function () {
    'use strict';
    var _ = require('lodash');

    var GAME_NAMESPACE = '/game';
    var playerList = [];
    var gameRunning = false;
    var currentPlayer = 0;

    var getCurrentPlayer = function () {
        var player = playerList[currentPlayer];
        if (currentPlayer + 1 >= playerList.length) {
            currentPlayer = 0;
        } else {
            currentPlayer++;
        }
        return player;
    };

    var startGame = function (players) {
        playerList.push(players);

        // get current player
        // notify current player of turn
        // wait for end turn signal from current player
    };

    var init = function (io, userService) {
        var gameNsp = io.of(GAME_NAMESPACE);

        gameNsp.on('connection', function (socket) {
            socket.on('start-game', function (data) {
                console.log('game started!');

                var playerNumber = userService.getUserFromSocketId(socket.id).playerNumber;
                var message = 'Player ' + playerNumber + ' started the game!';
                gameNsp.emit('game-started', {
                    'message': message
                });

                playerList = userService.getPlayers();
                gameRunning = true;
                var player = getCurrentPlayer();
                gameNsp.clients().sockets[GAME_NAMESPACE + '#' + player.id].emit('player-turn', {
                    'message': 'Player ' + player.playerNumber + '\'s turn'
                });
            });
            socket.on('end-turn', function (data) {
                var player = getCurrentPlayer();
                gameNsp.clients().sockets[GAME_NAMESPACE + '#' + player.id].emit('player-turn', {
                    'message': 'Player ' + player.playerNumber + '\'s turn'
                });
            });
        });
    };

    var gameBoardService = {
        init: init
    };

    module.exports = gameBoardService;
}());