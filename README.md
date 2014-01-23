enb-autopolyfiller [![Build Status](https://travis-ci.org/enb-make/enb-autopolyfiller.png?branch=master)](https://travis-ci.org/enb-make/enb-autopolyfiller)
==========

Предоставляет технологию `autopolyfiller`.

autopolyfiller
--------------

Собирает `?.js`-файл на основе `?.source.js`-файла, дописывая полифилы.

**Опции**

* *String* **target** — Результирующий таргет. По умолчанию — `?.js`.
* *String* **source** — Исходный файл. По умолчанию — `?.source.js`.
* *String* **autopolyfillerArguments** — Аргументы автополифилера.

**Пример**

```javascript
nodeConfig.addTechs([
  [ require('autopolyfiller'), {autopolyfillerArguments: ['IE 11', 'Chrome >= 31']} ]
]);
```
