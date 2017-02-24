(function () {
    'use strict';

    var socketService = function (io) {
        this.io = io;
        this.io.on('connection', function (socket) {
            socket.emit('news', {
                event: 'Hello world'
            });
        });

        var connect = function (url) {
            return this.io.connect(url);
        };

        return {
            connect: connect
        };
    };

    module.exports = socketService;

}());