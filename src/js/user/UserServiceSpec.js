describe('UserService', function () {
    var userService = require('./UserService');

    beforeAll(function () {
        userService.addUser('/players#abcdefg');
    });

    describe('getUser', function () {
        it('should return a new user with the specified id', function () {
            var id = 'abcdefg';
            var user = userService.getUser(id);

            expect(user.id).toEqual(id);
        });
    });

    describe('getCount', function () {
        it('should return the current count of users', function () {
            expect(userService.getCount()).toEqual(1);
        });

        it('should increase after a user has been added', function () {
            userService.addUser('/players#hijkl');
            expect(userService.getCount()).toEqual(2);
        });
    });

    describe('registerCharacterSelect', function () {
        it('should remove the selected character from the available character list', function () {
            userService.registerCharacterSelect('abcdefg', 'Col. Mustard');
            var availableCharacters = userService.getAvailableCharacters();

            expect(availableCharacters).not.toContain('Col. Mustard');
            expect(availableCharacters.length).toBeGreaterThan(1);
        });

        it('should associate the selected character with the player', function () {
            userService.registerCharacterSelect('abcdefg', 'Ms. Scarlet');
            var user = userService.getUser('abcdefg');

            expect(user.character).toEqual('Ms. Scarlet');
        });
        it('should mark the player as active', function () {
            userService.registerCharacterSelect('abcdefg', 'Ms. Scarlet');
            var user = userService.getUser('abcdefg');

            expect(user.active).toBe(true);
        });
    });

    describe('getPlayers', function () {
        it('should only return users who are active and have selected characters', function () {
            userService.addUser('qwerty');
            userService.addUser('plssss');
            userService.registerCharacterSelect('plssss', 'Rev. Green');

            var players = userService.getPlayers();
            expect(players.length).toEqual(2);
        });
    });
});