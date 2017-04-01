describe('CardService', function () {
    var cardService = require('./CardService');

    beforeEach(function () {
        cardService.resetCards();
    });

    describe('selectMurderCase', function () {
        it('should return an object containing a suspect, weapon, and room', function () {
            var murderCase = cardService.selectMurderCase();

            expect(murderCase.room).toBeTruthy();
            expect(murderCase.suspect).toBeTruthy();
            expect(murderCase.weapon).toBeTruthy();
        });
    });

    describe('dealCards to 4 players', function () {
        var suspects = cardService.selectMurderCase();
        var cards = cardService.dealCards(4);

        it('should divide the cards evenly between the players', function () {
            expect(cards[1].length).toEqual(5);
            expect(cards[2].length).toEqual(5);
            expect(cards[3].length).toEqual(5);
            expect(cards[4].length).toEqual(5);
        });

        it('should place any remaining cards in the remaining list', function () {
            expect(cards.remaining.length).toEqual(2);
        });
    });

    describe('dealCards to 3 players', function () {
        cardService.resetCards();
        var suspects = cardService.selectMurderCase();
        var cards = cardService.dealCards(3);

        it('should divide the cards evenly between the players', function () {
            expect(cards[1].length).toEqual(7);
            expect(cards[2].length).toEqual(7);
            expect(cards[3].length).toEqual(7);
        });

        it('should place any remaining cards in the remaining list', function () {
            expect(cards.remaining.length).toEqual(1);
        });
    });

    describe('dealCards to 6 players', function () {
        cardService.resetCards();
        var suspects = cardService.selectMurderCase();
        var cards = cardService.dealCards(6);

        it('should divide the cards evenly between the players', function () {
            expect(cards[1].length).toEqual(3);
            expect(cards[2].length).toEqual(3);
            expect(cards[3].length).toEqual(3);
            expect(cards[4].length).toEqual(3);
            expect(cards[5].length).toEqual(3);
            expect(cards[6].length).toEqual(3);
        });

        it('should place any remaining cards in the remaining list', function () {
            expect(cards.remaining.length).toEqual(4);
        });
    });
});