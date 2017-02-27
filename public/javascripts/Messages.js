var io = require('socket.io-client');
var $ = require('jquery');
var socket = io.connect('http://localhost:3000');

socket.on('player-joined', function (data) {
    $('#messages').append($('<li>').text('Welcome Player ' + data.id));
});
