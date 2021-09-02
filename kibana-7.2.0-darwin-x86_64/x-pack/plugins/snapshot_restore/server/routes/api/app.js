"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_wrappers_1 = require("../../../../../server/lib/create_router/error_wrappers");
const constants_1 = require("../../../common/constants");
let xpackMainPlugin;
function registerAppRoutes(router, plugins) {
    xpackMainPlugin = plugins.xpack_main;
    router.get('permissions', exports.getPermissionsHandler);
}
exports.registerAppRoutes = registerAppRoutes;
function getXpackMainPlugin() {
    return xpackMainPlugin;
}
exports.getXpackMainPlugin = getXpackMainPlugin;
exports.getPermissionsHandler = async (req, callWithRequest) => {
    const xpackInfo = getXpackMainPlugin() && getXpackMainPlugin().info;
    if (!xpackInfo) {
        // xpackInfo is updated via poll, so it may not be available until polling has begun.
        // In this rare situation, tell the client the service is temporarily unavailable.
        throw error_wrappers_1.wrapCustomError(new Error('Security info unavailable'), 503);
    }
    const securityInfo = xpackInfo && xpackInfo.isAvailable() && xpackInfo.feature('security');
    if (!securityInfo || !securityInfo.isAvailable() || !securityInfo.isEnabled()) {
        // If security isn't enabled, let the user use app.
        return {
            hasPermission: true,
            missingClusterPrivileges: [],
        };
    }
    const { has_all_requested: hasPermission, cluster } = await callWithRequest('transport.request', {
        path: '/_security/user/_has_privileges',
        method: 'POST',
        body: {
            cluster: constants_1.APP_PERMISSIONS,
        },
    });
    const missingClusterPrivileges = Object.keys(cluster).reduce((permissions, permissionName) => {
        if (!cluster[permissionName]) {
            permissions.push(permissionName);
        }
        return permissions;
    }, []);
    return {
        hasPermission,
        missingClusterPrivileges,
    };
};
