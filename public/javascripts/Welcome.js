(function () {
    'use strict';
    var io = require('socket.io-client');
    var characterSocket = io.connect('http://localhost:3000/characters');
    var _ = require('lodash');

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

    var listenToSocket = function () {
        characterSocket.on('available-characters', function (data) {
            $(characterSelect).children().remove();
            console.log(data.characters);
            _.forEach(data.characters, function (character) {
                $(characterSelect).append('<option>' + character + '</option>');
            });
        });
    };

    welcome.init = function () {
        // showModal();
        registerSelectButton();
        listenToSocket();
        return;
    };

    module.exports = welcome;
}());