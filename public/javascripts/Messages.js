var io = require('socket.io-client');
var $ = require('jquery');
var socket = io.connect('http://localhost:3000');

$('#send-btn').click(function() {
    var text = getChatInput();
    sendButtonClicked(text);
    clearChatInput();
    return false;
});

socket.on('player-joined', function (data) {
    addMessage(data.message);
});

socket.on('chat message', function(data) {
    addMessage(data.message);
});

var addMessage = function (message) {
    return $('#messages').append($('<li>').text(message));
};

var sendButtonClicked = function (text) {
    socket.emit('chat message', {
        message: text
    });
};

var getChatInput = function() {
    return $('#chat-box').val();
};

var clearChatInput = function() {
    return $('#chat-box').val('');
}