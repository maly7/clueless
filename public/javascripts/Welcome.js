(function () {
    'use strict';
    var io = require('socket.io-client');
    var characterSocket = io.connect('http://localhost:3000/characters');
    var _ = require('lodash');

    var welcomeModal = '#welcome-modal';
    var selectButton = '#select-character';
    var characterSelect = '#character-options';
    var waitingMessage = '#waiting-message';
    var startGameButton = '#start-btn';

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

    var setWaitingCount = function (count) {
        $(waitingMessage).text('Waiting for at least 3 Players, currently there are ' + count);
    };

    var setCharacterOptions = function (characters) {
        $(characterSelect).children().remove();

        _.forEach(characters, function (character) {
            $(characterSelect).append('<option>' + character + '</option>');
        });
    };

    var listenToSocket = function () {
        characterSocket.on('available-characters', function (data) {
            setCharacterOptions(data.characters);
            setWaitingCount(data.count);
        });

        characterSocket.on('player-count', function (data) {
            var count = data.count;
            if (count < 3) {
                setWaitingCount(count);
                return;
            }

            $(waitingMessage).removeClass('waiting-message');
            $(waitingMessage).addClass('ready-message');
            $(waitingMessage).text('Ready to start the game with ' + count + ' Players!');
            $(startGameButton).prop('disabled', false);
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