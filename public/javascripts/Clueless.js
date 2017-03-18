var gameBoard = require('./GameBoard');
var messages = require('./Messages');

window.onload = function () {
    gameBoard.populateCells();
    messages.listen();
    messages.registerSendButtonListener();
};
