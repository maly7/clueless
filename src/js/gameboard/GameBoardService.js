(function () {
    'use strict';
    var GAME_NAMESPACE = '/game';

    var init = function (io, userService) {
        var gameNsp = io.of(GAME_NAMESPACE);

        gameNsp.on('connection', function (socket) {
            socket.on('start-game', function (data) {
                console.log('game started!');
                
                var playerNumber = userService.getUserFromSocketId(socket.id).playerNumber;
                var message = 'Player ' + playerNumber + ' started the game!';
                gameNsp.emit('game-started', {
                    'message': message
                });
            });
        });
    };

    var gameBoardService = {
        init: init
    };

    module.exports = gameBoardService;
}());