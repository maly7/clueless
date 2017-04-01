(function () {
    'use strict';
    var messages = require('./Messages');
    var cellUtils = require('./CellUtils');
    var cards = require('./Cards');

    var welcomeModal = '#welcome-modal';
    var endTurnButton = '#end-turn';
    var makeSuggestionButton = '#make-suggestion';
    var makeAccusationButton = '#make-accusation';
    var gameRunning = false;
    var gameSocket = {};

    var playerClasses = ['mustard', 'scarlet', 'white', 'green', 'peacock', 'plum'];

    var playerClass = '';
    var playerPosition = '';

    var secretPassageMap = {
        '2-8': ['8-1', '9-1', '9-2', '8-2'],
        '8-2': ['1-8', '1-9', '2-9', '2-8'],
        '2-2': ['8-9', '9-9', '9=8', '8-8'],
        '8-8': ['1-2', '1-1', '2-1', '2-2']
    };

    var startGame = function () {
        gameRunning = true;
        gameSocket.emit('start-game', {
            started: gameRunning
        });
        return;
    };

    var registerEndTurnButton = function () {
        $(endTurnButton).click(function () {
            gameSocket.emit('end-turn', {
                position: playerPosition
            });
            cellUtils.disableCellClicks();
            disableButtons();
        });
    };

    var disableButtons = function () {
        $(endTurnButton).prop('disabled', true);
        $(makeSuggestionButton).prop('disabled', true);
        $(makeAccusationButton).prop('disabled', true);
        return;
    };

    var enableButtons = function () {
        $(endTurnButton).prop('disabled', false);
        $(makeSuggestionButton).prop('disabled', false);
        $(makeAccusationButton).prop('disabled', false);
        return;
    };

    var registerCellClicks = function () {
        $('.td-clickable').click(function () {
            $('#' + playerPosition).removeClass(playerClass);
            var id = $(this).attr('id');
            $(this).addClass(playerClass);

            if ($(this).attr('class').indexOf('secret') >= 0) {
                playerPosition = cellUtils.findFirstCellWithoutCharacter(secretPassageMap[id], playerPosition);
            } else {
                playerPosition = id;
            }
        });
    };

    var startPlayerTurn = function (position) {
        cellUtils.makeCellsClickable(position);
        registerCellClicks();
    };

    var listenToSocket = function () {
        gameSocket.on('game-started', function (data) {
            messages.addMessage(data.message);
            $(welcomeModal).modal('toggle');
        });
        gameSocket.on('player-turn', function (data) {
            enableButtons();
            startPlayerTurn(data.position);
            playerClass = data.cssClass;
            playerPosition = data.position;
        });
        gameSocket.on('game-status', function (data) {
            messages.addMessage(data.message);
        });
        gameSocket.on('cards', function (data) {
            console.log('delt cards: ' + data.cards);
            console.log('extra cards: ' + data.extraCards);
            cards.init(data.cards, data.extraCards);
        });
    };

    var init = function (socket) {
        gameSocket = socket;
        listenToSocket();
        disableButtons();
        registerEndTurnButton();
    };

    var game = {
        init: init,
        startGame: startGame
    };

    module.exports = game;

}());