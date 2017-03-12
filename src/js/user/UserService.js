(function () {
    'use strict';

    var userService = function () {
        function getUser(id) {
            console.log('get user function called with id: ' + id);
            return {
                id: id
            };
        }

        return {
            getUser: getUser
        };
    };

    module.exports = userService();
}());