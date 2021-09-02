"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const saved_objects_client_1 = require("../helpers/saved_objects_client");
const index_pattern_json_1 = tslib_1.__importDefault(require("../../../../../../src/legacy/core_plugins/kibana/server/tutorials/apm/index_pattern.json"));
async function getIndexPattern(core) {
    const { server } = core.http;
    const config = server.config();
    const apmIndexPatternTitle = config.get('apm_oss.indexPattern');
    const savedObjectsClient = saved_objects_client_1.getSavedObjectsClient(server);
    try {
        return await savedObjectsClient.get('index-pattern', index_pattern_json_1.default.id);
    }
    catch (error) {
        // if GET fails, then create a new index pattern saved object
        return await savedObjectsClient.create('index-pattern', {
            ...index_pattern_json_1.default.attributes,
            title: apmIndexPatternTitle
        }, { id: index_pattern_json_1.default.id, overwrite: false });
    }
}
exports.getIndexPattern = getIndexPattern;
