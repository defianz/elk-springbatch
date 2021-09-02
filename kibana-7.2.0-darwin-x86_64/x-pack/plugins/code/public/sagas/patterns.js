"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const actions_1 = require("../actions");
const types_1 = require("../common/types");
const ROUTES = tslib_1.__importStar(require("../components/routes"));
exports.generatePattern = (path) => (action) => action.type === String(actions_1.routeChange) && action.payload.path === path;
exports.rootRoutePattern = exports.generatePattern(ROUTES.ROOT);
exports.setupRoutePattern = exports.generatePattern(ROUTES.SETUP);
exports.adminRoutePattern = exports.generatePattern(ROUTES.ADMIN);
exports.repoRoutePattern = exports.generatePattern(ROUTES.REPO);
exports.mainRoutePattern = (action) => action.type === String(actions_1.routeChange) &&
    (ROUTES.MAIN === action.payload.path || ROUTES.MAIN_ROOT === action.payload.path);
exports.searchRoutePattern = exports.generatePattern(ROUTES.SEARCH);
exports.commitRoutePattern = exports.generatePattern(ROUTES.DIFF);
exports.sourceFilePattern = (action) => exports.mainRoutePattern(action) && action.payload.params.pathType === types_1.PathTypes.blob;
exports.blamePattern = (action) => exports.mainRoutePattern(action) && action.payload.params.pathType === types_1.PathTypes.blame;
