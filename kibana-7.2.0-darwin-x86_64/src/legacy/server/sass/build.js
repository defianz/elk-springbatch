"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Build = void 0;

var _path = require("path");

var _util = require("util");

var _fs = _interopRequireDefault(require("fs"));

var _nodeSass = _interopRequireDefault(require("node-sass"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _postcss = _interopRequireDefault(require("postcss"));

var _postcssUrl = _interopRequireDefault(require("postcss-url"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _chalk = _interopRequireDefault(require("chalk"));

var _isPathInside = _interopRequireDefault(require("is-path-inside"));

var _public_path_placeholder = require("../../../optimize/public_path_placeholder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const renderSass = (0, _util.promisify)(_nodeSass.default.render);
const writeFile = (0, _util.promisify)(_fs.default.writeFile);
const exists = (0, _util.promisify)(_fs.default.exists);
const copyFile = (0, _util.promisify)(_fs.default.copyFile);
const mkdirpAsync = (0, _util.promisify)(_mkdirp.default);
const UI_ASSETS_DIR = (0, _path.resolve)(__dirname, '../../ui/public/assets');

const DARK_THEME_IMPORTER = url => {
  if (url.includes('eui_colors_light')) {
    return {
      file: url.replace('eui_colors_light', 'eui_colors_dark')
    };
  }

  return {
    file: url
  };
};

const makeAsset = (request, {
  path,
  root,
  boundry,
  copyRoot,
  urlRoot
}) => {
  const relativePath = (0, _path.relative)(root, path);
  return {
    path,
    root,
    boundry,
    url: (0, _path.join)(`${_public_path_placeholder.PUBLIC_PATH_PLACEHOLDER}${urlRoot}`, relativePath).replace(/\\/g, '/'),
    copyTo: copyRoot ? (0, _path.resolve)(copyRoot, relativePath) : undefined,
    requestUrl: request.url
  };
};

class Build {
  constructor({
    log,
    sourcePath,
    targetPath,
    urlImports,
    theme,
    sourceMap = true,
    outputStyle = 'nested'
  }) {
    this.log = log;
    this.sourcePath = sourcePath;
    this.sourceDir = (0, _path.dirname)(this.sourcePath);
    this.targetPath = targetPath;
    this.targetDir = (0, _path.dirname)(this.targetPath);
    this.urlImports = urlImports;
    this.theme = theme;
    this.includedFiles = [sourcePath];
    this.sourceMap = sourceMap;
    this.outputStyle = outputStyle;
  }
  /**
   * Glob based on source path
   */


  async buildIfIncluded(path) {
    if (this.includedFiles && this.includedFiles.includes(path)) {
      await this.build();
      return true;
    }

    return false;
  }
  /**
   * Transpiles SASS and writes CSS to output
   */


  async build() {
    const rendered = await renderSass({
      file: this.sourcePath,
      outFile: this.targetPath,
      sourceMap: this.sourceMap,
      outputStyle: this.outputStyle,
      sourceMapEmbed: this.sourceMap,
      includePaths: [(0, _path.resolve)(__dirname, '../../../../node_modules')],
      importer: this.theme === 'dark' ? DARK_THEME_IMPORTER : undefined
    });
    const processor = (0, _postcss.default)([_autoprefixer.default]);
    const urlAssets = [];

    if (this.urlImports) {
      processor.use((0, _postcssUrl.default)({
        url: request => {
          if (!request.pathname) {
            return request.url;
          }

          const asset = makeAsset(request, request.pathname.startsWith('ui/assets') ? {
            path: (0, _path.resolve)(UI_ASSETS_DIR, (0, _path.relative)('ui/assets', request.pathname)),
            root: UI_ASSETS_DIR,
            boundry: UI_ASSETS_DIR,
            urlRoot: `ui/`
          } : {
            path: (0, _path.resolve)(this.sourceDir, request.pathname),
            root: this.sourceDir,
            boundry: this.urlImports.publicDir,
            urlRoot: this.urlImports.urlBase,
            copyRoot: this.targetDir
          });

          if (!urlAssets.some(({
            path,
            copyTo
          }) => path === asset.path && copyTo === asset.copyTo)) {
            urlAssets.push(asset);
          }

          return asset.url;
        }
      }));
    }

    const prefixed = await processor.process(rendered.css, {
      from: this.sourcePath
    });
    this.includedFiles = [...rendered.stats.includedFiles, ...urlAssets.map(({
      path
    }) => path)]; // verify that asset sources exist and import is valid before writing anything

    await Promise.all(urlAssets.map(async asset => {
      if (!(await exists(asset.path))) {
        throw this._makeError('Invalid url() in css output', `url("${asset.requestUrl}") resolves to "${asset.path}", which does not exist.\n` + `  Make sure that the request is relative to "${asset.root}"`);
      }

      if (!(0, _isPathInside.default)(asset.path, asset.boundry)) {
        throw this._makeError('Invalid url() in css output', `url("${asset.requestUrl}") resolves to "${asset.path}"\n` + `  which is outside of "${asset.boundry}"`);
      }
    })); // write css

    await mkdirpAsync(this.targetDir);
    await writeFile(this.targetPath, prefixed.css); // copy non-shared urlAssets

    await Promise.all(urlAssets.map(async asset => {
      if (!asset.copyTo) {
        return;
      }

      await mkdirpAsync((0, _path.dirname)(asset.copyTo));
      await copyFile(asset.path, asset.copyTo);
    }));
    return this;
  }

  _makeError(title, message) {
    const error = new Error(`${_chalk.default.red(`${title} [${this.sourcePath}]`)}\n\n  ${message}\n`);
    error.file = this.sourcePath;
    return error;
  }

}

exports.Build = Build;