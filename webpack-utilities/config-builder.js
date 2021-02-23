'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _defaultsDeep = require('lodash/defaultsDeep');

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var entryError = 'Le point d\'entr\xE9e correspond au point d\'entr\xE9e dans la SPA,\nle param\xE8tre devrait \xEAtre une chaine de caract\xE8re correspondant au fichier de lancement de l\'application, ou \xE0 son dossier si c\'est un index.js\nPar exemple (et par d\xE9faut) path.resolve(process.cwd(), \'./src\'), c\xE0d le dossier src du dossier courant';

/**
 * Classe pour construire une configuration de façon simple, et modulable.
 *
 * @class ConfigBuilder
 */

var ConfigBuilder = function () {
    function ConfigBuilder() {
        _classCallCheck(this, ConfigBuilder);

        this.configEnv = {};
        this.entries = [];
        this.output = {
            // libraryTarget: 'umd'
        };
        this.devtool = false;
        this.stats = {};
        this.plugins = [];
        this.loaders = [];
        this.extensions = ['.js', '.jsx'];
        this.rules = [];
        this.debugConfig = false;
        this.sourceMaps = false;
        this.externals = {};
        this.definedVariables = {};
        this.projectName = null;
        this.aliases = {};
    }

    _createClass(ConfigBuilder, [{
        key: '_debugInfo',
        value: function _debugInfo() {
            if (this.debugConfig) {
                console.log('########################################################################');
                console.log(arguments);
                console.log('########################################################################');
                console.log();
            }
        }

        /**
         * Ajoute un point d'entrée dans l'application
         * Cf https://webpack.js.org/configuration/entry-context/#entry
         *
         * @param {Array|string} entry Le chemin indiquant le point d'entrée de l'application (relatif, ou absolu), par exemple path.resolve(process.cwd(), './src'), ou path.resolve(process.cwd(), './src/index.js'), ou './src'
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'addEntry',
        value: function addEntry(entry) {
            this._debugInfo('addEntry', [].concat(Array.prototype.slice.call(arguments)));
            if (Array.isArray(entry)) {
                var _entries;

                (_entries = this.entries).push.apply(_entries, _toConsumableArray(entry));
            } else if (typeof entry === 'string') {
                this.entries.push(entry);
            } else {
                throw new Error(entryError);
            }
        }

        /**
         * Indique le dossier de sortie du build webpack.
         * Cf https://webpack.js.org/configuration/output/#output-path
         *
         * @param {string} outPath Le path pour le dossier d'output
         * @param {boolean} [isRelative=true] Indique si le path donnée est relatif par rapport au dossier du projet (par défaut), ou absolu.
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'setOuputPath',
        value: function setOuputPath(outPath) {
            var isRelative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this._debugInfo('setOuputPath', [].concat(Array.prototype.slice.call(arguments)));
            this.output.path = isRelative ? _path2.default.resolve(process.cwd(), outPath) : outPath;
        }

        /**
         * Ajoute un alias pour la résolution des sources (ex: test focus, etc).
         * Cf https://webpack.js.org/configuration/resolve/#resolve-alias
         *
         * @param {any} aliasName le nom de l'alias
         * @param {any} aliasPath le path du dossier/fichier pour la résolution
         * @param {boolean} [isRelative=true] Indique si le path donnée est relatif par rapport au dossier du projet (par défaut), ou absolu.
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'addAlias',
        value: function addAlias(aliasName, aliasPath) {
            var isRelative = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            this._debugInfo('addAlias', [].concat(Array.prototype.slice.call(arguments)));
            this.aliases[aliasName] = isRelative ? _path2.default.resolve(process.cwd(), aliasPath) : aliasPath;
        }

        /**
         * Indique le dossier contenant les assets servies par la SPA (css, images, ...).
         * Cf https://webpack.js.org/configuration/output/#output-publicpath
         *
         * @param {string} path Le path pour le dossier d'assets
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'setAssetsPublicPath',
        value: function setAssetsPublicPath(path) {
            this._debugInfo('setAssetsPublicPath', [].concat(Array.prototype.slice.call(arguments)));
            this.output.publicPath = path;
        }

        /**
         * Indique le nom des chunk en cas de require.ensure.
         * @param {string} name
         */

    }, {
        key: 'setChunkFileName',
        value: function setChunkFileName(name) {
            this._debugInfo('setChunkFileName', [].concat(Array.prototype.slice.call(arguments)));
            this.output.chunkFilename = name;
        }

        /**
         * Indique le nom du fichier d'output, sans l'extension. Peut contenir [name], [id] et [contenthash]
         * Cf https://webpack.js.org/configuration/output/#output-filename
         * Cf https://github.com/webpack-contrib/extract-text-webpack-plugin
         *
         * @param {string} name le nom du fichier JS et CSS sans l'extension (par défault, le nom du package NPM :`${npm_package_name}`)
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'setFilename',
        value: function setFilename(name) {
            this._debugInfo('setFilename', [].concat(Array.prototype.slice.call(arguments)));
            this.projectName = name;
            this.output.filename = this.projectName + '.js';
        }

        /**
         * Ajoute une extension dans la liste des extensions automatiquement résolues (par défaut, .js, .jsx, .json).
         * Cf https://webpack.js.org/configuration/resolve/#resolve-extensions
         *
         * @param {string} extension une extension à résoudre automatiquement
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'addExtension',
        value: function addExtension(extension) {
            this._debugInfo('addExtension', [].concat(Array.prototype.slice.call(arguments)));
            if (Array.isArray(extension)) {
                var _extensions;

                (_extensions = this.extensions).push.apply(_extensions, _toConsumableArray(extension));
            } else if (typeof extension === 'string') {
                this.extensions.push(extension);
            } else {
                throw new Error('Une extension est soit une chaine de caractère, soit tableau de chaine de caractère');
            }
        }
    }, {
        key: '_getInsertIndex',
        value: function _getInsertIndex(orderedList, newOrdre) {
            return orderedList.findIndex(function (_ref) {
                var ordre = _ref.ordre;
                return ordre > newOrdre;
            });
        }
    }, {
        key: '_getElement',
        value: function _getElement(orderedList, eltOrdre) {
            return orderedList.find(function (_ref2) {
                var ordre = _ref2.ordre;
                return eltOrdre === ordre;
            });
        }
    }, {
        key: '_getIndexElement',
        value: function _getIndexElement(orderedList, eltOrdre) {
            return orderedList.findIndex(function (_ref3) {
                var ordre = _ref3.ordre;
                return eltOrdre === ordre;
            });
        }
    }, {
        key: '_insertElt',
        value: function _insertElt(orderedList, newElt) {
            if (this._getIndexElement(orderedList, newElt.ordre) !== -1) {
                throw new Error('Un élément d\'ordre ' + newElt.ordre + ' existe déjà');
            }
            var index = this._getInsertIndex(orderedList, newElt.ordre);
            if (index === -1) {
                // L'élément a l'ordre le plus grand
                orderedList.push(newElt);
            } else {
                // Sinon, on injecte juste avant le plugin ayant un ordre plus élevé
                orderedList.splice(index, 0, newElt);
            }
        }
    }, {
        key: '_removeElt',
        value: function _removeElt(orderedList, ordre) {
            var index = this._getIndexElement(orderedList, ordre);
            if (index === -1) {
                console.warn("Aucun élément d'ordre " + ordre + " n'existe, donc aucun élément n'a été retiré");
                return null;
            } else {
                return orderedList.splice(index, 1)[0];
            }
        }

        /**
         * Ajoute un plugin à la configuration webpack, à la position indiquée.
         * Cf https://webpack.js.org/configuration/plugins/#plugins
         *
         * @param {int} ordre la position dans la liste des plugins (les plugins par défaut sont espacés de 10, pour permettre l'injection)
         * @param {any} plugin Le plugin webpack à insérer
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'addPlugin',
        value: function addPlugin(ordre, plugin) {
            this._debugInfo('addPlugin', [].concat(Array.prototype.slice.call(arguments)));
            this._insertElt(this.plugins, { ordre: ordre, plugin: plugin });
        }

        /**
         * Retire un plugin à la configuration webpack, à la position indiquée.
         *
         * @param {int} ordre la position dans la liste des plugins
         * @returns {object} l'élément supprimé
         * @memberof ConfigBuilder
         *
         */

    }, {
        key: 'removePlugin',
        value: function removePlugin(ordre) {
            this._debugInfo('removePlugin', [].concat(Array.prototype.slice.call(arguments)));
            return (this._removeElt(this.plugins, ordre) || {}).plugin;
        }

        /**
         * Accède à un plugin de la configuration webpack, à la position indiquée.
         *
         * @param {int} ordre la position dans la liste des plugins
         * @returns {object} l'élément
         * @memberof ConfigBuilder
         *
         */

    }, {
        key: 'getPlugin',
        value: function getPlugin(ordre) {
            this._debugInfo('getPlugin', [].concat(Array.prototype.slice.call(arguments)));
            return (this._getElement(this.plugins, ordre) || {}).plugin;
        }

        /**
         * Ajoute un loader/Rule simple à la configuration webpack, à la position indiquée.
         * Cf https://webpack.js.org/configuration/module/#rule
         * Cf https://webpack.js.org/configuration/module/#rule-loader
         * Cf https://webpack.js.org/configuration/module/#rule-use
         *
         * @param {int} ordre la position dans la liste des loaders (les loaders par défaut sont espacés de 10, pour permettre l'injection)
         * @param {RegExp} test le test pour matcher ou non le fichier
         * @param {string} loader le nom du loader
         * @param {object} [options=null] un objet d'options, pour le loader
         * @param {boolean} [isPreloader=false] si le loader est un pre-loader
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'addSimpleLoader',
        value: function addSimpleLoader(ordre, test, loader) {
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
            var isPreloader = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            this._debugInfo('addSimpleLoader', [].concat(Array.prototype.slice.call(arguments)));
            var newLoader = { ordre: ordre, loader: { test: test, loader: loader } };
            if (options !== null) {
                newLoader.loader.options = options;
            }
            if (isPreloader) {
                newLoader.loader.enforce = 'pre';
            }
            this._insertElt(this.loaders, newLoader);
        }

        /**
         * Ajoute un loader/Rule à la configuration webpack, à la position indiquée.
         * Cf https://webpack.js.org/configuration/module/#rule
         * Cf https://webpack.js.org/configuration/module/#rule-loader
         * Cf https://webpack.js.org/configuration/module/#rule-use     *
         * @param {int} ordre la position dans la liste des loaders (les loaders par défaut sont espacés de 10, pour permettre l'injection)
         * @param {object} rule l'objet
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'addComplexLoader',
        value: function addComplexLoader(ordre, rule) {
            this._debugInfo('addComplexLoader', [].concat(Array.prototype.slice.call(arguments)));
            var newLoader = { ordre: ordre, loader: rule };
            this._insertElt(this.loaders, newLoader);
        }

        /**
         * Retire un loader à la configuration webpack, à la position indiquée.
         *
         * @param {int} ordre la position dans la liste des loaders
         * @returns {object} l'élément supprimé
         * @memberof ConfigBuilder
         *
         */

    }, {
        key: 'removeLoader',
        value: function removeLoader(ordre) {
            this._debugInfo('removeLoader', [].concat(Array.prototype.slice.call(arguments)));
            return (this._removeElt(this.loaders, ordre) || {}).loader;
        }

        /**
         * Accède à un loader de la configuration webpack, à la position indiquée.
         *
         * @param {int} ordre la position dans la liste des loaders
         * @returns {object} l'élément
         * @memberof ConfigBuilder
         *
         */

    }, {
        key: 'getLoader',
        value: function getLoader(ordre) {
            this._debugInfo('getLoader', [].concat(Array.prototype.slice.call(arguments)));
            return (this._getElement(this.loaders, ordre) || {}).loader;
        }

        /**
         * Indique si les sourcemaps doivent être utilisé ou non.
         *
         * @param {boolean} useSourceMaps si les sourcemaps doivent être utilisé ou non.
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'useSourceMaps',
        value: function useSourceMaps() {
            var _useSourceMaps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this._debugInfo('useSourceMaps', [].concat(Array.prototype.slice.call(arguments)));
            this.sourceMaps = _useSourceMaps;
        }

        /**
         * Ajoute une variable qui sera définie par le plugin DefineVariable, et injectée (càd remplacée par sa valeur) par webpack.
         * Note : Il est nécessaire d'utiliser getDefinedVariables dans le cas d'une configuration non basée sur celle par défaut.
         *
         * @param {string} key le nom de la variable
         * @param {string} value la valeur de la variable
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'addDefinedVariable',
        value: function addDefinedVariable(key, value) {
            this.definedVariables[key] = value;
        }

        /**
         * Retourne un objet de config pour le plugin webpack.DefinePlugin.
         *
         * @returns {object} l'objet de config pour le plugin DefinePlugin
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'getDefinedVariables',
        value: function getDefinedVariables() {
            return this.definedVariables;
        }

        /**
         * Retourne le nom du fichier css (pour ExtractTextPlugin).
         *
         * @returns {string} le nom du fichier css
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'getCssFilename',
        value: function getCssFilename() {
            return this.projectName + '.css';
        }

        /**
         * Ajoute un external à la configuration webpack, càd un nom qui sera résolu de manière global (jQuery, Backbone, ...)
         * Cf https://webpack.js.org/configuration/externals/
         *
         * @param {string} key le nom de la variable
         * @param {string|object} value la valeur à résoudre dans le bundle au runtime (peut être par type de lib), cf doc webpack
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'addExternal',
        value: function addExternal(key, value) {
            this.externals[key] = value;
        }
    }, {
        key: '_buildConfig',
        value: function _buildConfig(env) {
            var config = {
                entry: this.entries,
                output: this.output,
                resolve: {
                    extensions: this.extensions,
                    alias: this.aliases
                },
                plugins: this.plugins.map(function (_ref4) {
                    var plugin = _ref4.plugin;
                    return plugin;
                }).map(function (item) {
                    return typeof item === 'function' ? item(env) : item;
                }),
                module: {
                    rules: this.loaders.map(function (_ref5) {
                        var loader = _ref5.loader;
                        return loader;
                    }).map(function (item) {
                        return typeof item === 'function' ? item(env) : item;
                    })
                },
                externals: this.externals,
                stats: {
                    colors: true,
                    version: false,
                    timings: false,
                    assets: false,
                    chunks: false,
                    modules: false,
                    reasons: false,
                    children: false,
                    source: false,
                    errors: true,
                    errorDetails: true,
                    warnings: true
                }
            };

            config.devtool = this.sourceMaps && env.MINIMIFY ? 'source-map' : this.sourceMaps ? 'eval-source-map' : false;

            return config;
        }

        /**
         * Construit l'objet de configuration webpack.
         *
         * @param {object} [env={}] une object contenant des valeurs pour la résolution des plugins et loaders.
         * @param {object} [customConf={}] une configuration custom, pouvant être mergée avec la conf buildée.
         * @returns {object} la configuration buildée, et mergée
         *
         * @memberOf ConfigBuilder
         */

    }, {
        key: 'toWebpackConfig',
        value: function toWebpackConfig() {
            var env = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var customConf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return (0, _defaultsDeep2.default)(customConf, this._buildConfig(env));
        }
    }]);

    return ConfigBuilder;
}();

exports.default = ConfigBuilder;
module.exports = exports['default'];