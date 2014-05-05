enb-autopolyfiller [![Build Status](https://travis-ci.org/enb-make/enb-autopolyfiller.png?branch=master)](https://travis-ci.org/enb-make/enb-autopolyfiller)
==========

Предоставляет технологию `autopolyfiller`.

autopolyfiller
--------------

Собирает `?.js`-файл на основе `?.source.js`-файла, дописывая полифилы.

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.js`.
* *String* **source** — Исходный файл. По умолчанию — `?.source.js`.
* *String[]* **browsers** — Браузеры, для которых необходимо построить полифилы.
* *String[]* **excludes** — Полифилы, которые необходимо исключить из сборки.
* *String[]* **includes** — Полифилы, которые необходимо включить в сборку.

**Пример**

```javascript
nodeConfig.addTechs([
    [require('autopolyfiller'), {browsers: ['IE 11', 'Chrome >= 31']}]
]);
```
