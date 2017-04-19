(function () {
    'use strict';
    var _ = require('lodash');

    var disproveModal = '#disprove-suggestion-modal';
    var cardSelect = '#card-select';
    var confirmDisproveButton = '#confirm-disprove';
    var cannotDisproveButton = '#cannot-disprove';
    var disproveHint = '#disprove-hint';

    var gameSocket = {};
    var playersHand = {};
    var suggestion = {};

    var registerButtons = function () {
        $(cannotDisproveButton).click(function () {
            gameSocket.emit('unable-to-disprove', {});
            $(disproveModal).modal('hide');
            $('.modal-backdrop').remove();
        });
        $(confirmDisproveButton).click(function () {
            var disprovalCard = $(cardSelect).val();
            gameSocket.emit('suggestion-disproved', {
                'reason': disprovalCard
            });
            $(disproveModal).modal('hide');
            $('.modal-backdrop').remove();
        });
    };

    var addSuggestedCard = function (cardArr, card) {
        if (playersHand.indexOf(card) !== -1) {
            cardArr.push(card);
        }
    };

    var displayModal = function () {
        var possibleCards = [];

        addSuggestedCard(possibleCards, suggestion.weapon);
        addSuggestedCard(possibleCards, suggestion.room);
        addSuggestedCard(possibleCards, suggestion.suspect);

        if (_.get(possibleCards, 'length', 0) <= 0) {
            $(confirmDisproveButton).prop('disabled', true);
            $(cannotDisproveButton).prop('disabled', false);
            $(disproveHint).text('Looks like you don\'t have any of the cards');
            $(cardSelect).children().remove();
            $(cardSelect).prop('disabled', true);
        } else {
            $(confirmDisproveButton).prop('disabled', false);
            $(cannotDisproveButton).prop('disabled', true);
            $(disproveHint).text('Please select a card to use in disproving the suggestion');
            $(cardSelect).children().remove();
            _.forEach(possibleCards, function(card) {
                $(cardSelect).append('<option>' + card + '</option>');
            });
        }

        $(disproveModal).modal('show');
    };

    var init = function (socket, cards, suggestedMurder) {
        gameSocket = socket;
        playersHand = cards.suspects.concat(cards.weapons).concat(cards.rooms);
        suggestion = suggestedMurder;

        registerButtons();
        displayModal();
    };

    var disprove = {
        init: init
    };

    module.exports = disprove;

}());