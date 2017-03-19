var gameBoard = require('./GameBoard');
var messages = require('./Messages');
var players = require('./Players');
var welcome = require('./Welcome');

$(document).ready(function () {
    welcome.init();
    gameBoard.init();
    players.listen();
    messages.listen();
    messages.registerSendButtonListener();
});
