"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const row_renderer_1 = require("../row_renderer");
const helpers_1 = require("../helpers");
const suricata_details_1 = require("./suricata_details");
exports.suricataRowRenderer = {
    isInstance: ecs => {
        const module = fp_1.get('event.module[0]', ecs);
        return module != null && module.toLowerCase() === 'suricata';
    },
    renderRow: ({ browserFields, data, width, children }) => {
        return (react_1.default.createElement(helpers_1.Row, null,
            children,
            react_1.default.createElement(row_renderer_1.RowRendererContainer, { width: width },
                react_1.default.createElement(suricata_details_1.SuricataDetails, { data: data, browserFields: browserFields }))));
    },
};
