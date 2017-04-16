(function () {
    'use strict';

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

    var init = function (socket, room) {
        gameSocket = socket;
        selectedRoom = room;

        initRoomSelect();
        initSuspectSelect();
        initWeaponSelect();
    };

    var suggestion = {
        init: init
    };

    module.exports = suggestion;
}());