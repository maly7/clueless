var gameBoard = require('./GameBoard');
var messages = require('./Messages');

$(document).ready(function () {
    $('#welcome-modal').modal('show');

    gameBoard.populateCells();
    messages.listen();
    messages.registerSendButtonListener();
});