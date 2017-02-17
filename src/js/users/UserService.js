module.exports = function () {
    'use strict';

    function getUser(id) {
        console.log('get user function called with id: ' + id);
    }

    return {
        getUser: getUser
    }
};