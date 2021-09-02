"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaMigrator = void 0;

var _lodash = require("lodash");

var _schema = require("../../schema");

var _serialization = require("../../serialization");

var _validation = require("../../validation");

var _core = require("../core");

var _document_migrator = require("../core/document_migrator");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Manages the shape of mappings and documents in the Kibana index.
 *
 * @export
 * @class KibanaMigrator
 */
class KibanaMigrator {
  /**
   * Migrates the mappings and documents in the Kibana index. This will run only
   * once and subsequent calls will return the result of the original call.
   *
   * @returns
   * @memberof KibanaMigrator
   */

  /**
   * Creates an instance of KibanaMigrator.
   *
   * @param opts
   * @prop {KbnServer} kbnServer - An instance of the Kibana server object.
   * @memberof KibanaMigrator
   */
  constructor({
    kbnServer
  }) {
    _defineProperty(this, "awaitMigration", (0, _lodash.once)(async () => {
      const {
        server
      } = this.kbnServer; // Wait until the plugins have been found an initialized...

      await this.kbnServer.ready(); // We can't do anything if the elasticsearch plugin has been disabled.

      if (!server.plugins.elasticsearch) {
        server.log(['warning', 'migration'], 'The elasticsearch plugin is disabled. Skipping migrations.');
        return {
          status: 'skipped'
        };
      } // Wait until elasticsearch is green...


      await server.plugins.elasticsearch.waitUntilReady();
      const config = server.config();
      const migrator = new _core.IndexMigrator({
        batchSize: config.get('migrations.batchSize'),
        callCluster: server.plugins.elasticsearch.getCluster('admin').callWithInternalUser,
        documentMigrator: this.documentMigrator,
        index: config.get('kibana.index'),
        log: this.log,
        mappingProperties: this.mappingProperties,
        pollInterval: config.get('migrations.pollInterval'),
        scrollDuration: config.get('migrations.scrollDuration'),
        serializer: this.serializer,
        obsoleteIndexTemplatePattern: 'kibana_index_template*'
      });
      return migrator.migrate();
    }));

    _defineProperty(this, "kbnServer", void 0);

    _defineProperty(this, "documentMigrator", void 0);

    _defineProperty(this, "mappingProperties", void 0);

    _defineProperty(this, "log", void 0);

    _defineProperty(this, "serializer", void 0);

    this.kbnServer = kbnServer;
    this.serializer = new _serialization.SavedObjectsSerializer(new _schema.SavedObjectsSchema(kbnServer.uiExports.savedObjectSchemas));
    this.mappingProperties = mergeProperties(kbnServer.uiExports.savedObjectMappings || []);

    this.log = (meta, message) => kbnServer.server.log(meta, message);

    this.documentMigrator = new _document_migrator.DocumentMigrator({
      kibanaVersion: kbnServer.version,
      migrations: kbnServer.uiExports.savedObjectMigrations || {},
      validateDoc: (0, _validation.docValidator)(kbnServer.uiExports.savedObjectValidations || {}),
      log: this.log
    });
  }
  /**
   * Gets the index mappings defined by Kibana's enabled plugins.
   *
   * @returns
   * @memberof KibanaMigrator
   */


  getActiveMappings() {
    return (0, _core.buildActiveMappings)({
      properties: this.mappingProperties
    });
  }
  /**
   * Migrates an individual doc to the latest version, as defined by the plugin migrations.
   *
   * @param {RawSavedObjectDoc} doc
   * @returns {RawSavedObjectDoc}
   * @memberof KibanaMigrator
   */


  migrateDocument(doc) {
    return this.documentMigrator.migrate(doc);
  }

}
/**
 * Merges savedObjectMappings properties into a single object, verifying that
 * no mappings are redefined.
 */


exports.KibanaMigrator = KibanaMigrator;

function mergeProperties(mappings) {
  return mappings.reduce((acc, {
    pluginId,
    properties
  }) => {
    const duplicate = Object.keys(properties).find(k => acc.hasOwnProperty(k));

    if (duplicate) {
      throw new Error(`Plugin ${pluginId} is attempting to redefine mapping "${duplicate}".`);
    }

    return Object.assign(acc, properties);
  }, {});
}