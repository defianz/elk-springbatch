"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_theme_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_light.json"));
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const elastic_idx_1 = require("@kbn/elastic-idx");
const variables_1 = require("../../../../style/variables");
const APMLink_1 = require("../../../shared/Links/APMLink");
const url_helpers_1 = require("../../../shared/Links/url_helpers");
const LinkLabel = styled_components_1.default.span `
  font-size: ${variables_1.fontSize};
`;
exports.ErrorCountBadge = ({ errorCount = 0, transaction, verbose }) => {
    const toolTipContent = i18n_1.i18n.translate('xpack.apm.transactionDetails.errorsOverviewLinkTooltip', {
        values: { errorCount },
        defaultMessage: '{errorCount, plural, one {View 1 related error} other {View # related errors}}'
    });
    const errorCountBadge = (react_1.default.createElement(eui_1.EuiBadge, { color: eui_theme_light_json_1.default.euiColorDanger, onClick: (event) => {
            event.stopPropagation();
        }, onClickAriaLabel: toolTipContent }, errorCount));
    return (react_1.default.createElement(APMLink_1.APMLink, { path: `/${elastic_idx_1.idx(transaction, _ => _.service.name)}/errors`, query: {
            kuery: url_helpers_1.legacyEncodeURIComponent(`trace.id : "${transaction.trace.id}" and transaction.id : "${transaction.transaction.id}"`)
        }, color: "danger", style: { textDecoration: 'none' } }, verbose ? (react_1.default.createElement(react_1.Fragment, null,
        errorCountBadge,
        react_1.default.createElement(LinkLabel, null,
            "\u00A0",
            i18n_1.i18n.translate('xpack.apm.transactionDetails.errorsOverviewLink', {
                values: { errorCount },
                defaultMessage: '{errorCount, plural, one {Related error} other {Related errors}}'
            })))) : (react_1.default.createElement(eui_1.EuiToolTip, { content: toolTipContent }, errorCountBadge))));
};
