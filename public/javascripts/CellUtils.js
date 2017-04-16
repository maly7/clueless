(function () {
    'use strict';

    var playerClasses = ['mustard', 'scarlet', 'white', 'green', 'peacock', 'plum'];

    var playerPositionMap = {
        '3-9': ['0-8', '0-9', '0-10', '1-10', '2-10', '1-9'],
        '2-9': ['0-8', '0-9', '0-10', '1-10', '2-10', '1-9'],
        '1-7': ['0-8', '0-9', '0-10', '1-10', '2-10', '1-9'],
        '5-7': ['4-8', '4-10', '5-10', '6-10', '6-8', '5-9'],
        '5-8': ['4-8', '4-10', '5-10', '6-10', '6-8', '5-9'],
        '6-9': ['4-8', '4-10', '5-10', '6-10', '6-8', '5-9'],
        '4-9': ['4-8', '4-10', '5-10', '6-10', '6-8', '5-9'],
        '7-9': ['8-10', '9-10', '10-10', '10-9', '10-8', '9-9'],
        '8-9': ['8-10', '9-10', '10-10', '10-9', '10-8', '9-9'],
        '9-7': ['8-10', '9-10', '10-10', '10-9', '10-8', '9-9'],
        '9-8': ['8-10', '9-10', '10-10', '10-9', '10-8', '9-9'],
        '7-5': ['8-4', '8-6', '10-6', '10-5', '10-4', '9-5'],
        '8-5': ['8-4', '8-6', '10-6', '10-5', '10-4', '9-5'],
        '9-3': ['8-4', '8-6', '10-6', '10-5', '10-4', '9-5'],
        '7-1': ['8-0', '9-0', '10-0', '10-1', '10-2', '9-1'],
        '8-1': ['8-0', '9-0', '10-0', '10-1', '10-2', '9-1'],
        '9-2': ['8-0', '9-0', '10-0', '10-1', '10-2', '9-1'],
        '3-1': ['4-0', '5-0', '6-0', '6-2', '4-2', '5-1'],
        '4-1': ['4-0', '5-0', '6-0', '6-2', '4-2', '5-1'],
        '5-2': ['4-0', '5-0', '6-0', '6-2', '4-2', '5-1'],
        '5-3': ['4-4', '4-6', '6-6', '6-4', '5-5'],
        '5-4': ['4-4', '4-6', '6-6', '6-4', '5-5'],
        '5-6': ['4-4', '4-6', '6-6', '6-4', '5-5'],
        '6-5': ['4-4', '4-6', '6-6', '6-4', '5-5'],
        '4-5': ['4-4', '4-6', '6-6', '6-4', '5-5'],
        '1-3': ['0-0', '1-0', '2-0', '0-2', '1-1'],
        '1-2': ['0-0', '1-0', '2-0', '0-2', '1-1'],
        '2-1': ['0-0', '1-0', '2-0', '0-2', '1-1'],
        '3-5': ['2-4', '0-4', '0-5', '0-6', '2-6', '1-5'],
        '2-5': ['2-4', '0-4', '0-5', '0-6', '2-6', '1-5'],
        '1-6': ['2-4', '0-4', '0-5', '0-6', '2-6', '1-5']
    };

    var makeCellsClickable = function (position) {
        var posArray = position.split('-');
        var yCoord = parseInt(posArray[0]);
        var xCoord = parseInt(posArray[1]);
        makeCellClickable(yCoord, xCoord - 1);
        makeCellClickable(yCoord, xCoord + 1);
        makeCellClickable(yCoord - 1, xCoord);
        makeCellClickable(yCoord + 1, xCoord);

        $('.td-clickable').hover(function () {
            $(this).toggleClass('hover-td');
        });
    };

    var findFirstCellWithoutCharacter = function (cellList, currentPos) {
        for (var i = 0; i < cellList.length; i++) {
            var posArray = cellList[i].split('-');
            var y = parseInt(posArray[0]);
            var x = parseInt(posArray[1]);
            if (cellDoesNotContainCharacter(y, x)) {
                return cellList[i];
            }
        }
        return currentPos;
    };

    var makeCellClickable = function (y, x) {
        if (cellShouldBeMadeClickable(y, x) === true) {
            $('#' + y + '-' + x).addClass('td-clickable');
        }
    };

    var cellShouldBeMadeClickable = function (y, x) {
        return cellDoesNotContainEmpty(y, x) && cellDoesNotContainCharacter(y, x);
    };

    var cellDoesNotContainEmpty = function (y, x) {
        try {
            return $('#' + y + '-' + x).attr('class').indexOf('empty') < 0;
        } catch (err) {
            return false;
        }
    };

    var cellDoesNotContainCharacter = function (y, x) {
        for (var i = 0; i < playerClasses.length; i++) {
            var cssClass = playerClasses[i];
            if ($('#' + y + '-' + x).attr('class').indexOf(cssClass) >= 0) {
                return false;
            }
        }
        return true;
    };

    var disableCellClicks = function () {
        $('.td-clickable').off();
        return $('.td-clickable').removeClass('td-clickable');
    };

    var findNearestCellForPlayerOutOfGame = function (position) {
        var possibleLocations = playerPositionMap[position];

        if (possibleLocations === undefined) {
            return position;
        }

        return findFirstCellWithoutCharacter(possibleLocations, position);
    };

    var cellUtils = {
        makeCellsClickable: makeCellsClickable,
        findFirstCellWithoutCharacter: findFirstCellWithoutCharacter,
        disableCellClicks: disableCellClicks,
        findNearestCellForPlayerOutOfGame: findNearestCellForPlayerOutOfGame
    };

    module.exports = cellUtils;
}());