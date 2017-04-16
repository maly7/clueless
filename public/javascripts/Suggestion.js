(function () {
    'use strict';
    var _ = require('lodash');

    var suspects = ['Ms. Scarlet', 'Col. Mustard', 'Mrs. White', 'Rev. Green', 'Mrs. Peacock', 'Prof. Plum'];
    var weapons = ['Candlestick', 'Poison', 'Rope', 'Gloves', 'Horseshoe', 'Knife', 'Lead Pipe', 'Revolver', 'Wrench'];

    var suspectSelect = '#suggest-suspect';
    var roomSelect = '#suggest-room';
    var weaponSelect = '#suggest-weapon';
    var confrimSuggest = '#confirm-suggest';
    var selectedRoom = '';

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

    var init = function (socket) {
        gameSocket = socket;

        initSuspectSelect();
        initWeaponSelect();
    };

    var setRoom = function (room) {
        selectedRoom = room;
        initRoomSelect();
    };

    var suggestion = {
        init: init,
        setRoom: setRoom
    };

    module.exports = suggestion;
}());