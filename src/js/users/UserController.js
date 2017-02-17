var userService = require('./UserService')();

module.exports = function () {
    'use strict';

    function get(id) {
        return userService.getUser(id);
    }

    return {
        get: get
    }
};