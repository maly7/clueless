var io = require('socket.io-client');
var $ = require('jquery');
var socket = io.connect('http://localhost:3000');

socket.on('player-joined', function (data) {
    addMessage('Welcome Player ' + data.id);
});

var addMessage = function(message) {
    return $('#messages').append($('<li>').text(message));
};