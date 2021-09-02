"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const draggables_1 = require("../../../../draggables");
const helpers_1 = require("../helpers");
exports.Package = recompose_1.pure(({ contextId, eventId, packageName, packageSummary, packageVersion }) => {
    if (packageName != null || packageSummary != null || packageVersion != null) {
        return (React.createElement(React.Fragment, null,
            React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" },
                React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "system.audit.package.name", value: packageName, iconType: "document" })),
            React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" },
                React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "system.audit.package.version", value: packageVersion, iconType: "document" })),
            React.createElement(helpers_1.TokensFlexItem, { grow: false, component: "span" },
                React.createElement(draggables_1.DraggableBadge, { contextId: contextId, eventId: eventId, field: "system.audit.package.summary", value: packageSummary }))));
    }
    else {
        return null;
    }
});
