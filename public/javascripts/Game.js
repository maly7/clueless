(function () {
    'use strict';
    var io = require('socket.io-client');
    var gameSocket = io.connect('http://localhost:3000/game');
    var messages = require('./Messages');

    var welcomeModal = '#welcome-modal';
    var gameRunning = false;

    var startGame = function () {
        console.log('startGame called');
        gameRunning = true;
        gameSocket.emit('start-game', {
            started: gameRunning
        });
        return;
    };

    var listenToSocket = function () {
        gameSocket.on('game-started', function (data) {
            console.log('pls dismiss modal');
            messages.addMessage(data.message);
            $(welcomeModal).modal('toggle');
        });
    };

    var init = function () {
        listenToSocket();
    };

    var game = {
        init: init,
        startGame: startGame
    };

    module.exports = game;

}());