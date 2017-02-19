describe('UserService', function () {
    var userService = require('./UserService');

    describe('getUser', function () {
        it('should return a new user with the specified id', function () {
            var id = 4;
            var user = userService.getUser(id);

            expect(user.id).toEqual(id);
        });
    });
});