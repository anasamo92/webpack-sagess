#!/usr/bin/env node
'use strict';

var _index = require('./index');

// We take the config relative to the process folder, assuming user launch command from project folder
var webpackConfig = require(process.cwd() + '/webpack.config');
(0, _index.serverLauncher)(webpackConfig, {});