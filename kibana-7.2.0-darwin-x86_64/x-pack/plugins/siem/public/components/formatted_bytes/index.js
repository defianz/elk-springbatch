"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_1 = require("react");
const numeral_1 = tslib_1.__importDefault(require("@elastic/numeral"));
const kibana_framework_adapter_1 = require("../../lib/adapters/framework/kibana_framework_adapter");
exports.PreferenceFormattedBytes = React.memo(({ value }) => {
    const config = react_1.useContext(kibana_framework_adapter_1.KibanaConfigContext);
    return (React.createElement(React.Fragment, null, config.bytesFormat
        ? numeral_1.default(value).format(config.bytesFormat)
        : numeral_1.default(value).format('0,0.[000]b')));
});
