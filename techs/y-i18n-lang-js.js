/**
 * y-i18n-lang-js
 * ==============
 *
 * Собирает `?.lang.<язык>.js`-файлы на основе `?.keysets.<язык>.js`-файлов.
 *
 * Используется для локализации в JS с помощью compact-tl + y-i18n-layer.
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.lang.{lang}.js`.
 * * *String* **lang** — Язык, для которого небходимо собрать файл.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTechs([
 *   [ require('enb-y-i18n/techs/y-i18n-lang-js'), { lang: 'all'} ],
 *   [ require('enb-y-i18n/techs/y-i18n-lang-js'), { lang: '{lang}'} ],
 * ]);
 * ```
 */
var vowFs = require('vow-fs');
var CompactTL = require('compact-tl').CompactTL;
var yI18NLayer = require('../lib/y-i18n-layer');

module.exports = require('enb/lib/build-flow').create()
    .name('y-i18n-lang-js')
    .target('target', '?.lang.{lang}.js')
    .defineOption('i18nFile', '')
    .defineRequiredOption('lang')
    .useSourceFilename('keysetsTarget', '?.keysets.{lang}.js')
    .needRebuild(function(cache) {
        this._i18nFile = this._i18nFile || __dirname + '/../client/y-i18n.js';
        return cache.needRebuildFile('i18n-file', this._i18nFile);
    })
    .saveCache(function(cache) {
        cache.cacheFileInfo('i18n-file', this._i18nFile);
    })
    .builder(function(keysetsFilename) {
        var compactTl = new CompactTL();
        compactTl.use(yI18NLayer.create());
        this._i18nClassData = '';
        return vowFs.read(this._i18nFile, 'utf8').then(function (i18nClassData) {
            this._i18nClassData = i18nClassData;
            delete require.cache[keysetsFilename];
            var keysets = require(keysetsFilename);
            var lang = this._lang;
            var result = [];
            Object.keys(keysets).sort().forEach(function(keysetName) {
                var keyset = keysets[keysetName];
                var keysetResult = [];
                keysetResult.push('i18n.add(\'' + keysetName + '\', {');
                Object.keys(keyset).map(function(key, i, arr) {
                    keysetResult.push(
                        '    ' + JSON.stringify(key) +
                        ': ' +
                        compactTl.process(keyset[key]) +
                        (i === arr.length - 1 ? '' : ',')
                    );
                });
                keysetResult.push('});');
                result.push(keysetResult.join('\n'));
            });
            return this.getPrependJs(lang) + '\n' + result.join('\n\n') + '\n' + this.getAppendJs(lang);
        }.bind(this));
    })
    .methods({
        getPrependJs: function(lang) {
            if (lang !== 'all') {
                return '(function(){\nfunction initKeyset(i18n) {\n' +
                    'if (!i18n || typeof i18n !== "function") {\n' +
                    'i18n = ' + this._i18nClassData + '\n' +
                    '}\n\n';
            } else {
                return '';
            }
        },
        getAppendJs: function(lang) {
            if (lang !== 'all') {
                var res = [];
                res.push('i18n.setLanguage(\'' + lang + '\');');
                res.push('return i18n;');
                res.push('}');
                res.push('if (typeof modules !== \'undefined\') {');
                res.push('    modules.define(\'y-i18n\', function (provide, i18n) {');
                res.push('        provide(initKeyset(i18n));');
                res.push('    });');
                res.push('} else if (typeof module !== \'undefined\') {');
                res.push('    module.exports = function() {return initKeyset();};');
                res.push('} else {');
                res.push('    window.i18n = initKeyset();');
                res.push('}');
                res.push('})();');
                return res.join('\n');
            } else {
                return '';
            }
        }
    })
    .createTech();
