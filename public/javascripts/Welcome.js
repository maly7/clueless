(function () {
    'use strict';
    var io = require('socket.io-client');
    var characterSocket = io.connect('http://localhost:3000/characters');
    var _ = require('lodash');
    var game = require('./Game');

    var welcomeModal = '#welcome-modal';
    var selectButton = '#select-character';
    var characterSelect = '#character-options';
    var waitingMessage = '#waiting-message';
    var startGameButton = '#start-btn';
    var characterSelected = false;

    var welcome = {};

    var showModal = function () {
        // Use this version to prevent clicking off modal to dismiss
        // Leaving this off for now because it's annoying
        // return $(welcomeModal).modal({
        //     backdrop: 'static',
        //     keyboard: false
        // });
        $(welcomeModal).modal('show');
    };

    var registerSelectButton = function () {
        $(selectButton).click(function () {
            var selectedCharacter = $(characterSelect).val();
            characterSelected = true;
            $(selectButton).prop('disabled', true);
            $(characterSelect).prop('disabled', true);

            characterSocket.emit('character-selected', {
                character: selectedCharacter
            });
        });
    };

    var registerStartGameButton = function() {
        $(startGameButton).click(function () {
            game.startGame();
        });
    };

    var setWaitingCount = function (count) {
        if (count < 3) {
            $(waitingMessage).text('Waiting for at least 3 Players, currently there are ' + count);
        } else {
            $(waitingMessage).removeClass('waiting-message');
            $(waitingMessage).addClass('ready-message');
            $(waitingMessage).text('Ready to start the game with ' + count + ' Players!');
        }
    };

    var setCharacterOptions = function (characters) {
        if (characterSelected === true) {
            return;
        }
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
            setWaitingCount(count);
            if (count < 3) {
                return;
            }
            $(startGameButton).prop('disabled', false);
        });
    };

    welcome.init = function () {
        showModal();
        registerSelectButton();
        registerStartGameButton();
        listenToSocket();
        return;
    };

    module.exports = welcome;
}());