'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configBuilder = exports.serverLauncher = undefined;

var _devServer = require('./dev-server');

var _base = require('./config/base');

var _base2 = _interopRequireDefault(_base);

var _envParser = require('./webpack-utilities/env-parser');

var _envParser2 = _interopRequireDefault(_envParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Function to build a webpack conf, from a custom conf to be merged, and defined variables
 * 
 * @param {any} [customConf={}] a custom partial webpack conf, to be merged
 * @param {any} [definedVariables={}] some variables to be defined
 * @returns {object} the webpack conf built
 */
var configBuilder = function configBuilder() {
    var customConf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var definedVariables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return (0, _base2.default)(process.env, definedVariables).toWebpackConfig((0, _envParser2.default)(process.env), customConf);
};

exports.serverLauncher = _devServer.serverLauncher;
exports.configBuilder = configBuilder;