describe('GameBoardService', function () {
    var gameBoardService = require('./GameBoardService');

    describe('constructor', function () {
        it('should not be undefined', function () {
            expect(gameBoardService).toBeTruthy();
        });
    });
});