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

    describe('dealCards', function () {
        cardService.selectMurderCase();
        var cards = cardService.dealCards(4);

        it('should divide the cards evenly between the players', function () {
            expect(cards[1].length).toEqual(5);
            expect(cards[2].length).toEqual(5);
            expect(cards[3].length).toEqual(5);
            expect(cards[4].length).toEqual(5);
        });
    });
});