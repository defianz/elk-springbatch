"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const netflow_1 = require("../netflow");
const suricata_signature_1 = require("./suricata_signature");
const suricata_refs_1 = require("./suricata_refs");
const Details = styled_components_1.default.div `
  margin: 10px 0;
`;
exports.SuricataDetails = recompose_1.pure(({ data }) => {
    const signature = fp_1.get('suricata.eve.alert.signature[0]', data);
    const signatureId = fp_1.get('suricata.eve.alert.signature_id[0]', data);
    if (signatureId != null && signature != null) {
        return (React.createElement(Details, null,
            React.createElement(suricata_signature_1.SuricataSignature, { contextId: "test", id: data._id, signature: signature, signatureId: signatureId }),
            React.createElement(suricata_refs_1.SuricataRefs, { signatureId: signatureId }),
            React.createElement(eui_1.EuiSpacer, { size: "s" }),
            React.createElement(netflow_1.NetflowRenderer, { data: data })));
    }
    else {
        return null;
    }
});
