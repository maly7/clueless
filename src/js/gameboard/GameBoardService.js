(function () {
    'use strict';
    var _ = require('lodash');

    var GAME_NAMESPACE = '/game';
    var playerList = [];
    var gameRunning = false;
    var currentPlayer = 0;

    var getCurrentPlayer = function() {
        var player = playerList[currentPlayer];
        if (currentPlayer + 1 >= playerList.length) {
            currentPlayer = 0;
        } else {
            currentPlayer++;
        }
        return player;
    }

    var startGame = function(players) {
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
                
                var players = userService.getPlayers();
                gameRunning = true;
                startGame(players);
            });
        });
    };

    var gameBoardService = {
        init: init
    };

    module.exports = gameBoardService;
}());