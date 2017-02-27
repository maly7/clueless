(function () {
    'use strict';

    function SocketService(io) {
        var service = this;
        service.io = io;

        io.on('connection', function (socket) {
            socket.emit('news', {
                event: 'Hello world'
            });
        });
    }

    SocketService.prototype.connect = function(url) {
        return this.io.connect(url);
    };

    module.exports = SocketService;

}());