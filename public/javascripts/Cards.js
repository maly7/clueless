(function () {
    'use strict';
    var _ = require('lodash');

    var suspects = ['Ms. Scarlet', 'Col. Mustard', 'Mrs. White', 'Rev. Green', 'Mrs. Peacock', 'Prof. Plum'];
    var weapons = ['Candlestick', 'Poison', 'Rope', 'Gloves', 'Horseshoe', 'Knife', 'Lead Pipe', 'Revolver', 'Wrench'];
    var rooms = ['Kitchen', 'Ballroom', 'Conservatory', 'Billiard Room', 'Library', 'Study', 'Hall', 'Lounge', 'Dining Room', 'Cellar'];

    var gameSocket = {};
    var playerCards = [];
    var extraCards = [];

    var playerSuspects = []
    var playerWeapons = [];
    var playerRooms = [];

    var populateCardsTable = function () {
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

    var addExtraCardList = function () {
        if (extraCards.length <= 0) {
            return;
        }

        var extraCardsText = '<strong>Extra Cards</strong>: ';
        extraCardsText += _.replace(_.toString(extraCards), ',', ', ');
        return $('#extra-cards').append(extraCardsText);
    };

    var createTableElement = function (list, index) {
        var cardText = _.get(list, '[' + index + ']', '');
        return '<td>' + cardText + '</td>';
    };

    var findCardsOfType = function (type) {
        return _.filter(playerCards, function (card) {
            return _.indexOf(type, card) >= 0;
        });
    };

    var getSortedPlayerCards = function () {
        return {
            'suspects': playerSuspects,
            'weapons': playerWeapons,
            'rooms': playerRooms
        }
    };

    var init = function (hand, remainingCards) {
        playerCards = hand;
        extraCards = remainingCards;

        playerSuspects = findCardsOfType(suspects);
        playerWeapons = findCardsOfType(weapons);
        playerRooms = findCardsOfType(rooms);

        populateCardsTable();
        addExtraCardList();
    };

    var cards = {
        init: init,
        getSortedPlayerCards: getSortedPlayerCards
    };

    module.exports = cards;
}());