(function () {
    'use strict';

    var playerClasses = ['mustard', 'scarlet', 'white', 'green', 'peacock', 'plum'];

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
        return $('#' + y + '-' + x).attr('class').indexOf('empty') < 0;
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

    var cellUtils = {
        makeCellsClickable: makeCellsClickable,
        findFirstCellWithoutCharacter: findFirstCellWithoutCharacter,
        disableCellClicks: disableCellClicks
    };

    module.exports = cellUtils;
}());