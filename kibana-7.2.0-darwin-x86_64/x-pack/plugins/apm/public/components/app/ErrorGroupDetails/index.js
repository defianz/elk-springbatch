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
const i18n_2 = require("../../../../common/i18n");
const useFetcher_1 = require("../../../hooks/useFetcher");
const error_groups_1 = require("../../../services/rest/apm/error_groups");
const variables_1 = require("../../../style/variables");
const ApmHeader_1 = require("../../shared/ApmHeader");
const DetailView_1 = require("./DetailView");
const Distribution_1 = require("./Distribution");
const useLocation_1 = require("../../../hooks/useLocation");
const useUrlParams_1 = require("../../../hooks/useUrlParams");
const Titles = styled_components_1.default.div `
  margin-bottom: ${variables_1.px(variables_1.units.plus)};
`;
const Label = styled_components_1.default.div `
  margin-bottom: ${variables_1.px(variables_1.units.quarter)};
  font-size: ${variables_1.fontSizes.small};
  color: ${eui_theme_light_json_1.default.euiColorMediumShade};
`;
const Message = styled_components_1.default.div `
  font-family: ${variables_1.fontFamilyCode};
  font-weight: bold;
  font-size: ${variables_1.fontSizes.large};
  margin-bottom: ${variables_1.px(variables_1.units.half)};
`;
const Culprit = styled_components_1.default.div `
  font-family: ${variables_1.fontFamilyCode};
`;
function getShortGroupId(errorGroupId) {
    if (!errorGroupId) {
        return i18n_2.NOT_AVAILABLE_LABEL;
    }
    return errorGroupId.slice(0, 5);
}
function ErrorGroupDetails() {
    const location = useLocation_1.useLocation();
    const { urlParams, uiFilters } = useUrlParams_1.useUrlParams();
    const { serviceName, start, end, errorGroupId } = urlParams;
    const { data: errorGroupData } = useFetcher_1.useFetcher(() => {
        if (serviceName && start && end && errorGroupId) {
            return error_groups_1.loadErrorGroupDetails({
                serviceName,
                start,
                end,
                errorGroupId,
                uiFilters
            });
        }
    }, [serviceName, start, end, errorGroupId, uiFilters]);
    const { data: errorDistributionData } = useFetcher_1.useFetcher(() => {
        if (serviceName && start && end && errorGroupId) {
            return error_groups_1.loadErrorDistribution({
                serviceName,
                start,
                end,
                errorGroupId,
                uiFilters
            });
        }
    }, [serviceName, start, end, errorGroupId, uiFilters]);
    if (!errorGroupData || !errorDistributionData) {
        return null;
    }
    // If there are 0 occurrences, show only distribution chart w. empty message
    const showDetails = errorGroupData.occurrencesCount !== 0;
    const logMessage = elastic_idx_1.idx(errorGroupData, _ => _.error.error.log.message);
    const excMessage = elastic_idx_1.idx(errorGroupData, _ => _.error.error.exception[0].message);
    const culprit = elastic_idx_1.idx(errorGroupData, _ => _.error.error.culprit);
    const isUnhandled = elastic_idx_1.idx(errorGroupData, _ => _.error.error.exception[0].handled) === false;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(ApmHeader_1.ApmHeader, null,
            react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center" },
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiTitle, null,
                        react_1.default.createElement("h1", null, i18n_1.i18n.translate('xpack.apm.errorGroupDetails.errorGroupTitle', {
                            defaultMessage: 'Error group {errorGroupId}',
                            values: {
                                errorGroupId: getShortGroupId(urlParams.errorGroupId)
                            }
                        })))),
                isUnhandled && (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiBadge, { color: "warning" }, i18n_1.i18n.translate('xpack.apm.errorGroupDetails.unhandledLabel', {
                        defaultMessage: 'Unhandled'
                    })))))),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        react_1.default.createElement(eui_1.EuiPanel, null,
            showDetails && (react_1.default.createElement(Titles, null,
                react_1.default.createElement(eui_1.EuiText, null,
                    logMessage && (react_1.default.createElement(react_1.Fragment, null,
                        react_1.default.createElement(Label, null, i18n_1.i18n.translate('xpack.apm.errorGroupDetails.logMessageLabel', {
                            defaultMessage: 'Log message'
                        })),
                        react_1.default.createElement(Message, null, logMessage))),
                    react_1.default.createElement(Label, null, i18n_1.i18n.translate('xpack.apm.errorGroupDetails.exceptionMessageLabel', {
                        defaultMessage: 'Exception message'
                    })),
                    react_1.default.createElement(Message, null, excMessage || i18n_2.NOT_AVAILABLE_LABEL),
                    react_1.default.createElement(Label, null, i18n_1.i18n.translate('xpack.apm.errorGroupDetails.culpritLabel', {
                        defaultMessage: 'Culprit'
                    })),
                    react_1.default.createElement(Culprit, null, culprit || i18n_2.NOT_AVAILABLE_LABEL)))),
            react_1.default.createElement(Distribution_1.ErrorDistribution, { distribution: errorDistributionData, title: i18n_1.i18n.translate('xpack.apm.errorGroupDetails.occurrencesChartLabel', {
                    defaultMessage: 'Occurrences'
                }) })),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        showDetails && (react_1.default.createElement(DetailView_1.DetailView, { errorGroup: errorGroupData, urlParams: urlParams, location: location }))));
}
exports.ErrorGroupDetails = ErrorGroupDetails;
