(function () {
    'use strict';
    var _ = require('lodash');

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

    var suspectSelect = '#suggest-suspect';
    var roomSelect = '#suggest-room';
    var weaponSelect = '#suggest-weapon';
    var confirmSuggest = '#confirm-suggest';
    var selectedRoom = '';
    var playerPosition = '';

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

            gameSocket.emit('make-suggestion', suggestion);
        });
    };


    var init = function (socket) {
        gameSocket = socket;

        initSuspectSelect();
        initWeaponSelect();
        registerSuggestButton();
    };

    var setPlayerInfo = function (room, position) {
        selectedRoom = roomNames[room];
        playerPosition = position;
        initRoomSelect();
    };

    var suggestion = {
        init: init,
        setPlayerInfo: setPlayerInfo
    };

    module.exports = suggestion;
}());