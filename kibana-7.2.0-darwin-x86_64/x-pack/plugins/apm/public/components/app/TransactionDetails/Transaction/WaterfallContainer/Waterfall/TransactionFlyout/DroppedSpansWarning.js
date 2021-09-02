"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importDefault(require("react"));
const elastic_idx_1 = require("@kbn/elastic-idx");
const ElasticDocsLink_1 = require("../../../../../../shared/Links/ElasticDocsLink");
function DroppedSpansWarning({ transactionDoc }) {
    const dropped = elastic_idx_1.idx(transactionDoc, _ => _.transaction.span_count.dropped);
    if (!dropped) {
        return null;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(eui_1.EuiCallOut, { size: "s" },
            i18n_1.i18n.translate('xpack.apm.transactionDetails.transFlyout.callout.agentDroppedSpansMessage', {
                defaultMessage: 'The APM agent that reported this transaction dropped {dropped} spans or more based on its configuration.',
                values: { dropped }
            }),
            ' ',
            react_1.default.createElement(ElasticDocsLink_1.ElasticDocsLink, { section: "/apm/get-started", path: "/transaction-spans.html#dropped-spans", target: "_blank" }, i18n_1.i18n.translate('xpack.apm.transactionDetails.transFlyout.callout.learnMoreAboutDroppedSpansLinkText', {
                defaultMessage: 'Learn more about dropped spans.'
            }))),
        react_1.default.createElement(eui_1.EuiHorizontalRule, null)));
}
exports.DroppedSpansWarning = DroppedSpansWarning;
