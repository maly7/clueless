describe('UserService', function () {
    var userService = require('./UserService');

    beforeAll(function () {
        userService.addUser('/players#abcdefg')
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

        it('should increase after a user has been added', function() {
            userService.addUser('/players#hijkl');
            expect(userService.getCount()).toEqual(2);
        });
    });
});