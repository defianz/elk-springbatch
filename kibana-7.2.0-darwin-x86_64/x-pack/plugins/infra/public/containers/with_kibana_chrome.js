"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
class WithKibanaChrome extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            basePath: chrome_1.default.getBasePath(),
        };
    }
    render() {
        return this.props.children({
            ...this.state,
            setBreadcrumbs: chrome_1.default.breadcrumbs.set,
            setBadge: chrome_1.default.badge.set,
        });
    }
}
exports.WithKibanaChrome = WithKibanaChrome;
