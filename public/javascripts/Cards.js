(function () {
    'use strict';
    var _ = require('lodash');

    var suspects = ['Ms. Scarlet', 'Col. Mustard', 'Mrs. White', 'Rev. Green', 'Mrs. Peacock', 'Prof. Plum'];
    var weapons = ['Candlestick', 'Poison', 'Rope', 'Gloves', 'Horseshoe', 'Knife', 'Lead Pipe', 'Revolver', 'Wrench'];
    var rooms = ['Kitchen', 'Ballroom', 'Conservatory', 'Billiard Room', 'Library', 'Study', 'Hall', 'Lounge', 'Dining Room', 'Cellar'];

    var gameSocket = {};
    var playerCards = [];
    var extraCards = [];

    var populateCardsTable = function () {
        // Suspects | Weapons | Rooms
        var playerSuspects = findCardsOfType(suspects);
        var playerWeapons = findCardsOfType(weapons);
        var playerRooms = findCardsOfType(rooms);

        var lengths = [playerSuspects.length, playerWeapons.length, playerRooms.length];
        var maxLength = _.max(lengths);
        var tableHtml = '';

        for (var i = 0; i < maxLength; i++) {
            tableHtml += '<tr>';
            tableHtml += createTableElement(playerSuspects, i);
            tableHtml += createTableElement(playerWeapons, i);
            tableHtml += createTableElement(playerRooms, i);
            tableHtml += '</tr>';
        }

        $('#card-table tbody').append(tableHtml);
    };

    var addExtraCardList = function() {
        if (extraCards.length <= 0) {
            return;
        }

        var extraCardsText = 'Extra Cards: ';
        extraCardsText += _.replace(_.toString(extraCards), ',', ', ');
        return $('#extra-cards').text(extraCardsText);
    };

    var createTableElement = function (list, index) {
        var cardText = _.get(list, '[' + index + ']', '');
        return '<td>' + cardText + '</td>';
    };

    var findCardsOfType = function (type) {
        return _.filter(playerCards, function (card) {
            return _.indexOf(type, card) > 0;
        });
    };

    var init = function (hand, remainingCards) {
        console.log('init on cards called');
        playerCards = hand;
        extraCards = remainingCards;
        populateCardsTable();
        addExtraCardList();
    };

    var cards = {
        init: init
    };

    module.exports = cards;
}());