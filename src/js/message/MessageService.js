(function () {
    'use strict';

    var messageService = function () {
        function getMessages() {
            return [{
                text: 'Sample Message 1'
            }, {
                text: 'Sample Message 2'
            }];
        }

        return {
            getMessages: getMessages
        };
    };

    module.exports = messageService();

}());