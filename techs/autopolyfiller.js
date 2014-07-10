/**
 * autopolyfiller
 * ==============
 *
 * Собирает `?.js`-файл на основе `?.source.js`-файла, дописывая полифилы.
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.js`.
 * * *String* **source** — Исходный файл. По умолчанию — `?.source.js`.
 * * *String[]* **browsers** — Браузеры, для которых необходимо построить полифилы.
 * * *String[]* **excludes** — Полифилы, которые необходимо исключить из сборки.
 * * *String[]* **includes** — Полифилы, которые необходимо включить в сборку.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTechs([
 *     [require('autopolyfiller'),{browsers: ['IE 11', 'Chrome >= 31']}]
 * ]);
 * ```
 */
var autopolyfiller = require('autopolyfiller');
var File = require('enb-source-map/lib/file');
var generateErrorMessage = require('enb-source-map/lib/error-builder').generateErrorMessage;

module.exports = require('enb/lib/build-flow').create()
    .name('autopolyfiller')
    .target('target', '?.js')
    .useSourceText('source', '?.source.js')
    .defineOption('useSourceMap', true)
    .defineOption('browsers', [])
    .defineOption('excludes', [])
    .defineOption('includes', [])
    .builder(function (source) {
        var sourcePath = this._source;
        var file = new File(this.node.resolvePath(this._target), this._useSourceMap);
        var polyfills;
        try {
            polyfills = autopolyfiller
                .call(null, this._browsers)
                .exclude(this._excludes)
                .include(this._includes)
                .add(source)
                .toString();
        } catch (e) {
            if (e.loc) {
                e.message = generateErrorMessage(
                    this.node.resolvePath(this._source),
                    source,
                    e.message,
                    e.loc.line,
                    e.loc.column + 1
                );
            }
            throw e;
        }
        file.writeContent(polyfills);
        file.writeFileContent(sourcePath, source);
        return file.render();
    })
    .createTech();
