(function () {

function createI18nInstance() {
    /**
     * @param {String} keysetName
     * @param {String} keyName
     * @param {Object} [options]
     */
    var i18n = function (keysetName, keyName, options) {
        var keyset = i18n._keysets[keysetName];
        if (!keyset) {
            throw new Error('Keyset "' + keysetName + '" was not found.');
        }
        var value = keyset[keyName];
        if (value === undefined) {
            throw new Error('Key "' + keyName + '" in keyset "' + keysetName + '" was not found.');
        }
        if (typeof value === 'function') {
            return value(options || {});
        } else {
            return value;
        }
    };

    /**
     * @type {Object}
     */
    i18n._keysets = {};

    /**
     * @type {String}
     */
    i18n._language = 'ru';

    /**
     * @param {String} keysetName
     * @param {Object} keysetData
     */
    i18n.add = function (keysetName, keysetData) {
        i18n._keysets[keysetName] = keysetData;
        return i18n;
    };

    /**
     * @param {String} language
     */
    i18n.setLanguage = function (language) {
        this._language = language;
        return this;
    };

    /**
     * @returns {String}
     */
    i18n.getLanguage = function () {
        return this._language;
    };

    i18n.utils = {
        /**
         * @typedef {Object} YI18NPluralParams
         * @property {Number} count
         * @property {String} one
         * @property {String} some
         * @property {String} many
         */

        /**
         * @param {YI18NPluralParams} params
         * @returns {String}
         */
        plural: function (params) {
            var count = params.count;
            var one = params.one;
            var some = params.some;
            var many = params.many;
            if (many === undefined) {
                many = some;
            } else if (some === undefined) {
                some = many;
            }
            var lastDigit = count % 10;
            var tens = count % 100;

            if (lastDigit === 1 && tens !== 11) {
                return one;
            }

            return lastDigit > 1 && lastDigit < 5 && (tens < 10 || tens > 20) ? some : many;
        },

        /**
         * @typedef {Object} YI18NIncludeParams
         * @property {String} keyset
         * @property {String} key
         */

        /**
         * @param {YI18NIncludeParams} params
         * @returns {String}
         */
        include: function (params) {
            var subParams = {};
            for (var i in params) {
                if (params.hasOwnProperty(i) && i !== 'key' && i !== 'keyset') {
                    subParams[i] = params[i];
                }
            }
            return i18n(params.keyset, params.key, subParams);
        }
    };

    return i18n;
}

return createI18nInstance();

})();
