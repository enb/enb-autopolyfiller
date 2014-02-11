enb-y-i18n [![Build Status](https://travis-ci.org/enb-make/enb-y-i18n.png?branch=master)](https://travis-ci.org/enb-make/enb-y-i18n)
==========

Предоставляет технологию `y-i18n-lang-js`.


y-i18n-lang-js
--------------

Собирает `?.lang.<язык>.js`-файлы на основе `?.keysets.<язык>.js`-файлов.

Используется для локализации в JS с помощью `compact-tl` + `y-i18n-layer`.

**Опции**

 * *String* **target** — Результирующий таргет. По умолчанию — `?.lang.{lang}.js`.
 * *String* **lang** — Язык, для которого небходимо собрать файл.

**Пример**

```javascript
nodeConfig.addTechs([
  [ require('enb-y-i18n/techs/y-i18n-lang-js'), { lang: 'all'} ],
  [ require('enb-y-i18n/techs/y-i18n-lang-js'), { lang: '{lang}'} ],
]);
```
