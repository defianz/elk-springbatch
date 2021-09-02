"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const lodash_1 = require("lodash");
const eui_2 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const DottedKeyValueTable_1 = require("../DottedKeyValueTable");
const ElasticDocsLink_1 = require("../../shared/Links/ElasticDocsLink");
function MetadataTable({ item, sections }) {
    const filteredSections = sections.filter(({ key, required }) => required || lodash_1.has(item, key));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "flexEnd" },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(ElasticDocsLink_1.ElasticDocsLink, { section: "/apm/get-started", path: "/metadata.html" },
                    react_1.default.createElement(eui_2.EuiText, { size: "s" },
                        react_1.default.createElement(eui_1.EuiIcon, { type: "help" }),
                        " How to add labels and other data")))),
        filteredSections.map(section => (react_1.default.createElement("div", { key: section.key },
            react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                react_1.default.createElement("h6", null, section.label)),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(Section, { propData: lodash_1.get(item, section.key), propKey: section.key }),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "xl" }))))));
}
exports.MetadataTable = MetadataTable;
function Section({ propData, propKey }) {
    return (react_1.default.createElement(react_1.default.Fragment, null, propData ? (react_1.default.createElement(DottedKeyValueTable_1.DottedKeyValueTable, { data: propData, parentKey: propKey, maxDepth: 5 })) : (react_1.default.createElement(eui_2.EuiText, { size: "s" }, i18n_1.i18n.translate('xpack.apm.propertiesTable.agentFeature.noDataAvailableLabel', { defaultMessage: 'No data available' })))));
}
