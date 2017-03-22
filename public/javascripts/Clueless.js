var gameBoard = require('./GameBoard');
var messages = require('./Messages');
var players = require('./Players');
var welcome = require('./Welcome');
var game = require('./Game');

var io = require('socket.io-client');

$(document).ready(function () {
    var gameSocket = io.connect('http://localhost:3000/game');

    game.init(gameSocket);
    welcome.init();
    gameBoard.init(gameSocket);
    players.listen();
    messages.listen();
    messages.registerSendButtonListener();
});