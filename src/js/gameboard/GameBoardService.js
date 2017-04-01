(function () {
    'use strict';
    var _ = require('lodash');

    var GAME_NAMESPACE = '/game';
    var gameNsp = {};
    var playerList = [];
    var gameRunning = false;
    var currentPlayerIndex = 0;
    var currentPlayer = {};
    var cardDealer = {};
    var solution = {};
    var extraCards = [];

    var getNextPlayer = function () {
        currentPlayer = playerList[currentPlayerIndex];
        if (currentPlayerIndex + 1 >= playerList.length) {
            currentPlayerIndex = 0;
        } else {
            currentPlayerIndex++;
        }
        return currentPlayer;
    };

    var notifyPlayerTurn = function () {
        var player = getNextPlayer();
        var message = 'Player ' + player.playerNumber + '\'s turn';
        gameNsp.emit('mark-positions', {
            'players': playerList
        });
        gameNsp.clients().sockets[GAME_NAMESPACE + '#' + player.id].emit('player-turn', {
            'message': message,
            'position': player.position,
            'cssClass': player.class
        });
        gameNsp.emit('game-status', {
            'message': message
        });
    };

    var startGame = function (playerNumber, players) {
        console.log('game started!');

        var message = 'Player ' + playerNumber + ' started the game!';
        gameNsp.emit('game-started', {
            'message': message
        });

        playerList = players;

        solution = cardDealer.selectMurderCase();
        extraCards = cardDealer.dealCardsToPlayers(playerList);

        console.log(playerList);

        gameRunning = true;
        notifyPlayerTurn();
    };

    var init = function (io, userService, cardService) {
        gameNsp = io.of(GAME_NAMESPACE);
        cardDealer = cardService;

        gameNsp.on('connection', function (socket) {
            socket.on('start-game', function (data) {
                var playerNumber = userService.getUserFromSocketId(socket.id).playerNumber;
                startGame(playerNumber, userService.getPlayers());
            });
            socket.on('end-turn', function (data) {
                currentPlayer.position = data.position;
                notifyPlayerTurn();
            });
        });
    };

    var gameBoardService = {
        init: init
    };

    module.exports = gameBoardService;
}());