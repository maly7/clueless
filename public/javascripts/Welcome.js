(function () {
    'use strict';
    var io = require('socket.io-client');
    var characterSocket = io.connect('http://localhost:3000/characters');

    var welcomeModal = '#welcome-modal';
    var selectButton = '#select-character';
    var characterSelect = '#character-options';

    var welcome = {};

    var showModal = function () {
        return $(welcomeModal).modal('show');
    };

    var registerSelectButton = function () {
        $(selectButton).click(function () {
            var selectedCharacter = $(characterSelect).val();
            $(selectButton).prop('disabled', true);
            $(characterSelect).prop('disabled', true);

            characterSocket.emit('character-selected', {
                character: selectedCharacter
            });
        });
    };

    welcome.init = function () {
        // showModal();
        registerSelectButton();
        return;
    };

    module.exports = welcome;
}());