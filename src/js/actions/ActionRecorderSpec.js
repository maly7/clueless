describe('ActionRecorder', function () {
    var actionRecorder = require('./ActionRecorder');

    describe('constructor', function () {
        it('should not be undefined', function () {
            expect(actionRecorder).toBeTruthy();
        });
    });
});