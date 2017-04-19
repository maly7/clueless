(function () {
    'use strict';
    var _ = require('lodash');
    var boardUtils = require('./BoardUtils');

    var GAME_NAMESPACE = '/game';
    var gameNsp = {};
    var playerList = [];
    var gameRunning = false;
    var currentPlayerIndex = 0;
    var suggestionPlayerIndex = 0;
    var currentPlayer = {};
    var cardDealer = {};
    var solution = {};
    var extraCards = [];
    var suggestionDisproved = false;
    var currentSuggestion = {};

    var getNextPlayer = function () {
        currentPlayer = playerList[currentPlayerIndex];
        currentPlayer.index = currentPlayerIndex;
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

    var handleSuggestion = function (suggestion, socketId) {
        gameNsp.emit('game-status', {
            'message': 'Player ' + currentPlayer.playerNumber + ' suggests ' + suggestion.suspect + ' with the ' + suggestion.weapon + ' in the ' + suggestion.room
        });
        currentPlayer.position = suggestion.position;
        movePlayerToRoom(suggestion.suspect, suggestion.room);

        suggestionPlayerIndex = currentPlayerIndex;
        suggestionDisproved = false;
        currentSuggestion = suggestion;

        gameNsp.clients().sockets[GAME_NAMESPACE + '#' + playerList[suggestionPlayerIndex].id].emit('disprove-suggestion', currentSuggestion);
    };

    var notifyPlayerToDisproveSuggestion = function () {
        if (suggestionDisproved) {
            return;
        }

        if (suggestionPlayerIndex + 1 >= playerList.length) {
            suggestionPlayerIndex = 0;
        } else {
            suggestionPlayerIndex++;
        }

        if (suggestionPlayerIndex === currentPlayer.index) {
            gameNsp.clients().sockets[GAME_NAMESPACE + '#' + currentPlayer.id].emit('no-player-could-disprove', {});
            gameNsp.emit('game-status', {
                'message': 'No players were able to disprove the suggestion'
            });
            return;
        }

        gameNsp.clients().sockets[GAME_NAMESPACE + '#' + playerList[suggestionPlayerIndex].id].emit('disprove-suggestion', currentSuggestion);
    };

    var movePlayerToRoom = function (character, room) {
        var playerToMove = _.find(playerList, ['character', character]);

        if (playerToMove === undefined) {
            return;
        }
        var newPosition = boardUtils.findEmptyCellInRoom(room, playerToMove.position, playerList);
        playerToMove.position = newPosition;
        gameNsp.emit('mark-positions', {
            'players': playerList
        });
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

    var notifyPlayerOfIncorrectAccusation = function (id, accusation, playerNumber) {
        gameNsp.emit('game-status', {
            'message': 'Player ' + playerNumber + ' incorrectly accused ' + accusation.suspect + ' with the ' + accusation.weapon + ' in the ' + accusation.room
        });
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
                    notifyPlayerOfIncorrectAccusation(id, data, currentPlayer.playerNumber);
                    currentPlayer.active = false;
                }
            });
            socket.on('make-suggestion', function (data) {
                console.log('Player with id ' + socket.id + ' suggests ' + data.suspect + ' with the ' + data.weapon + ' in the ' + data.room);
                handleSuggestion(data, socket.id);
            });
            socket.on('unable-to-disprove', function (data) {
                var playerNumber = userService.getUserFromSocketId(socket.id).playerNumber;
                gameNsp.emit('game-status', {
                    'message': 'Player ' + playerNumber + ' was unable to disprove the suggestion'
                });
                notifyPlayerToDisproveSuggestion();
            });
            socket.on('suggestion-disproved', function (data) {
                suggestionDisproved = true;
                var playerNumber = userService.getUserFromSocketId(socket.id).playerNumber;
                gameNsp.emit('game-status', {
                    'message': 'Player ' + playerNumber + ' proved the suggestion false with their card: ' + data.reason
                });
                gameNsp.clients().sockets[GAME_NAMESPACE + '#' + currentPlayer.id].emit('suggestion-false', {
                    'reason': data.reason,
                    'player': playerNumber
                });
            });
        });
    };

    var gameBoardService = {
        init: init
    };

    module.exports = gameBoardService;
}());