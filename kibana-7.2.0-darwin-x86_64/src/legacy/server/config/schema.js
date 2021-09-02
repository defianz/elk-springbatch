"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _crypto = require("crypto");

var _os = _interopRequireDefault(require("os"));

var _utils = require("../../utils");

var _path = require("../path");

var _csp = require("../csp");

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
var _default = () => _joi.default.object({
  pkg: _joi.default.object({
    version: _joi.default.string().default(_joi.default.ref('$version')),
    branch: _joi.default.string().default(_joi.default.ref('$branch')),
    buildNum: _joi.default.number().default(_joi.default.ref('$buildNum')),
    buildSha: _joi.default.string().default(_joi.default.ref('$buildSha'))
  }).default(),
  env: _joi.default.object({
    name: _joi.default.string().default(_joi.default.ref('$env')),
    dev: _joi.default.boolean().default(_joi.default.ref('$dev')),
    prod: _joi.default.boolean().default(_joi.default.ref('$prod'))
  }).default(),
  dev: _joi.default.object({
    basePathProxyTarget: _joi.default.number().default(5603)
  }).default(),
  pid: _joi.default.object({
    file: _joi.default.string(),
    exclusive: _joi.default.boolean().default(false)
  }).default(),
  csp: _joi.default.object({
    rules: _joi.default.array().items(_joi.default.string()).default(_csp.DEFAULT_CSP_RULES),
    strict: _joi.default.boolean().default(false),
    warnLegacyBrowsers: _joi.default.boolean().default(true)
  }).default(),
  cpu: _joi.default.object({
    cgroup: _joi.default.object({
      path: _joi.default.object({
        override: _joi.default.string().default()
      })
    })
  }),
  cpuacct: _joi.default.object({
    cgroup: _joi.default.object({
      path: _joi.default.object({
        override: _joi.default.string().default()
      })
    })
  }),
  server: _joi.default.object({
    uuid: _joi.default.string().guid().default(),
    name: _joi.default.string().default(_os.default.hostname()),
    host: _joi.default.string().hostname().default('localhost'),
    port: _joi.default.number().default(5601),
    maxPayloadBytes: _joi.default.number().default(1048576),
    autoListen: _joi.default.boolean().default(true),
    defaultRoute: _joi.default.string().default('/app/kibana').regex(/^\//, `start with a slash`),
    basePath: _joi.default.string().default('').allow('').regex(/(^$|^\/.*[^\/]$)/, `start with a slash, don't end with one`),
    rewriteBasePath: _joi.default.boolean().when('basePath', {
      is: '',
      then: _joi.default.default(false).valid(false),
      otherwise: _joi.default.default(false)
    }),
    customResponseHeaders: _joi.default.object().unknown(true).default({}),
    ssl: _joi.default.object({
      enabled: _joi.default.boolean().default(false),
      redirectHttpFromPort: _joi.default.number(),
      certificate: _joi.default.string().when('enabled', {
        is: true,
        then: _joi.default.required()
      }),
      key: _joi.default.string().when('enabled', {
        is: true,
        then: _joi.default.required()
      }),
      keyPassphrase: _joi.default.string(),
      certificateAuthorities: _joi.default.array().single().items(_joi.default.string()).default([]),
      supportedProtocols: _joi.default.array().items(_joi.default.string().valid('TLSv1', 'TLSv1.1', 'TLSv1.2')).default(['TLSv1.1', 'TLSv1.2']),
      cipherSuites: _joi.default.array().items(_joi.default.string()).default(_crypto.constants.defaultCoreCipherList.split(':'))
    }).default(),
    cors: _joi.default.when('$dev', {
      is: true,
      then: _joi.default.object().default({
        origin: ['*://localhost:9876'] // karma test server

      }),
      otherwise: _joi.default.boolean().default(false)
    }),
    xsrf: _joi.default.object({
      disableProtection: _joi.default.boolean().default(false),
      whitelist: _joi.default.array().items(_joi.default.string().regex(/^\//, 'start with a slash')).default([]),
      token: _joi.default.string().optional().notes('Deprecated')
    }).default()
  }).default(),
  uiSettings: _joi.default.object().keys({
    overrides: _joi.default.object().unknown(true).default()
  }).default(),
  logging: _joi.default.object().keys({
    silent: _joi.default.boolean().default(false),
    quiet: _joi.default.boolean().when('silent', {
      is: true,
      then: _joi.default.default(true).valid(true),
      otherwise: _joi.default.default(false)
    }),
    verbose: _joi.default.boolean().when('quiet', {
      is: true,
      then: _joi.default.valid(false).default(false),
      otherwise: _joi.default.default(false)
    }),
    events: _joi.default.any().default({}),
    dest: _joi.default.string().default('stdout'),
    filter: _joi.default.any().default({}),
    json: _joi.default.boolean().when('dest', {
      is: 'stdout',
      then: _joi.default.default(!process.stdout.isTTY),
      otherwise: _joi.default.default(true)
    }),
    timezone: _joi.default.string().allow(false).default('UTC')
  }).default(),
  ops: _joi.default.object({
    interval: _joi.default.number().default(5000)
  }).default(),
  plugins: _joi.default.object({
    paths: _joi.default.array().items(_joi.default.string()).default([]),
    scanDirs: _joi.default.array().items(_joi.default.string()).default([]),
    initialize: _joi.default.boolean().default(true)
  }).default(),
  path: _joi.default.object({
    data: _joi.default.string().default((0, _path.getData)())
  }).default(),
  migrations: _joi.default.object({
    batchSize: _joi.default.number().default(100),
    scrollDuration: _joi.default.string().default('15m'),
    pollInterval: _joi.default.number().default(1500)
  }).default(),
  stats: _joi.default.object({
    maximumWaitTimeForAllCollectorsInS: _joi.default.number().default(60)
  }).default(),
  optimize: _joi.default.object({
    enabled: _joi.default.boolean().default(true),
    bundleFilter: _joi.default.string().default('!tests'),
    bundleDir: _joi.default.string().default((0, _utils.fromRoot)('optimize/bundles')),
    viewCaching: _joi.default.boolean().default(_joi.default.ref('$prod')),
    watch: _joi.default.boolean().default(false),
    watchPort: _joi.default.number().default(5602),
    watchHost: _joi.default.string().hostname().default('localhost'),
    watchPrebuild: _joi.default.boolean().default(false),
    watchProxyTimeout: _joi.default.number().default(5 * 60000),
    useBundleCache: _joi.default.boolean().default(_joi.default.ref('$prod')),
    sourceMaps: _joi.default.when('$prod', {
      is: true,
      then: _joi.default.boolean().valid(false),
      otherwise: _joi.default.alternatives().try(_joi.default.string().required(), _joi.default.boolean()).default('#cheap-source-map')
    }),
    workers: _joi.default.number().min(1),
    profile: _joi.default.boolean().default(false)
  }).default(),
  status: _joi.default.object({
    allowAnonymous: _joi.default.boolean().default(false)
  }).default(),
  map: _joi.default.object({
    includeElasticMapsService: _joi.default.boolean().default(true),
    proxyElasticMapsServiceInMaps: _joi.default.boolean().default(false),
    tilemap: _joi.default.object({
      url: _joi.default.string(),
      options: _joi.default.object({
        attribution: _joi.default.string(),
        minZoom: _joi.default.number().min(0, 'Must be 0 or higher').default(0),
        maxZoom: _joi.default.number().default(10),
        tileSize: _joi.default.number(),
        subdomains: _joi.default.array().items(_joi.default.string()).single(),
        errorTileUrl: _joi.default.string().uri(),
        tms: _joi.default.boolean(),
        reuseTiles: _joi.default.boolean(),
        bounds: _joi.default.array().items(_joi.default.array().items(_joi.default.number()).min(2).required()).min(2),
        default: _joi.default.boolean()
      }).default({
        default: true
      })
    }).default(),
    regionmap: _joi.default.object({
      includeElasticMapsService: _joi.default.boolean().default(true),
      layers: _joi.default.array().items(_joi.default.object({
        url: _joi.default.string(),
        format: _joi.default.object({
          type: _joi.default.string().default('geojson')
        }).default({
          type: 'geojson'
        }),
        meta: _joi.default.object({
          feature_collection_path: _joi.default.string().default('data')
        }).default({
          feature_collection_path: 'data'
        }),
        attribution: _joi.default.string(),
        name: _joi.default.string(),
        fields: _joi.default.array().items(_joi.default.object({
          name: _joi.default.string(),
          description: _joi.default.string()
        }))
      })).default([])
    }).default(),
    manifestServiceUrl: _joi.default.string().default('https://catalogue.maps.elastic.co/v7.2/manifest'),
    emsLandingPageUrl: _joi.default.string().default('https://maps.elastic.co/v7.2'),
    emsTileLayerId: _joi.default.object({
      bright: _joi.default.string().default('road_map'),
      desaturated: _joi.default.string().default('road_map_desaturated'),
      dark: _joi.default.string().default('dark_map')
    }).default({
      bright: 'road_map',
      desaturated: 'road_map_desaturated',
      dark: 'dark_map'
    })
  }).default(),
  i18n: _joi.default.object({
    locale: _joi.default.string().default('en')
  }).default(),
  savedObjects: _joi.default.object({
    maxImportPayloadBytes: _joi.default.number().default(10485760),
    maxImportExportSize: _joi.default.number().default(10000)
  }).default()
}).default();

exports.default = _default;
module.exports = exports.default;