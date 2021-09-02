"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchCache = void 0;

var _crypto = require("crypto");

var _fs = require("fs");

var _path = require("path");

var _util = require("util");

var _del = _interopRequireDefault(require("del"));

var _deleteEmpty = _interopRequireDefault(require("delete-empty"));

var _globby = _interopRequireDefault(require("globby"));

var _normalizePath = _interopRequireDefault(require("normalize-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const readAsync = (0, _util.promisify)(_fs.readFile);
const writeAsync = (0, _util.promisify)(_fs.writeFile);

class WatchCache {
  constructor(params) {
    _defineProperty(this, "logWithMetadata", void 0);

    _defineProperty(this, "outputPath", void 0);

    _defineProperty(this, "dllsPath", void 0);

    _defineProperty(this, "cachePath", void 0);

    _defineProperty(this, "cacheState", void 0);

    _defineProperty(this, "statePath", void 0);

    _defineProperty(this, "diskCacheState", void 0);

    _defineProperty(this, "isInitialized", void 0);

    this.logWithMetadata = params.logWithMetadata;
    this.outputPath = params.outputPath;
    this.dllsPath = params.dllsPath;
    this.cachePath = params.cachePath;
    this.isInitialized = false;
    this.statePath = '';
    this.cacheState = {};
    this.diskCacheState = {};
    this.cacheState.yarnLockSha = '';
    this.cacheState.optimizerConfigSha = '';
  }

  async tryInit() {
    if (!this.isInitialized) {
      this.statePath = (0, _path.resolve)(this.outputPath, 'watch_optimizer_cache_state.json');
      this.diskCacheState = await this.read();
      this.cacheState.yarnLockSha = await this.buildYarnLockSha();
      this.cacheState.optimizerConfigSha = await this.buildOptimizerConfigSha();
      this.isInitialized = true;
    }
  }

  async tryReset() {
    await this.tryInit();

    if (!this.isResetNeeded()) {
      return;
    }

    await this.reset();
  }

  async reset() {
    this.logWithMetadata(['info', 'optimize:watch_cache'], 'The optimizer watch cache will reset'); // start by deleting the state file to lower the
    // amount of time that another process might be able to
    // successfully read it once we decide to delete it

    await (0, _del.default)(this.statePath, {
      force: true
    }); // delete everything in optimize/.cache directory

    await (0, _del.default)((await (0, _globby.default)([(0, _normalizePath.default)(this.cachePath)], {
      dot: true
    }))); // delete some empty folder that could be left
    // from the previous cache path reset action

    await (0, _deleteEmpty.default)(this.cachePath); // delete dlls

    await (0, _del.default)(this.dllsPath); // re-write new cache state file

    await this.write();
    this.logWithMetadata(['info', 'optimize:watch_cache'], 'The optimizer watch cache has reset');
  }

  async buildShaWithMultipleFiles(filePaths) {
    const shaHash = (0, _crypto.createHash)('sha1');

    for (const filePath of filePaths) {
      try {
        shaHash.update((await readAsync(filePath, 'utf8')), 'utf8');
      } catch (e) {
        /* no-op */
      }
    }

    return shaHash.digest('hex');
  }

  async buildYarnLockSha() {
    const kibanaYarnLock = (0, _path.resolve)(__dirname, '../../../yarn.lock');
    return await this.buildShaWithMultipleFiles([kibanaYarnLock]);
  }

  async buildOptimizerConfigSha() {
    const baseOptimizer = (0, _path.resolve)(__dirname, '../base_optimizer.js');
    const dynamicDllConfigModel = (0, _path.resolve)(__dirname, '../dynamic_dll_plugin/dll_config_model.js');
    const dynamicDllPlugin = (0, _path.resolve)(__dirname, '../dynamic_dll_plugin/dynamic_dll_plugin.js');
    return await this.buildShaWithMultipleFiles([baseOptimizer, dynamicDllConfigModel, dynamicDllPlugin]);
  }

  isResetNeeded() {
    return this.hasYarnLockChanged() || this.hasOptimizerConfigChanged();
  }

  hasYarnLockChanged() {
    return this.cacheState.yarnLockSha !== this.diskCacheState.yarnLockSha;
  }

  hasOptimizerConfigChanged() {
    return this.cacheState.optimizerConfigSha !== this.diskCacheState.optimizerConfigSha;
  }

  async write() {
    await writeAsync(this.statePath, JSON.stringify(this.cacheState, null, 2), 'utf8');
    this.diskCacheState = this.cacheState;
  }

  async read() {
    try {
      return JSON.parse((await readAsync(this.statePath, 'utf8')));
    } catch (error) {
      return {};
    }
  }

}

exports.WatchCache = WatchCache;