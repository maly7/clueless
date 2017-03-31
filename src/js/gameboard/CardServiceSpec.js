describe('CardService', function () {
    var cardService = require('./CardService');

    describe('selectMurderCase', function () {
        it('should return an object containing a suspect, weapon, and room', function () {
            var murderCase = cardService.selectMurderCase();

            expect(murderCase.room).toBeTruthy();
            expect(murderCase.suspect).toBeTruthy();
            expect(murderCase.weapon).toBeTruthy();
        });
    });
});