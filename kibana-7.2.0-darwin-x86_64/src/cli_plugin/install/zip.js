"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyzeArchive = analyzeArchive;
exports._isDirectory = _isDirectory;
exports.extractArchive = extractArchive;

var _yauzl = _interopRequireDefault(require("yauzl"));

var _path = _interopRequireDefault(require("path"));

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _fs = require("fs");

var _lodash = require("lodash");

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

/**
 * Returns an array of package objects. There will be one for each of
 *  package.json files in the archive
 *
 * @param {string} archive - path to plugin archive zip file
 */
function analyzeArchive(archive) {
  const plugins = [];
  const regExp = new RegExp('(kibana[\\\\/][^\\\\/]+)[\\\\/]package\.json', 'i');
  return new Promise((resolve, reject) => {
    _yauzl.default.open(archive, {
      lazyEntries: true
    }, function (err, zipfile) {
      if (err) {
        return reject(err);
      }

      zipfile.readEntry();
      zipfile.on('entry', function (entry) {
        const match = entry.fileName.match(regExp);

        if (!match) {
          return zipfile.readEntry();
        }

        zipfile.openReadStream(entry, function (err, readable) {
          const chunks = [];

          if (err) {
            return reject(err);
          }

          readable.on('data', chunk => chunks.push(chunk));
          readable.on('end', function () {
            const contents = Buffer.concat(chunks).toString();
            const pkg = JSON.parse(contents);
            plugins.push(Object.assign(pkg, {
              archivePath: match[1],
              archive: archive,
              // Plugins must specify their version, and by default that version should match
              // the version of kibana down to the patch level. If these two versions need
              // to diverge, they can specify a kibana.version to indicate the version of
              // kibana the plugin is intended to work with.
              kibanaVersion: (0, _lodash.get)(pkg, 'kibana.version', pkg.version)
            }));
            zipfile.readEntry();
          });
        });
      });
      zipfile.on('close', () => {
        resolve(plugins);
      });
    });
  });
}

const isDirectoryRegex = /(\/|\\)$/;

function _isDirectory(filename) {
  return isDirectoryRegex.test(filename);
}

function extractArchive(archive, targetDir, extractPath) {
  return new Promise((resolve, reject) => {
    _yauzl.default.open(archive, {
      lazyEntries: true
    }, function (err, zipfile) {
      if (err) {
        return reject(err);
      }

      zipfile.readEntry();
      zipfile.on('close', resolve);
      zipfile.on('entry', function (entry) {
        let fileName = entry.fileName;

        if (extractPath && fileName.startsWith(extractPath)) {
          fileName = fileName.substring(extractPath.length);
        } else {
          return zipfile.readEntry();
        }

        if (targetDir) {
          fileName = _path.default.join(targetDir, fileName);
        }

        if (_isDirectory(fileName)) {
          (0, _mkdirp.default)(fileName, function (err) {
            if (err) {
              return reject(err);
            }

            zipfile.readEntry();
          });
        } else {
          // file entry
          zipfile.openReadStream(entry, function (err, readStream) {
            if (err) {
              return reject(err);
            } // ensure parent directory exists


            (0, _mkdirp.default)(_path.default.dirname(fileName), function (err) {
              if (err) {
                return reject(err);
              }

              readStream.pipe((0, _fs.createWriteStream)(fileName, {
                mode: entry.externalFileAttributes >>> 16
              }));
              readStream.on('end', function () {
                zipfile.readEntry();
              });
            });
          });
        }
      });
    });
  });
}