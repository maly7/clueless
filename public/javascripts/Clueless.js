var gameBoard = require('./GameBoard');
var messages = require('./Messages');
var players = require('./Players');
var welcome = require('./Welcome');
var game = require('./Game');

$(document).ready(function () {
    game.init();
    welcome.init();
    gameBoard.init();
    players.listen();
    messages.listen();
    messages.registerSendButtonListener();
});
