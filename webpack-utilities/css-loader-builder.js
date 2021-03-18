'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = cssLoaderBuilder;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cssLoaderBuilder(parsedEnv) {
    var cssOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var handleScss = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var handleCss = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;


    var cssLoaders = [{
        loader: 'css-loader',
        options: Object.assign({
            minimize: false,
            // sourceMap: env.SOURCE_MAPS,
            importLoaders: handleScss ? 2 : 1
        }, cssOptions)
    }, {
        loader: 'postcss-loader',
        options: {
            // Other options should go into postcss.config.js
            config: {
                path: _path2.default.join(process.cwd(), 'postcss.config.js')
                // sourceMap: env.SOURCE_MAPS
            } }
    }];

    if (handleScss) {
        cssLoaders.push({
            loader: 'sass-loader',
            options: {
                includePaths: _glob2.default.sync('node_modules').map(function (d) {
                    return _path2.default.join(process.cwd(), d);
                })
                // sourceMap: env.SOURCE_MAPS
            }
        });
    }

    if (!parsedEnv.HOT_RELOAD) {
        cssLoaders = _extractTextWebpackPlugin2.default.extract({
            fallback: 'style-loader',
            use: cssLoaders
        });
    } else {
        cssLoaders.unshift('style-loader');
    }

    return {
        test: handleScss && handleCss ? /\.(css|scss)$/ : handleCss ? /\.css$/ : handleScss ? /\.scss$/ : false,
        use: cssLoaders
    };
}
module.exports = exports['default'];