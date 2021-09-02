"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const repositories_1 = require("./repositories");
const snapshots_1 = require("./snapshots");
exports.registerRoutes = (router, plugins) => {
    app_1.registerAppRoutes(router, plugins);
    repositories_1.registerRepositoriesRoutes(router, plugins);
    snapshots_1.registerSnapshotsRoutes(router);
};
