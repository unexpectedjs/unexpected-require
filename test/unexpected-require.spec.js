var sinon = require('sinon');
var expect = require('unexpected').clone()
    .use(require('unexpected-sinon'))
    .use(require('../lib/unexpected-require'));

describe('unexpected-require', function () {
    describe('with require mocked out', function () {
        it('mocks out a module with an object', function () {
            return expect(
                function () {
                    require('some-non-existent-module');
                }, 'to throw', /Cannot find module 'some-non-existent-module'/
            ).and('with require mocked out', {
                'some-non-existent-module': {}
            }, 'not to throw');
        });

        it('mocks out a module with a function', function () {
            var spy = sinon.spy();
            return expect(
                function () {
                    var mod = require('some-non-existent-module');
                    mod(123);
                }, 'to throw', /Cannot find module 'some-non-existent-module'/
            ).and(
                'with require mocked out', {
                    'some-non-existent-module': spy
                }, 'not to throw'
            ).then(function () {
                return expect(spy, 'to have calls satisfying', function () {
                    spy(123);
                });
            });
        });

        it('mocks out a module with another module', function () {
            var sep;
            return expect(
                function () {
                    sep = require('a-custom-path').sep;
                }, 'to throw', /Cannot find module 'a-custom-path'/
            ).and(
                'with require mocked out', {
                    'a-custom-path': 'path'
                }, 'not to throw'
            ).then(function () {
                return expect(sep, 'to be', '/');
            });
        });

        it('does not interfere with other modules that are not mocked out', function () {
            var sep;
            return expect(
                function () {
                    require('some-other-thing');
                    sep = require('path').sep;
                }, 'with require mocked out', {
                    'some-other-thing': {}
                }, 'not to throw'
            ).then(function () {
                return expect(sep, 'to be', '/');
            });
        });

        it('restores the mocked out modules after every assertion', function () {
            return expect(
                function () {
                    require('some-non-existent-module');
                }, 'to throw', /Cannot find module 'some-non-existent-module'/
            ).and(
                'with require mocked out', {
                    'some-non-existent-module': {}
                }, 'not to throw'
            ).finally(function () {
                return expect(function () {
                    require('some-non-existent-module');
                }, 'to throw', /Cannot find module 'some-non-existent-module'/);
            });
        });

        it('bubbles up errors from the next assertion', function () {
            return expect(
                function () {
                    return expect(
                        function () {
                            require('some-non-existent-module');
                            throw new Error('dummy error');
                        },
                        'with require mocked out', {
                            'some-non-existent-module': {}
                        },
                        'not to error'
                    );
                },
                'to error with',
                'expected\n' +
                'function () {\n' +
                '  require(\'some-non-existent-module\');\n' +
                '  throw new Error(\'dummy error\');\n' +
                '}\n' +
                'not to error\n' +
                '  threw: Error(\'dummy error\')'
            );
        });
    });
});
