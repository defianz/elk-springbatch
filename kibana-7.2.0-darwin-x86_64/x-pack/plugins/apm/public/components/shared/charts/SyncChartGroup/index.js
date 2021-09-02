"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const url_helpers_1 = require("../../Links/url_helpers");
const history_1 = require("../../../../utils/history");
class SyncChartGroup extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = { hoverX: null };
        this.onHover = hoverX => this.setState({ hoverX });
        this.onMouseLeave = () => this.setState({ hoverX: null });
        this.onSelectionEnd = range => {
            this.setState({ hoverX: null });
            const currentSearch = url_helpers_1.toQuery(history_1.history.location.search);
            const nextSearch = {
                rangeFrom: new Date(range.start).toISOString(),
                rangeTo: new Date(range.end).toISOString()
            };
            history_1.history.push({
                ...history_1.history.location,
                search: url_helpers_1.fromQuery({
                    ...currentSearch,
                    ...nextSearch
                })
            });
        };
    }
    render() {
        return this.props.render({
            onHover: this.onHover,
            onMouseLeave: this.onMouseLeave,
            onSelectionEnd: this.onSelectionEnd,
            hoverX: this.state.hoverX
        });
    }
}
exports.SyncChartGroup = SyncChartGroup;
