var mockRequire = require('mock-require');

module.exports = {
    name: 'unexpected-require',
    version: require('../package.json').version,
    installInto: function unexpectedRequire(expect) {
        expect.addAssertion('<any> with require mocked out <object> <assertion?>', function (expect, subject, mockRequireDefinition) {
            Object.keys(mockRequireDefinition).forEach(function (filename) {
                mockRequire(filename, mockRequireDefinition[filename]);
            });
            return expect.shift().finally(function () {
                mockRequire.stopAll();
            });
        });
    }
};
