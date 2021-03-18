'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _forkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

var _forkTsCheckerWebpackPlugin2 = _interopRequireDefault(_forkTsCheckerWebpackPlugin);

var _getLocalIdent2 = require('css-loader/lib/getLocalIdent');

var _getLocalIdent3 = _interopRequireDefault(_getLocalIdent2);

var _cssLoaderBuilder = require('../webpack-utilities/css-loader-builder');

var _cssLoaderBuilder2 = _interopRequireDefault(_cssLoaderBuilder);

var _envParser = require('../webpack-utilities/env-parser');

var _envParser2 = _interopRequireDefault(_envParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tsConfig = function tsConfig(environnement, definedVariables) {
    var config = (0, _base2.default)(environnement, definedVariables);
    var parsedEnv = (0, _envParser2.default)(environnement);

    var babelLoader = config.removeLoader(20);
    babelLoader.test = /\.(ts|tsx)$/;
    babelLoader.exclude = /node_modules/;
    var tsLoader = function tsLoader(env) {
        babelLoader.use.push({
            loader: 'ts-loader',
            options: {
                transpileOnly: true, // Leave type checking to plugin
                sourceMap: env.SOURCE_MAPS
            }
        });
        return babelLoader;
    };
    config.addComplexLoader(20, tsLoader);

    // Removing css and postcss loader
    config.removeLoader(30);
    // Adding separate loader and conf
    var cssOptions = {
        modules: true,
        localIdentName: '[path][name]-[local]',
        getLocalIdent: function getLocalIdent(loaderContext, localIdentName, localName, options) {
            var name = (0, _getLocalIdent3.default)(loaderContext, localIdentName, localName, options);
            if (name.includes('focus4')) {
                return 'focus-' + name.split('-').slice(-3).filter(function (s) {
                    return s !== '__style__';
                }).join('-');
            } else if (name.includes('toolbox')) {
                return 'rt-' + name.split('-').slice(-3).join('-');
            } else {
                return name;
            }
        }
    };

    config.addComplexLoader(30, (0, _cssLoaderBuilder2.default)(parsedEnv, cssOptions, false, true));
    config.addComplexLoader(40, (0, _cssLoaderBuilder2.default)(parsedEnv, {}, true, false));

    config.addPlugin(90, function (env) {
        return new _forkTsCheckerWebpackPlugin2.default({
            tslint: true,
            async: env.HOT_RELOAD
        });
    });

    return config;
};

exports.default = tsConfig;
module.exports = exports['default'];