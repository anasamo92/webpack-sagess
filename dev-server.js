'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serverLauncher = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

var _defaultsDeep = require('lodash/defaultsDeep');

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

var _errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');

var _errorOverlayMiddleware2 = _interopRequireDefault(_errorOverlayMiddleware);

var _noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

var _noopServiceWorkerMiddleware2 = _interopRequireDefault(_noopServiceWorkerMiddleware);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _clearConsole = require('react-dev-utils/clearConsole');

var _clearConsole2 = _interopRequireDefault(_clearConsole);

var _WebpackDevServerUtils = require('react-dev-utils/WebpackDevServerUtils');

var _envParser = require('./webpack-utilities/env-parser');

var _envParser2 = _interopRequireDefault(_envParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Environment settings
var parsedEnv = (0, _envParser2.default)(process.env);
var OUTPUT_DIR = parsedEnv.OUTPUT_DIR,
    DEV_SERVER_PROTOCOL = parsedEnv.DEV_SERVER_PROTOCOL,
    DEV_SERVER_HOST = parsedEnv.DEV_SERVER_HOST,
    DEV_SERVER_PORT = parsedEnv.DEV_SERVER_PORT,
    OUTPUT_PUBLIC_PATH = parsedEnv.OUTPUT_PUBLIC_PATH,
    npm_package_name = parsedEnv.npm_package_name;

/*****************************************
********* Webpack dev server *************
******************************************/

var isInteractive = process.stdout.isTTY;

var defaultServerConfig = {
    publicPath: OUTPUT_PUBLIC_PATH, // see https://webpack.js.org/configuration/dev-server/#devserver-publicpath-
    hot: true,
    watchOptions: {
        ignored: /node_modules/
    },
    clientLogLevel: 'info',
    watchContentBase: true,
    quiet: true,
    overlay: false,

    historyApiFallback: true,
    contentBase: _path2.default.resolve(process.cwd(), OUTPUT_DIR),
    // By default, proxy all request different from built files, to the API
    proxy: {
        // '**': API_ROOT
    },
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    setup: function setup(app) {
        // This lets us open files from the runtime error overlay.
        app.use((0, _errorOverlayMiddleware2.default)());
        // This service worker file is effectively a 'no-op' that will reset any
        // previous service worker registered for the same host:port combination.
        // We do this in development to avoid hitting the production cache if
        // it used the same host and port.
        // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
        app.use((0, _noopServiceWorkerMiddleware2.default)());
    }
};

var serverLauncher = exports.serverLauncher = function serverLauncher(webpackConfig) {
    var serverConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // We attempt to use the default port but if it is busy, we offer the user to
    // run on a different port. `detect()` Promise resolves to the next free port.
    (0, _WebpackDevServerUtils.choosePort)(DEV_SERVER_HOST, DEV_SERVER_PORT).then(function (port) {
        if (port === null) {
            // We have not found a port.
            return;
        }

        var urls = (0, _WebpackDevServerUtils.prepareUrls)(DEV_SERVER_PROTOCOL, DEV_SERVER_HOST, port);
        // Create a webpack compiler that is configured with custom messages.
        var compiler = (0, _WebpackDevServerUtils.createCompiler)(_webpack2.default, webpackConfig, npm_package_name, urls, false);

        var devServer = new _webpackDevServer2.default(compiler, (0, _defaultsDeep2.default)(serverConfig, defaultServerConfig));
        // Launch WebpackDevServer.
        devServer.listen(port, DEV_SERVER_HOST, function (err) {
            if (err) {
                return console.log(err);
            }
            if (isInteractive) {
                (0, _clearConsole2.default)();
            }
            console.log(_chalk2.default.cyan('Starting the development server at %s:%s...\n'), DEV_SERVER_HOST, port);
            // openBrowser(urls.localUrlForBrowser);
        });

        ['SIGINT', 'SIGTERM'].forEach(function (sig) {
            process.on(sig, function () {
                devServer.close();
                process.exit();
            });
        });
    }).catch(function (err) {
        if (err && err.message) {
            console.log(err.message);
        }
        process.exit(1);
    });
};