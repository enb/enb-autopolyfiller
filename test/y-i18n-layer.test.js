require('chai').should();
var CompactTL = require('compact-tl').CompactTL;
var yI18nLayer = require('../lib/y-i18n-layer');

describe('y-i18n-layer', function () {
    var compactTl;
    beforeEach(function () {
        compactTl = new CompactTL();
        compactTl.use(yI18nLayer.create({
            pluralFunctionName: 'plural',
            includeFunctionName: 'include'
        }));
    });
    describe('if', function () {
        it('should process if block', function () {
            compactTl.process('{{#if count}}{{count}}{{/if}}')
                .should.equal('function(params){return (params.count?params.count:"");}');
        });
        it('should process if with else block', function () {
            compactTl.process('{{#if count}}{{count}}{{else}}Empty{{/if}}')
                .should.equal('function(params){return (params.count?params.count:"Empty");}');
        });
        it('should process if without body and else block', function () {
            compactTl.process('{{#if count}}{{/if}}')
                .should.equal('function(params){return (params.count?"":"");}');
        });
        it('should process if without body and else block', function () {
            compactTl.process('{{#if count}}{{else}}Empty{{/if}}')
                .should.equal('function(params){return (params.count?"":"Empty");}');
        });
        it('should process if without body and else without body', function () {
            compactTl.process('{{#if count}}{{else}}{{/if}}')
                .should.equal('function(params){return (params.count?"":"");}');
        });
    });
    describe('plural', function () {
        it('should process plural', function () {
            compactTl.process('{{plural count=count one="предмет" some="предмета" many="предметов"}}')
                .should.equal(
                    'function(params){' +
                        'return plural({' +
                            '"count":params.count,' +
                            '"one":"предмет",' +
                            '"some":"предмета",' +
                            '"many":"предметов"' +
                        '});' +
                    '}'
                );
        });
    });
    describe('include', function () {
        it('should process include', function () {
            compactTl.process('{{include keyset="keyset1" key="key1"}}')
                .should.equal(
                    'function(params){' +
                        'return include({' +
                            '"keyset":"keyset1",' +
                            '"key":"key1"' +
                        '});' +
                    '}'
                );
        });
    });
});
