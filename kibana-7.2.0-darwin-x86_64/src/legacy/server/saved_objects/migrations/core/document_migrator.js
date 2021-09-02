"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentMigrator = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _lodash = _interopRequireDefault(require("lodash"));

var _lodash2 = _interopRequireDefault(require("lodash.clonedeep"));

var _semver = _interopRequireDefault(require("semver"));

var _migration_logger = require("./migration_logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A concrete implementation of the VersionedTransformer interface.
 */
class DocumentMigrator {
  /**
   * Creates an instance of DocumentMigrator.
   *
   * @param {Opts} opts
   * @prop {string} kibanaVersion - The current version of Kibana
   * @prop {MigrationDefinition} migrations - The migrations that will be used to migrate documents
   * @prop {ValidateDoc} validateDoc - A function which, given a document throws an error if it is
   *   not up to date. This is used to ensure we don't let unmigrated documents slip through.
   * @prop {Logger} log - The migration logger
   * @memberof DocumentMigrator
   */
  constructor(opts) {
    _defineProperty(this, "migrations", void 0);

    _defineProperty(this, "transformDoc", void 0);

    _defineProperty(this, "migrate", doc => {
      // Clone the document to prevent accidental mutations on the original data
      // Ex: Importing sample data that is cached at import level, migrations would
      // execute on mutated data the second time.
      const clonedDoc = (0, _lodash2.default)(doc);
      return this.transformDoc(clonedDoc);
    });

    validateMigrationDefinition(opts.migrations);
    this.migrations = buildActiveMigrations(opts.migrations, new _migration_logger.MigrationLogger(opts.log));
    this.transformDoc = buildDocumentTransform({
      kibanaVersion: opts.kibanaVersion,
      migrations: this.migrations,
      validateDoc: opts.validateDoc
    });
  }
  /**
   * Gets the latest version of each migratable property.
   *
   * @readonly
   * @type {MigrationVersion}
   * @memberof DocumentMigrator
   */


  get migrationVersion() {
    return _lodash.default.mapValues(this.migrations, ({
      latestVersion
    }) => latestVersion);
  }
  /**
   * Migrates a document to the latest version.
   *
   * @param {RawSavedObjectDoc} doc
   * @returns {RawSavedObjectDoc}
   * @memberof DocumentMigrator
   */


}
/**
 * Basic validation that the migraiton definition matches our expectations. We can't
 * rely on TypeScript here, as the caller may be JavaScript / ClojureScript / any compile-to-js
 * language. So, this is just to provide a little developer-friendly error messaging. Joi was
 * giving weird errors, so we're just doing manual validation.
 */


exports.DocumentMigrator = DocumentMigrator;

function validateMigrationDefinition(migrations) {
  function assertObject(obj, prefix) {
    if (!obj || typeof obj !== 'object') {
      throw new Error(`${prefix} Got ${obj}.`);
    }
  }

  function assertValidSemver(version, type) {
    if (!_semver.default.valid(version)) {
      throw new Error(`Invalid migration for type ${type}. Expected all properties to be semvers, but got ${version}.`);
    }
  }

  function assertValidTransform(fn, version, type) {
    if (typeof fn !== 'function') {
      throw new Error(`Invalid migration ${type}.${version}: expected a function, but got ${fn}.`);
    }
  }

  assertObject(migrations, 'Migration definition should be an object.');
  Object.entries(migrations).forEach(([type, versions]) => {
    assertObject(versions, `Migration for type ${type} should be an object like { '2.0.0': (doc) => doc }.`);
    Object.entries(versions).forEach(([version, fn]) => {
      assertValidSemver(version, type);
      assertValidTransform(fn, version, type);
    });
  });
}
/**
 * Converts migrations from a format that is convenient for callers to a format that
 * is convenient for our internal usage:
 * From: { type: { version: fn } }
 * To:   { type: { latestVersion: string, transforms: [{ version: string, transform: fn }] } }
 */


function buildActiveMigrations(migrations, log) {
  return _lodash.default.mapValues(migrations, (versions, prop) => {
    const transforms = Object.entries(versions).map(([version, transform]) => ({
      version,
      transform: wrapWithTry(version, prop, transform, log)
    })).sort((a, b) => _semver.default.compare(a.version, b.version));
    return {
      latestVersion: _lodash.default.last(transforms).version,
      transforms
    };
  });
}
/**
 * Creates a function which migrates and validates any document that is passed to it.
 */


function buildDocumentTransform({
  kibanaVersion,
  migrations,
  validateDoc
}) {
  return function transformAndValidate(doc) {
    const result = doc.migrationVersion ? applyMigrations(doc, migrations) : markAsUpToDate(doc, migrations);
    validateDoc(result); // In order to keep tests a bit more stable, we won't
    // tack on an empy migrationVersion to docs that have
    // no migrations defined.

    if (_lodash.default.isEmpty(result.migrationVersion)) {
      delete result.migrationVersion;
    }

    return result;
  };
}

function applyMigrations(doc, migrations) {
  while (true) {
    const prop = nextUnmigratedProp(doc, migrations);

    if (!prop) {
      return doc;
    }

    doc = migrateProp(doc, prop, migrations);
  }
}
/**
 * Gets the doc's props, handling the special case of "type".
 */


function props(doc) {
  return Object.keys(doc).concat(doc.type);
}
/**
 * Looks up the prop version in a saved object document or in our latest migrations.
 */


function propVersion(doc, prop) {
  return doc[prop] && doc[prop].latestVersion || doc.migrationVersion && doc.migrationVersion[prop];
}
/**
 * Sets the doc's migrationVersion to be the most recent version
 */


function markAsUpToDate(doc, migrations) {
  return { ...doc,
    migrationVersion: props(doc).reduce((acc, prop) => {
      const version = propVersion(migrations, prop);
      return version ? _lodash.default.set(acc, prop, version) : acc;
    }, {})
  };
}
/**
 * If a specific transform function fails, this tacks on a bit of information
 * about the document and transform that caused the failure.
 */


function wrapWithTry(version, prop, transform, log) {
  return function tryTransformDoc(doc) {
    try {
      const result = transform(doc, log); // A basic sanity check to help migration authors detect basic errors
      // (e.g. forgetting to return the transformed doc)

      if (!result || !result.type) {
        throw new Error(`Invalid saved object returned from migration ${prop}:${version}.`);
      }

      return result;
    } catch (error) {
      const failedTransform = `${prop}:${version}`;
      const failedDoc = JSON.stringify(doc);
      log.warning(`Failed to transform document ${doc}. Transform: ${failedTransform}\nDoc: ${failedDoc}`);
      throw error;
    }
  };
}
/**
 * Finds the first unmigrated property in the specified document.
 */


function nextUnmigratedProp(doc, migrations) {
  return props(doc).find(p => {
    const latestVersion = propVersion(migrations, p);
    const docVersion = propVersion(doc, p);

    if (latestVersion === docVersion) {
      return false;
    } // We verify that the version is not greater than the version supported by Kibana.
    // If we didn't, this would cause an infinite loop, as we'd be unable to migrate the property
    // but it would continue to show up as unmigrated.
    // If we have a docVersion and the latestVersion is smaller than it or does not exist,
    // we are dealing with a document that belongs to a future Kibana / plugin version.


    if (docVersion && (!latestVersion || _semver.default.gt(docVersion, latestVersion))) {
      throw _boom.default.badData(`Document "${doc.id}" has property "${p}" which belongs to a more recent` + ` version of Kibana (${docVersion}).`, doc);
    }

    return true;
  });
}
/**
 * Applies any relevent migrations to the document for the specified property.
 */


function migrateProp(doc, prop, migrations) {
  const originalType = doc.type;
  let migrationVersion = _lodash.default.clone(doc.migrationVersion) || {};

  const typeChanged = () => !doc.hasOwnProperty(prop) || doc.type !== originalType;

  for (const {
    version,
    transform
  } of applicableTransforms(migrations, doc, prop)) {
    doc = transform(doc);
    migrationVersion = updateMigrationVersion(doc, migrationVersion, prop, version);
    doc.migrationVersion = _lodash.default.clone(migrationVersion);

    if (typeChanged()) {
      break;
    }
  }

  return doc;
}
/**
 * Retrieves any prop transforms that have not been applied to doc.
 */


function applicableTransforms(migrations, doc, prop) {
  const minVersion = propVersion(doc, prop);
  const {
    transforms
  } = migrations[prop];
  return minVersion ? transforms.filter(({
    version
  }) => _semver.default.gt(version, minVersion)) : transforms;
}
/**
 * Updates the document's migrationVersion, ensuring that the calling transform
 * has not mutated migrationVersion in an unsupported way.
 */


function updateMigrationVersion(doc, migrationVersion, prop, version) {
  assertNoDowngrades(doc, migrationVersion, prop, version);
  const docVersion = propVersion(doc, prop) || '0.0.0';
  const maxVersion = _semver.default.gt(docVersion, version) ? docVersion : version;
  return { ...(doc.migrationVersion || migrationVersion),
    [prop]: maxVersion
  };
}
/**
 * Transforms that remove or downgrade migrationVersion properties are not allowed,
 * as this could get us into an infinite loop. So, we explicitly check for that here.
 */


function assertNoDowngrades(doc, migrationVersion, prop, version) {
  const docVersion = doc.migrationVersion;

  if (!docVersion) {
    return;
  }

  const downgrade = Object.keys(migrationVersion).find(k => !docVersion.hasOwnProperty(k) || _semver.default.lt(docVersion[k], migrationVersion[k]));

  if (downgrade) {
    throw new Error(`Migration "${prop} v ${version}" attempted to ` + `downgrade "migrationVersion.${downgrade}" from ${migrationVersion[downgrade]} ` + `to ${docVersion[downgrade]}.`);
  }
}