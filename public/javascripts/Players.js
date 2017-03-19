(function () {
    'use strict';
    var io = require('socket.io-client');
    var playerSocket = io.connect('http://localhost:3000/players');
    var messages = require('./Messages');

    var players = function () {
        var registerSockets = function () {
            playerSocket.on('player-joined', function (data) {
                messages.addMessage(data.message);
            });
        };

        return {
            listen: registerSockets
        }
    };

    module.exports = players();

}());