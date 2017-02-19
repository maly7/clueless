describe('UserService', function () {
    var userService = require('./UserService');

    describe('getUser', function () {
        it('should return a new user with the specified id', function () {
            var user = userService.getUser(4);

            expect(user.id).toEqual(4);
        });
    });
});