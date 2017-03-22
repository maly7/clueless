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
                    var id = i + '-' + j;
                    tableHtml += '<td id=\'' + id + '\' class=\'board-column ' + cssClass + '\'>' + i + ', ' + j + '</td>';
                }
                tableHtml += '</tr>';
            }

            $('#game-board tbody').append(tableHtml);
        };

        var registerCellButtonClick = function () {
            $('#game-board td.clickable-td').click(function (event) {
                console.log(event.target.id + ' was clicked!');
            });
        };

        var init = function () {
            populateCells();
            registerCellButtonClick();
        };

        return {
            init: init,
            populateCells: populateCells,
            registerCellButtonClick: registerCellButtonClick
        };
    };

    module.exports = gameBoard();

}());