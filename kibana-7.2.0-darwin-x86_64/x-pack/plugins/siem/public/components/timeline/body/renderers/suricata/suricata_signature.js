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
const draggable_wrapper_1 = require("../../../../drag_and_drop/draggable_wrapper");
const helpers_1 = require("../../../../drag_and_drop/helpers");
const external_link_icon_1 = require("../../../../external_link_icon");
const links_1 = require("../../../../links");
const provider_1 = require("../../../../timeline/data_providers/provider");
const helpers_2 = require("../helpers");
const suricata_links_1 = require("./suricata_links");
const draggables_1 = require("../../../../draggables");
const data_provider_1 = require("../../../data_providers/data_provider");
exports.SURICATA_SIGNATURE_FIELD_NAME = 'suricata.eve.alert.signature';
exports.SURICATA_SIGNATURE_ID_FIELD_NAME = 'suricata.eve.alert.signature_id';
const SignatureFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  min-width: 77px;
`;
const Badge = styled_components_1.default(eui_1.EuiBadge) `
  vertical-align: top;
`;
const LinkFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-left: 6px;
`;
exports.Tokens = recompose_1.pure(({ tokens }) => (React.createElement(React.Fragment, null, tokens.map(token => (React.createElement(helpers_2.TokensFlexItem, { key: token, grow: false },
    React.createElement(eui_1.EuiBadge, { iconType: "tag", color: "hollow" }, token)))))));
exports.DraggableSignatureId = recompose_1.pure(({ id, signatureId }) => (React.createElement(SignatureFlexItem, { grow: false },
    React.createElement(draggable_wrapper_1.DraggableWrapper, { dataProvider: {
            and: [],
            enabled: true,
            id: helpers_1.escapeDataProviderId(`suricata-${id}-sig-${signatureId}`),
            name: String(signatureId),
            excluded: false,
            kqlQuery: '',
            queryMatch: {
                field: exports.SURICATA_SIGNATURE_ID_FIELD_NAME,
                value: signatureId,
                operator: data_provider_1.IS_OPERATOR,
            },
        }, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (React.createElement(draggable_wrapper_1.DragEffects, null,
            React.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (React.createElement(eui_1.EuiToolTip, { "data-test-subj": "signature-id-tooltip", content: exports.SURICATA_SIGNATURE_ID_FIELD_NAME },
            React.createElement(Badge, { iconType: "number", color: "hollow" }, signatureId))) }))));
exports.SuricataSignature = recompose_1.pure(({ contextId, id, signature, signatureId }) => {
    const tokens = suricata_links_1.getBeginningTokens(signature);
    return (React.createElement(eui_1.EuiFlexGroup, { justifyContent: "center", gutterSize: "none", wrap: true },
        React.createElement(exports.DraggableSignatureId, { id: id, signatureId: signatureId }),
        React.createElement(exports.Tokens, { tokens: tokens }),
        React.createElement(LinkFlexItem, { grow: false },
            React.createElement(draggables_1.DefaultDraggable, { "data-test-subj": "draggable-signature-link", field: exports.SURICATA_SIGNATURE_FIELD_NAME, id: `${contextId}-${id}-${exports.SURICATA_SIGNATURE_FIELD_NAME}`, name: name, value: signature },
                React.createElement("div", null,
                    React.createElement(links_1.GoogleLink, { link: signature }, signature
                        .split(' ')
                        .splice(tokens.length)
                        .join(' ')),
                    React.createElement(external_link_icon_1.ExternalLinkIcon, null))))));
});
