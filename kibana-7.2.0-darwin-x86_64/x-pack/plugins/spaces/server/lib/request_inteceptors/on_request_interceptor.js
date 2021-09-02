"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../common/constants");
const spaces_url_parser_1 = require("../spaces_url_parser");
function initSpacesOnRequestInterceptor(server) {
    const serverBasePath = server.config().get('server.basePath');
    server.ext('onRequest', async function spacesOnRequestHandler(request, h) {
        const path = request.path;
        // If navigating within the context of a space, then we store the Space's URL Context on the request,
        // and rewrite the request to not include the space identifier in the URL.
        const spaceId = spaces_url_parser_1.getSpaceIdFromPath(path, serverBasePath);
        if (spaceId !== constants_1.DEFAULT_SPACE_ID) {
            const reqBasePath = `/s/${spaceId}`;
            request.setBasePath(reqBasePath);
            const newLocation = path.substr(reqBasePath.length) || '/';
            const newUrl = {
                ...request.url,
                path: newLocation,
                pathname: newLocation,
                href: newLocation,
            };
            request.setUrl(newUrl);
        }
        return h.continue;
    });
}
exports.initSpacesOnRequestInterceptor = initSpacesOnRequestInterceptor;
