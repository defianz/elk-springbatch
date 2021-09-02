"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isEqual_1 = tslib_1.__importDefault(require("lodash/fp/isEqual"));
const react_1 = tslib_1.__importDefault(require("react"));
class ExternalHeader extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.setBadge = () => {
            this.props.setBadge(this.props.badge);
        };
        this.setBreadcrumbs = () => {
            this.props.setBreadcrumbs(this.props.breadcrumbs || []);
        };
    }
    componentDidMount() {
        this.setBreadcrumbs();
        this.setBadge();
    }
    componentDidUpdate(prevProps) {
        if (!isEqual_1.default(this.props.breadcrumbs, prevProps.breadcrumbs)) {
            this.setBreadcrumbs();
        }
        if (!isEqual_1.default(this.props.badge, prevProps.badge)) {
            this.setBadge();
        }
    }
    render() {
        return null;
    }
}
exports.ExternalHeader = ExternalHeader;
