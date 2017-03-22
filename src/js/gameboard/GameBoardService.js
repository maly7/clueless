(function () {
    'use strict';
    var _ = require('lodash');

    var GAME_NAMESPACE = '/game';
    var gameNsp = {};
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

    var notifyPlayerTurn = function () {
        var player = getCurrentPlayer();
        var message = 'Player ' + player.playerNumber + '\'s turn';
        gameNsp.clients().sockets[GAME_NAMESPACE + '#' + player.id].emit('player-turn', {
            'message': message,
            'position': player.position
        });
        gameNsp.emit('game-status', {
            'message': message
        });
        gameNsp.emit('mark-positions', {
            'players': playerList
        });
    };

    var startGame = function (playerNumber, players) {
        console.log('game started!');

        var message = 'Player ' + playerNumber + ' started the game!';
        gameNsp.emit('game-started', {
            'message': message
        });

        playerList = players;
        gameRunning = true;
        notifyPlayerTurn();
    };

    var init = function (io, userService) {
        gameNsp = io.of(GAME_NAMESPACE);

        gameNsp.on('connection', function (socket) {
            socket.on('start-game', function (data) {
                var playerNumber = userService.getUserFromSocketId(socket.id).playerNumber;
                startGame(playerNumber, userService.getPlayers());
            });
            socket.on('end-turn', function (data) {
                notifyPlayerTurn();
            });
        });
    };

    var gameBoardService = {
        init: init
    };

    module.exports = gameBoardService;
}());