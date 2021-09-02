"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const ip_1 = require("../ip");
const port_1 = require("../port");
const IpPortSeparator = styled_components_1.default.span `
  margin: 0 3px;
`;
/**
 * Renders a separator (i.e. `:`) and a draggable, hyperlinked port when
 * a port is specified
 */
const PortWithSeparator = recompose_1.pure(({ contextId, eventId, port, portFieldName }) => {
    return port != null ? (React.createElement(eui_1.EuiFlexGroup, { gutterSize: "none" },
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(IpPortSeparator, { "data-test-subj": "ip-port-separator" }, ':')),
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(port_1.Port, { contextId: contextId, "data-test-subj": "port", eventId: eventId, fieldName: portFieldName, value: port })))) : null;
});
/**
 * Renders a draggable, hyperlinked IP address, and if provided, an associated
 * draggable, hyperlinked port (with a separator between the IP address and port)
 */
exports.IpWithPort = recompose_1.pure(({ contextId, eventId, ip, ipFieldName, port, portFieldName }) => {
    return (React.createElement(eui_1.EuiFlexGroup, { gutterSize: "none" },
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(ip_1.Ip, { contextId: contextId, "data-test-subj": "ip", eventId: eventId, fieldName: ipFieldName, value: ip })),
        React.createElement(eui_1.EuiFlexItem, null,
            React.createElement(PortWithSeparator, { contextId: contextId, eventId: eventId, port: port, portFieldName: portFieldName }))));
});
