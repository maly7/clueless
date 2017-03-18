(function () {
    'use strict';
    var $ = require('jquery');

    var gameBoard = function () {
        var populateCells = function () {
            var tableHtml = '';

            for (var i = 0; i <= 10; i++) {
                tableHtml += '<tr>';
                for (var j = 0; j <= 10; j++) {
                    tableHtml += '<td>' + i + ', ' + j + '</td>';
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