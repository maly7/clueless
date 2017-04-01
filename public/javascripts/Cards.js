(function () {
    'use strict';

    var gameSocket = {};
    var playerCards = [];
    var extraCards = [];

    var init = function (hand, remainingCards) {
        console.log('init on cards called');
        playerCards = hand;
        extraCards = remainingCards;
    };

    var cards = {
        init: init
    };

    module.exports = cards;
}());