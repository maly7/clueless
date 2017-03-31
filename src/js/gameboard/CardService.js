(function () {
    'use strict';
    var _ = require('lodash');


    var suspects = ['Ms. Scarlet', 'Col. Mustard', 'Mrs. White', 'Rev. Green', 'Mrs. Peacock', 'Prof. Plum'];

    var weapons = ['Candlestick', 'Poison', 'Rope', 'Gloves', 'Horseshoe', 'Knife', 'Lead Pipe', 'Revolver', 'Wrench'];

    var rooms = ['Kitchen', 'Ballroom', 'Conservatory', 'Billiard Room', 'Library', 'Study', 'Hall', 'Lounge', 'Dining Room', 'Cellar'];

    var allCards = [];

    var shuffleDecks = function () {
        suspects = _.shuffle(suspects);
        weapons = _.shuffle(weapons);
        rooms = _.shuffle(rooms);
    };

    var selectMurderCase = function () {
        shuffleDecks();
        return {
            'suspect': suspects.pop(),
            'weapon': weapons.pop(),
            'room': rooms.pop()
        };
    };

    var cardService = {
        selectMurderCase: selectMurderCase
    };

    module.exports = cardService;
}());