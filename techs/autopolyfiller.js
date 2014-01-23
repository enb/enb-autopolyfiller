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
 * * *String* **autopolyfillerArguments** — Аргументы автополифилера.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTechs([
 *   [ require('autopolyfiller'), {autopolyfillerArguments: ['IE 11', 'Chrome >= 31']} ]
 * ]);
 * ```
 */
var autopolyfiller = require('autopolyfiller');

module.exports = require('enb/lib/build-flow').create()
    .name('autopolyfiller')
    .target('target', '?.js')
    .defineOption('autopolyfillerArguments', [])
    .useSourceText('source', '?.source.js')
    .builder(function (source) {
        return autopolyfiller.call(null, this._autopolyfillerArguments).add(source) + source;
    })
    .createTech();
