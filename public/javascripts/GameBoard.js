(function () {
    'use strict';
    var boardStyling = require('./BoardStyling');
    var $ = require('jquery');

    var gameBoard = function () {

        var populateCells = function () {
            var tableHtml = '';

            for (var i = 0; i <= 10; i++) {
                tableHtml += '<tr class=\'board-row\'>';
                for (var j = 0; j <= 10; j++) {
                    var cssClass = boardStyling.lookupStyle(i, j);
                    tableHtml += '<td class=\'board-column ' + cssClass + '\'>' + i + ', ' + j + '</td>';
                }
                tableHtml += '</tr>';
            }

            $('#game-board tbody').append(tableHtml);
        };

        return {
            populateCells: populateCells
        };
    };

    module.exports = gameBoard();

}());