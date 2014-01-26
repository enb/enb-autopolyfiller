/**
 * @typedef {Object} YI18NLayerOptions
 * @property {String} [pluralFunctionName=i18n.utils.plural]
 * @property {String} [includeFunctionName=i18n.utils.include]
 */

module.exports = {
    /**
     * @param {YI18NLayerOptions} [options]
     */
    create: function (options) {
        options = options || {};
        var pluralFunctionName = options.pluralFunctionName || 'i18n.utils.plural';
        var includeFunctionName = options.includeFunctionName || 'i18n.utils.include';
        return function (astBuilder, compiler) {
            astBuilder.registerBlockSection('if', 'else');
            compiler.registerBlockHelper('if', function (ast, compiler) {
                var elseSection = ast.sections[0] && ast.sections[0].name === 'else' ? ast.sections[0] : null;
                return '(' + compiler.generateExpression(ast.arguments.list[0]) +
                    '?' + compiler.compileThread(ast.mainSection) +
                    ':' + (elseSection ? compiler.compileThread(elseSection) : '""') +
                    ')';
            });
            compiler.registerHelper('plural', function (ast) {
                return pluralFunctionName + '(' + createParamsHash(ast.arguments.hash) + ')';
            });
            compiler.registerHelper('include', function (ast) {
                return includeFunctionName + '(' + createParamsHash(ast.arguments.hash) + ')';
            });
            compiler.setStringResultHandler(JSON.stringify.bind(JSON));
            function createParamsHash(hash) {
                var values = [];
                Object.keys(hash).forEach(function (key) {
                    values.push(
                        JSON.stringify(key) + ':' + compiler.generateExpression(hash[key])
                    );
                });
                return '{' + values.join(',') + '}';
            }
        };
    }
};
