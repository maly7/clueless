(function () {
    'use strict';
    var _ = require('lodash');
    var cellUtils = require('./CellUtils');

    var suspects = ['Ms. Scarlet', 'Col. Mustard', 'Mrs. White', 'Rev. Green', 'Mrs. Peacock', 'Prof. Plum'];
    var weapons = ['Candlestick', 'Poison', 'Rope', 'Gloves', 'Horseshoe', 'Knife', 'Lead Pipe', 'Revolver', 'Wrench'];

    var roomNames = {
        'study': 'Study',
        'hall': 'Hall',
        'lounge': 'Lounge',
        'library': 'Library',
        'billiard': 'Billiard Room',
        'dining': 'Dining Room',
        'conservatory': 'Conservatory',
        'ballroom': 'Ballroom',
        'kitchen': 'Kitchen'
    };

    var makeSuggestionButton = '#make-suggestion';
    var endTurnButton = '#end-turn';
    var suspectSelect = '#suggest-suspect';
    var roomSelect = '#suggest-room';
    var weaponSelect = '#suggest-weapon';
    var confirmSuggest = '#confirm-suggest';
    var suggestInfo = '#suggest-info';
    var selectedRoom = '';
    var playerPosition = '';

    var loadingClass = 'glyphicon glyphicon-refresh glyphicon-refresh-animate';

    var gameSocket = {};

    var initRoomSelect = function () {
        $(roomSelect).prop('disabled', true);
        $(roomSelect).children().remove();
        $(roomSelect).append('<option>' + selectedRoom + '</option>');
    };

    var initSuspectSelect = function () {
        appendToSelect(suspectSelect, suspects);
    };

    var initWeaponSelect = function () {
        appendToSelect(weaponSelect, weapons);
    };

    var appendToSelect = function (select, options) {
        return _.forEach(options, function (option) {
            $(select).append('<option>' + option + '</option>');
        });
    };

    var registerSuggestButton = function () {
        $(confirmSuggest).click(function () {
            var suggestion = {
                'suspect': $(suspectSelect).val(),
                'weapon': $(weaponSelect).val(),
                'room': selectedRoom,
                'position': playerPosition
            };

            waitForDisprove();
            gameSocket.emit('make-suggestion', suggestion);
            $(makeSuggestionButton).prop('disabled', true);
            $(endTurnButton).prop('disabled', false);
            cellUtils.disableCellClicks();
        });
    };

    var waitForDisprove = function () {
        $('#close-suggest').prop('disabled', true);
        $(suggestInfo).text('Waiting For Players to Disprove Suggestion');
        $(suspectSelect).prop('disabled', true);
        $(weaponSelect).prop('disabled', true);
        $(confirmSuggest).prop('disabled', true);
        $(confirmSuggest).text('');
        $(confirmSuggest).append('<span class=\'' + loadingClass + '\'></span>');
    };

    var listenToSocket = function () {
        gameSocket.on('suggestion-false', function (data) {
            // Display reason
            // Make modal dismissable 
        });
    };

    var init = function (socket) {
        gameSocket = socket;
        listenToSocket();
        initSuspectSelect();
        initWeaponSelect();
        registerSuggestButton();
    };

    var setPlayerInfo = function (room, position) {
        selectedRoom = roomNames[room];
        playerPosition = position;
        initRoomSelect();
        resetModal();
    };

    var resetModal = function () {
        $(confirmSuggest).children().remove();
        $(confirmSuggest).text('Suggest');
        $(confirmSuggest).prop('disabled', false);
        $(suspectSelect).prop('disabled', false);
        $(weaponSelect).prop('disabled', false);
        $(suggestInfo).text('Make a suggestion now that you\'ve changed rooms before ending your turn');
    };

    var suggestion = {
        init: init,
        setPlayerInfo: setPlayerInfo
    };

    module.exports = suggestion;
}());