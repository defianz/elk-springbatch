"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const react_2 = require("@kbn/i18n/react");
const version_1 = require("../../../../common/version");
const error_banner_1 = require("../../error_banner");
const types_1 = require("../../types");
const controls_1 = require("./controls");
const grouped_1 = require("./deprecations/grouped");
/**
 * Displays a list of deprecations that filterable and groupable. Can be used for cluster,
 * nodes, or indices checkups.
 */
class CheckupTab extends types_1.UpgradeAssistantTabComponent {
    constructor(props) {
        super(props);
        this.changeFilter = (filter) => {
            this.setState({ currentFilter: filter });
        };
        this.changeSearch = (search) => {
            this.setState({ search });
        };
        this.changeGroupBy = (groupBy) => {
            this.setState({ currentGroupBy: groupBy });
        };
        this.state = {
            // initialize to all filters
            currentFilter: types_1.LevelFilterOption.all,
            search: '',
            currentGroupBy: types_1.GroupByOption.message,
        };
    }
    render() {
        const { alertBanner, checkupLabel, deprecations, loadingError, loadingState, refreshCheckupData, setSelectedTabIndex, showBackupWarning = false, } = this.props;
        const { currentFilter, search, currentGroupBy } = this.state;
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiText, { grow: false },
                react_1.default.createElement("p", null,
                    react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.checkupTab.tabDetail", defaultMessage: "These {strongCheckupLabel} issues need your attention. Resolve them before upgrading to Elasticsearch {nextEsVersion}.", values: {
                            strongCheckupLabel: react_1.default.createElement("strong", null, checkupLabel),
                            nextEsVersion: `${version_1.NEXT_MAJOR_VERSION}.x`,
                        } }))),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            alertBanner && (react_1.default.createElement(react_1.Fragment, null,
                alertBanner,
                react_1.default.createElement(eui_1.EuiSpacer, null))),
            showBackupWarning && (react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(eui_1.EuiCallOut, { title: react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.checkupTab.backUpCallout.calloutTitle", defaultMessage: "Back up your indices now" }), color: "warning", iconType: "help" },
                    react_1.default.createElement("p", null,
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.checkupTab.backUpCallout.calloutBody.calloutDetail", defaultMessage: "Back up your data using the {snapshotRestoreDocsButton}.", values: {
                                snapshotRestoreDocsButton: (react_1.default.createElement(eui_1.EuiLink, { href: "https://www.elastic.co/guide/en/elasticsearch/reference/7.0/modules-snapshots.html", target: "_blank" },
                                    react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.checkupTab.backUpCallout.calloutBody.snapshotRestoreDocsButtonLabel", defaultMessage: "snapshot and restore APIs" }))),
                            } }))),
                react_1.default.createElement(eui_1.EuiSpacer, null))),
            react_1.default.createElement(eui_1.EuiPageContent, null,
                react_1.default.createElement(eui_1.EuiPageContentBody, null, loadingState === types_1.LoadingState.Error ? (react_1.default.createElement(error_banner_1.LoadingErrorBanner, { loadingError: loadingError })) : deprecations && deprecations.length > 0 ? (react_1.default.createElement(react_1.Fragment, null,
                    react_1.default.createElement(controls_1.CheckupControls, { allDeprecations: deprecations, loadingState: loadingState, loadData: refreshCheckupData, currentFilter: currentFilter, onFilterChange: this.changeFilter, search: search, onSearchChange: this.changeSearch, availableGroupByOptions: this.availableGroupByOptions(), currentGroupBy: currentGroupBy, onGroupByChange: this.changeGroupBy }),
                    react_1.default.createElement(eui_1.EuiSpacer, null),
                    this.renderCheckupData())) : (react_1.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "faceHappy", title: react_1.default.createElement("h2", null,
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.checkupTab.noIssues.noIssuesTitle", defaultMessage: "All clear!" })), body: react_1.default.createElement(react_1.Fragment, null,
                        react_1.default.createElement("p", { "data-test-subj": "upgradeAssistantIssueSummary" },
                            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.checkupTab.noIssues.noIssuesLabel", defaultMessage: "You have no {strongCheckupLabel} issues.", values: {
                                    strongCheckupLabel: react_1.default.createElement("strong", null, checkupLabel),
                                } })),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.checkupTab.noIssues.nextStepsDetail", defaultMessage: "Check the {overviewTabButton} for next steps.", values: {
                                    overviewTabButton: (react_1.default.createElement(eui_1.EuiLink, { onClick: () => setSelectedTabIndex(0) },
                                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.checkupTab.noIssues.nextStepsDetail.overviewTabButtonLabel", defaultMessage: "Overview tab" }))),
                                } }))) }))))));
    }
    availableGroupByOptions() {
        const { deprecations } = this.props;
        if (!deprecations) {
            return [];
        }
        return Object.keys(types_1.GroupByOption).filter(opt => lodash_1.find(deprecations, opt));
    }
    renderCheckupData() {
        const { deprecations } = this.props;
        const { currentFilter, currentGroupBy, search } = this.state;
        return (react_1.default.createElement(grouped_1.GroupedDeprecations, { currentGroupBy: currentGroupBy, currentFilter: currentFilter, search: search, allDeprecations: deprecations }));
    }
}
exports.CheckupTab = CheckupTab;
