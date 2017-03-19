var gameBoard = require('./GameBoard');
var messages = require('./Messages');
var players = require('./Players');

$(document).ready(function () {
    // $('#welcome-modal').modal('show');

    gameBoard.init();
    players.listen();
    messages.listen();
    messages.registerSendButtonListener();
});
