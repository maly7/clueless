(function () {
    'use strict';
    var io = require('socket.io-client');
    var socket = io.connect('http://localhost:3000');
    var $ = require('jquery');

    var messages = function () {
        var addMessage = function (message) {
            $('#messages').append($('<li>').text(message));
            return scrollToBottom();
        };

        var sendButtonClicked = function (text) {
            console.log("Send button clicked with text: " + text);
            socket.emit('chat-send', {
                message: text
            });
        };

        var getChatInput = function () {
            return $('#chat-box').val();
        };

        var clearChatInput = function () {
            return $('#chat-box').val('');
        };

        var scrollToBottom = function() {
            return $('.message-list').animate({scrollTop: $('.message-list').prop('scrollHeight')}, 1000);
        };

        var registerSockets = function () {
            socket.on('chat-message', function (data) {
                addMessage(data.message);
            });
            socket.on('player-action', function (data) {
                addMessage(data.message);
            });
        };

        var registerSendButtonListener = function () {
            $('#send-btn').click(function () {
                console.log('send clicked');
                var text = getChatInput();
                sendButtonClicked(text);
                clearChatInput();
                return false;
            });
        };

        return {
            listen: registerSockets,
            registerSendButtonListener: registerSendButtonListener,
            addMessage: addMessage
        };
    };

    module.exports = messages();
}());