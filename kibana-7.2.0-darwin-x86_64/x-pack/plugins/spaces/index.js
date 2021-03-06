"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
// @ts-ignore
const audit_logger_1 = require("../../server/lib/audit_logger");
// @ts-ignore
const watch_status_and_license_to_initialize_1 = require("../../server/lib/watch_status_and_license_to_initialize");
const mappings_json_1 = tslib_1.__importDefault(require("./mappings.json"));
const audit_logger_2 = require("./server/lib/audit_logger");
const check_license_1 = require("./server/lib/check_license");
const create_default_space_1 = require("./server/lib/create_default_space");
const create_spaces_service_1 = require("./server/lib/create_spaces_service");
const errors_1 = require("./server/lib/errors");
const get_active_space_1 = require("./server/lib/get_active_space");
const get_space_selector_url_1 = require("./server/lib/get_space_selector_url");
const get_spaces_usage_collector_1 = require("./server/lib/get_spaces_usage_collector");
const migrations_1 = require("./server/lib/migrations");
const request_inteceptors_1 = require("./server/lib/request_inteceptors");
const saved_objects_client_wrapper_factory_1 = require("./server/lib/saved_objects_client/saved_objects_client_wrapper_factory");
const spaces_client_1 = require("./server/lib/spaces_client");
const spaces_tutorial_context_factory_1 = require("./server/lib/spaces_tutorial_context_factory");
const toggle_ui_capabilities_1 = require("./server/lib/toggle_ui_capabilities");
const public_1 = require("./server/routes/api/public");
const v1_1 = require("./server/routes/api/v1");
exports.spaces = (kibana) => new kibana.Plugin({
    id: 'spaces',
    configPrefix: 'xpack.spaces',
    publicDir: path_1.resolve(__dirname, 'public'),
    require: ['kibana', 'elasticsearch', 'xpack_main'],
    config(Joi) {
        return Joi.object({
            enabled: Joi.boolean().default(true),
            maxSpaces: Joi.number().default(1000),
        }).default();
    },
    uiCapabilities() {
        return {
            spaces: {
                manage: true,
            },
        };
    },
    uiExports: {
        chromeNavControls: ['plugins/spaces/views/nav_control'],
        styleSheetPaths: path_1.resolve(__dirname, 'public/index.scss'),
        managementSections: ['plugins/spaces/views/management'],
        apps: [
            {
                id: 'space_selector',
                title: 'Spaces',
                main: 'plugins/spaces/views/space_selector',
                url: 'space_selector',
                hidden: true,
            },
        ],
        hacks: [],
        mappings: mappings_json_1.default,
        migrations: {
            space: {
                '6.6.0': migrations_1.migrateToKibana660,
            },
        },
        savedObjectSchemas: {
            space: {
                isNamespaceAgnostic: true,
            },
        },
        home: ['plugins/spaces/register_feature'],
        injectDefaultVars(server) {
            return {
                spaces: [],
                activeSpace: null,
                spaceSelectorURL: get_space_selector_url_1.getSpaceSelectorUrl(server.config()),
            };
        },
        async replaceInjectedVars(vars, request, server) {
            const spacesClient = server.plugins.spaces.spacesClient.getScopedClient(request);
            try {
                vars.activeSpace = {
                    valid: true,
                    space: await get_active_space_1.getActiveSpace(spacesClient, request.getBasePath(), server.config().get('server.basePath')),
                };
            }
            catch (e) {
                vars.activeSpace = {
                    valid: false,
                    error: errors_1.wrapError(e).output.payload,
                };
            }
            return vars;
        },
    },
    async init(server) {
        const thisPlugin = this;
        const xpackMainPlugin = server.plugins.xpack_main;
        watch_status_and_license_to_initialize_1.watchStatusAndLicenseToInitialize(xpackMainPlugin, thisPlugin, async () => {
            await create_default_space_1.createDefaultSpace(server);
        });
        // Register a function that is called whenever the xpack info changes,
        // to re-compute the license check results for this plugin.
        xpackMainPlugin.info
            .feature(thisPlugin.id)
            .registerLicenseCheckResultsGenerator(check_license_1.checkLicense);
        const spacesService = create_spaces_service_1.createSpacesService(server);
        server.expose('getSpaceId', (request) => spacesService.getSpaceId(request));
        const config = server.config();
        const spacesAuditLogger = new audit_logger_2.SpacesAuditLogger(new audit_logger_1.AuditLogger(server, 'spaces', config, xpackMainPlugin.info));
        server.expose('spacesClient', {
            getScopedClient: (request) => {
                const adminCluster = server.plugins.elasticsearch.getCluster('admin');
                const { callWithRequest, callWithInternalUser } = adminCluster;
                const callCluster = callWithRequest.bind(adminCluster, request);
                const { savedObjects } = server;
                const internalRepository = savedObjects.getSavedObjectsRepository(callWithInternalUser);
                const callWithRequestRepository = savedObjects.getSavedObjectsRepository(callCluster);
                const authorization = server.plugins.security
                    ? server.plugins.security.authorization
                    : null;
                return new spaces_client_1.SpacesClient(spacesAuditLogger, (message) => {
                    server.log(['spaces', 'debug'], message);
                }, authorization, callWithRequestRepository, server.config(), internalRepository, request);
            },
        });
        const { addScopedSavedObjectsClientWrapperFactory, types, } = server.savedObjects;
        addScopedSavedObjectsClientWrapperFactory(Number.MAX_SAFE_INTEGER - 1, saved_objects_client_wrapper_factory_1.spacesSavedObjectsClientWrapperFactory(spacesService, types));
        server.addScopedTutorialContextFactory(spaces_tutorial_context_factory_1.createSpacesTutorialContextFactory(spacesService));
        v1_1.initPrivateApis(server);
        public_1.initPublicSpacesApi(server);
        request_inteceptors_1.initSpacesRequestInterceptors(server);
        // Register a function with server to manage the collection of usage stats
        server.usage.collectorSet.register(get_spaces_usage_collector_1.getSpacesUsageCollector(server));
        server.registerCapabilitiesModifier(async (request, uiCapabilities) => {
            const spacesClient = server.plugins.spaces.spacesClient.getScopedClient(request);
            try {
                const activeSpace = await get_active_space_1.getActiveSpace(spacesClient, request.getBasePath(), server.config().get('server.basePath'));
                const features = server.plugins.xpack_main.getFeatures();
                return toggle_ui_capabilities_1.toggleUICapabilities(features, uiCapabilities, activeSpace);
            }
            catch (e) {
                return uiCapabilities;
            }
        });
    },
});
