require('chai').should();
var vm = require('vm');
var fs = require('fs');

var i18nSource = fs.readFileSync(__dirname + '/../client/y-i18n.js', 'utf8');

describe('y-i18n', function () {
    var i18n;
    beforeEach(function () {
        i18n = vm.runInThisContext(i18nSource);
    });
    describe('i18n', function () {
        it('should return value for string keys', function () {
            i18n.add('testKeyset', {testKey: 'Test Value'});
            i18n('testKeyset', 'testKey').should.equal('Test Value');
        });
        it('should return value for function keys', function () {
            i18n.add('testKeyset', {
                testKey: function () {
                    return 'Test Value';
                }
            });
            i18n('testKeyset', 'testKey').should.equal('Test Value');
        });
        it('should pass params for function keys', function () {
            i18n.add('testKeyset', {
                testKey: function (params) {
                    return 'Test Value' + params.x;
                }
            });
            i18n('testKeyset', 'testKey', {x: '!!'}).should.equal('Test Value!!');
        });
        it('should throw error for non existing keysets', function (done) {
            i18n.add('testKeyset', {testKey: 'Test Value'});
            try {
                i18n('testKeyset1', 'testKey');
            } catch (e) {
                e.message.should.equal('Keyset "testKeyset1" was not found.');
                done();
            }
        });
        it('should throw error for non existing keys', function (done) {
            i18n.add('testKeyset', {testKey: 'Test Value'});
            try {
                i18n('testKeyset', 'testKey1');
            } catch (e) {
                e.message.should.equal('Key "testKey1" in keyset "testKeyset" was not found.');
                done();
            }
        });
    });
    describe('add', function () {
        it('should add a keyset', function () {
            i18n.add('testKeyset', {testKey: 'Test Value'});
            i18n('testKeyset', 'testKey').should.equal('Test Value');
        });
    });
    describe('getLanguage', function () {
        it('should return "ru" by default', function () {
            i18n.getLanguage().should.equal('ru');
        });
    });
    describe('setLanguage', function () {
        it('should set language', function () {
            i18n.setLanguage('en');
            i18n.getLanguage().should.equal('en');
        });
    });
    describe('utils', function () {
        describe('plural', function () {
            it('should return "one" for "1" and "*1"', function () {
                i18n.utils.plural({count: 1, one: 'one', some: 'some', many: 'many'}).should.equal('one');
                i18n.utils.plural({count: 21, one: 'one', some: 'some', many: 'many'}).should.equal('one');
            });
            it('should return "some" for "(2-4)" and "*(2-4)"', function () {
                i18n.utils.plural({count: 2, one: 'one', some: 'some', many: 'many'}).should.equal('some');
                i18n.utils.plural({count: 3, one: 'one', some: 'some', many: 'many'}).should.equal('some');
                i18n.utils.plural({count: 4, one: 'one', some: 'some', many: 'many'}).should.equal('some');
                i18n.utils.plural({count: 22, one: 'one', some: 'some', many: 'many'}).should.equal('some');
                i18n.utils.plural({count: 23, one: 'one', some: 'some', many: 'many'}).should.equal('some');
                i18n.utils.plural({count: 24, one: 'one', some: 'some', many: 'many'}).should.equal('some');
            });
            it('should return "many" for "(5-9)" and "*1(2-4)"', function () {
                i18n.utils.plural({count: 5, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 6, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 7, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 8, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 9, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 11, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 12, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 13, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 14, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 25, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 26, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 27, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 28, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 29, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 111, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 112, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 113, one: 'one', some: 'some', many: 'many'}).should.equal('many');
                i18n.utils.plural({count: 114, one: 'one', some: 'some', many: 'many'}).should.equal('many');
            });
        });
        describe('include', function () {
            it('should return value for string keys', function () {
                i18n.add('testKeyset', {testKey: 'Test Value'});
                i18n.utils.include({keyset: 'testKeyset', key: 'testKey'}).should.equal('Test Value');
            });
            it('should return value for function keys', function () {
                i18n.add('testKeyset', {
                    testKey: function () {
                        return 'Test Value';
                    }
                });
                i18n.utils.include({keyset: 'testKeyset', key: 'testKey'}).should.equal('Test Value');
            });
            it('should pass params for function keys', function () {
            i18n.add('testKeyset', {
                testKey: function (params) {
                    return 'Test Value' + params.x;
                }
            });
                i18n.utils.include({keyset: 'testKeyset', key: 'testKey', x: '!!'}).should.equal('Test Value!!');
            });
        });
    });
});
