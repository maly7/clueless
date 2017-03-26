(function () {
    'use strict';
    var messages = require('./Messages');

    var welcomeModal = '#welcome-modal';
    var endTurnButton = '#end-turn';
    var makeSuggestionButton = '#make-suggestion';
    var makeAccusationButton = '#make-accusation';
    var gameRunning = false;
    var gameSocket = {};

    var playerClasses = ['mustard', 'scarlet', 'white', 'green', 'peacock', 'plum'];

    var playerClass = '';
    var playerPosition = '';

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
            disableCellClicks();
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

    var makeCellsClickable = function (position) {
        var posArray = position.split('-');
        var yCoord = parseInt(posArray[0]);
        var xCoord = parseInt(posArray[1]);
        makeCellClickable(yCoord, xCoord - 1);
        makeCellClickable(yCoord, xCoord + 1);
        makeCellClickable(yCoord - 1, xCoord);
        makeCellClickable(yCoord + 1, xCoord);

        $('.td-clickable').hover(function () {
            $(this).toggleClass('hover-td');
        });

        $('.td-clickable').click(function () {
            $('#' + playerPosition).removeClass(playerClass);
            var id = $(this).attr('id');
            console.log(id + ' was clicked');
            console.log('player class is: ' + playerClass);
            $(this).addClass(playerClass);
            playerPosition = id;
        });
    };

    var makeCellClickable = function (y, x) {
        if (cellShouldBeMadeClickable(y, x) === true) {
            $('#' + y + '-' + x).addClass('td-clickable');
        }
    };

    var cellShouldBeMadeClickable = function (y, x) {
        return cellDoesNotContainEmpty(y, x) && cellDoesNotContainCharacter(y, x);
    };

    var cellDoesNotContainEmpty = function (y, x) {
        return $('#' + y + '-' + x).attr('class').indexOf('empty') < 0;
    };

    var cellDoesNotContainCharacter = function (y, x) {
        for (var i = 0; i < playerClasses.length; i++) {
            var cssClass = playerClasses[i];
            console.log('class attr: ' + $('#' + y + '-' + x).attr('class'));
            if ($('#' + y + '-' + x).attr('class').indexOf(cssClass) >= 0) {
                return false;
            }
        }
        return true;
    };

    var disableCellClicks = function () {
        $('.td-clickable').off();
        return $('.td-clickable').removeClass('td-clickable');
    };

    var listenToSocket = function () {
        gameSocket.on('game-started', function (data) {
            messages.addMessage(data.message);
            $(welcomeModal).modal('toggle');
        });
        gameSocket.on('player-turn', function (data) {
            enableButtons();
            makeCellsClickable(data.position);
            playerClass = data.cssClass;
            playerPosition = data.position;
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