describe('MessageService', function () {
    var messageService = require('./MessageService');

    describe('getMessages', function () {
        it('should return a list of the current messages', function () {
            var messages = messageService.getMessages();

            expect(messages.length).toEqual(2);
            expect(messages[0].text).toContain('Sample Message 1');
        });
    });
});