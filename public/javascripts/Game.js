(function () {
    'use strict';
    var messages = require('./Messages');

    var welcomeModal = '#welcome-modal';
    var endTurnButton = '#end-turn';
    var makeSuggestionButton = '#make-suggestion';
    var makeAccusationButton = '#make-accusation';
    var gameRunning = false;
    var gameSocket = {};

    var startGame = function () {
        gameRunning = true;
        gameSocket.emit('start-game', {
            started: gameRunning
        });
        return;
    };

    var registerEndTurnButton = function () {
        $(endTurnButton).click(function () {
            gameSocket.emit('end-turn', {});
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

    var listenToSocket = function () {
        gameSocket.on('game-started', function (data) {
            messages.addMessage(data.message);
            $(welcomeModal).modal('toggle');
        });
        gameSocket.on('player-turn', function (data) {
            enableButtons();
        });
        gameSocket.on('game-status', function (data) {
            messages.addMessage(data.message);
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