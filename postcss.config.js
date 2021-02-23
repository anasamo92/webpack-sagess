'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var file = _ref.file,
        options = _ref.options,
        env = _ref.env;

    var browsers = process.env.BROWSERS || '>1%|last 4 versions|Firefox ESR|not ie < 9';

    var variables = {};
    if (process.env.CSS_VARIABLE_FILE) {
        variables = require(_path2.default.resolve('./' + process.env.CSS_VARIABLE_FILE));
    }
    return {
        plugins: {
            'postcss-flexbugs-fixes': true,
            'postcss-import': { root: file.dirname },
            'postcss-cssnext': {
                browsers: browsers.split('|'),
                features: {
                    customProperties: {
                        variables: variables
                    }
                }
            },
            cssnano: env === 'production' ? { preset: 'default' } : false
        }
    };
};

module.exports = exports['default'];