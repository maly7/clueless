var gameBoard = require('./GameBoard');
var messages = require('./Messages');

$(document).ready(function () {
    // $('#welcome-modal').modal('show');

    gameBoard.init();
    messages.listen();
    messages.registerSendButtonListener();
});
