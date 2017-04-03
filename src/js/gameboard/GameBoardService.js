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

        if (!player.active) {
            return notifyPlayerTurn();
        }

        var message = 'Player ' + player.playerNumber + '\'s turn';
        gameNsp.emit('mark-positions', {
            'players': playerList
        });
        gameNsp.clients().sockets[GAME_NAMESPACE + '#' + player.id].emit('player-turn', {
            'message': message,
            'position': player.position,
            'cssClass': player.class,
            'active': player.active
        });
        gameNsp.emit('game-status', {
            'message': message
        });
    };

    var notifyPlayerOfCards = function (player) {
        gameNsp.clients().sockets[GAME_NAMESPACE + '#' + player.id].emit('cards', {
            'cards': player.cards,
            'extraCards': extraCards
        });
    };

    var startGame = function (playerNumber, players) {
        console.log('game started!');
        playerList = players;
        solution = cardDealer.selectMurderCase();
        extraCards = cardDealer.dealCardsToPlayers(playerList);
        console.log('Game solution: ' + solution.suspect + ' with the ' + solution.weapon + ' in the ' + solution.room);

        var message = 'Player ' + playerNumber + ' started the game!';
        gameNsp.emit('game-started', {
            'message': message
        });

        _.forEach(playerList, notifyPlayerOfCards);

        gameRunning = true;
        notifyPlayerTurn();
    };

    var checkAccusation = function (accusation) {
        return accusation.weapon === solution.weapon &&
            accusation.suspect === solution.suspect &&
            accusation.room === solution.room;
    };

    var notifyWinningPlayer = function (id) {
        return gameNsp.clients().sockets[id].emit('game-won', solution);
    };

    var notifyPlayersGameOver = function (socket) {
        return socket.broadcast.emit('game-over', {
            'solution': solution,
            'player': currentPlayer.playerNumber
        });
    };

    var notifyPlayerOfIncorrectAccusation = function (id) {
        return gameNsp.clients().sockets[id].emit('game-lost', solution);
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
            socket.on('make-accusation', function (data) {
                var id = socket.id;
                console.log('Player with id ' + id + ' accuses ' + data.suspect + ' with the ' + data.weapon + ' in the ' + data.room);
                var isCorrectSolution = checkAccusation(data);
                if (isCorrectSolution) {
                    notifyWinningPlayer(id);
                    notifyPlayersGameOver(socket);
                } else {
                    notifyPlayerOfIncorrectAccusation(id);
                    currentPlayer.active = false;
                }
            });
        });
    };

    var gameBoardService = {
        init: init
    };

    module.exports = gameBoardService;
}());