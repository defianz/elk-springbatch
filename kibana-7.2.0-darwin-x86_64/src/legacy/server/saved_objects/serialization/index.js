"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SavedObjectsSerializer = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _version = require("../version");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function assertNonEmptyString(value, name) {
  if (!value || typeof value !== 'string') {
    throw new TypeError(`Expected "${value}" to be a ${name}`);
  }
}

class SavedObjectsSerializer {
  constructor(schema) {
    _defineProperty(this, "schema", void 0);

    this.schema = schema;
  }
  /**
   * Determines whether or not the raw document can be converted to a saved object.
   *
   * @param {RawDoc} rawDoc - The raw ES document to be tested
   */


  isRawSavedObject(rawDoc) {
    const {
      type,
      namespace
    } = rawDoc._source;
    const namespacePrefix = namespace && !this.schema.isNamespaceAgnostic(type) ? `${namespace}:` : '';
    return type && rawDoc._id.startsWith(`${namespacePrefix}${type}:`) && rawDoc._source.hasOwnProperty(type);
  }
  /**
   * Converts a document from the format that is stored in elasticsearch to the saved object client format.
   *
   *  @param {RawDoc} rawDoc - The raw ES document to be converted to saved object format.
   */


  rawToSavedObject(doc) {
    const {
      _id,
      _source,
      _seq_no,
      _primary_term
    } = doc;
    const {
      type,
      namespace
    } = _source;
    const version = _seq_no != null || _primary_term != null ? (0, _version.encodeVersion)(_seq_no, _primary_term) : undefined;
    return {
      type,
      id: this.trimIdPrefix(namespace, type, _id),
      ...(namespace && !this.schema.isNamespaceAgnostic(type) && {
        namespace
      }),
      attributes: _source[type],
      references: _source.references || [],
      ...(_source.migrationVersion && {
        migrationVersion: _source.migrationVersion
      }),
      ...(_source.updated_at && {
        updated_at: _source.updated_at
      }),
      ...(version && {
        version
      })
    };
  }
  /**
   * Converts a document from the saved object client format to the format that is stored in elasticsearch.
   *
   * @param {SanitizedSavedObjectDoc} savedObj - The saved object to be converted to raw ES format.
   */


  savedObjectToRaw(savedObj) {
    const {
      id,
      type,
      namespace,
      attributes,
      migrationVersion,
      updated_at,
      version,
      references
    } = savedObj;
    const source = {
      [type]: attributes,
      type,
      references,
      ...(namespace && !this.schema.isNamespaceAgnostic(type) && {
        namespace
      }),
      ...(migrationVersion && {
        migrationVersion
      }),
      ...(updated_at && {
        updated_at
      })
    };
    return {
      _id: this.generateRawId(namespace, type, id),
      _source: source,
      ...(version != null && (0, _version.decodeVersion)(version))
    };
  }
  /**
   * Given a saved object type and id, generates the compound id that is stored in the raw document.
   *
   * @param {string} namespace - The namespace of the saved object
   * @param {string} type - The saved object type
   * @param {string} id - The id of the saved object
   */


  generateRawId(namespace, type, id) {
    const namespacePrefix = namespace && !this.schema.isNamespaceAgnostic(type) ? `${namespace}:` : '';
    return `${namespacePrefix}${type}:${id || _uuid.default.v1()}`;
  }

  trimIdPrefix(namespace, type, id) {
    assertNonEmptyString(id, 'document id');
    assertNonEmptyString(type, 'saved object type');
    const namespacePrefix = namespace && !this.schema.isNamespaceAgnostic(type) ? `${namespace}:` : '';
    const prefix = `${namespacePrefix}${type}:`;

    if (!id.startsWith(prefix)) {
      return id;
    }

    return id.slice(prefix.length);
  }

}

exports.SavedObjectsSerializer = SavedObjectsSerializer;