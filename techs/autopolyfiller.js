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

module.exports = require('enb/lib/build-flow').create()
    .name('autopolyfiller')
    .target('target', '?.js')
    .useSourceText('source', '?.source.js')
    .defineOption('browsers', [])
    .defineOption('excludes', [])
    .defineOption('includes', [])
    .builder(function (source) {
        return autopolyfiller
            .call(null, this._browsers)
            .exclude(this._excludes)
            .include(this._includes)
            .add(source) + source;
    })
    .createTech();
