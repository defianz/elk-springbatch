"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const components_1 = require("../../../../components");
const index_1 = require("../../../../index");
const constants_1 = require("../../../../constants");
const http_1 = require("../../../../services/http");
const navigation_1 = require("../../../../services/navigation");
const ui_metric_1 = require("../../../../services/ui_metric");
const tabs_1 = require("./tabs");
const TAB_SUMMARY = 'summary';
const TAB_FAILURES = 'failures';
const panelTypeToUiMetricMap = {
    [TAB_SUMMARY]: constants_1.UIM_SNAPSHOT_DETAIL_PANEL_SUMMARY_TAB,
    [TAB_FAILURES]: constants_1.UIM_SNAPSHOT_DETAIL_PANEL_FAILED_INDICES_TAB,
};
const SnapshotDetailsUi = ({ repositoryName, snapshotId, onClose, }) => {
    const { core: { i18n }, } = index_1.useAppDependencies();
    const { FormattedMessage } = i18n;
    const { trackUiMetric } = ui_metric_1.uiMetricService;
    const { error, data: snapshotDetails } = http_1.loadSnapshot(repositoryName, snapshotId);
    const [activeTab, setActiveTab] = react_1.useState(TAB_SUMMARY);
    // Reset tab when we look at a different snapshot.
    react_1.useEffect(() => {
        setActiveTab(TAB_SUMMARY);
    }, [repositoryName, snapshotId]);
    let tabs;
    let content;
    if (snapshotDetails) {
        const { indexFailures, state: snapshotState } = snapshotDetails;
        const tabOptions = [
            {
                id: TAB_SUMMARY,
                name: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.summaryTabTitle", defaultMessage: "Summary" })),
                testSubj: 'srSnapshotDetailsSummaryTab',
            },
            {
                id: TAB_FAILURES,
                name: (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.failuresTabTitle", defaultMessage: "Failed indices ({failuresCount})", values: { failuresCount: indexFailures.length } })),
                testSubj: 'srSnapshotDetailsFailuresTab',
            },
        ];
        tabs = (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(eui_1.EuiTabs, null, tabOptions.map(tab => (react_1.default.createElement(eui_1.EuiTab, { onClick: () => {
                    trackUiMetric(panelTypeToUiMetricMap[tab.id]);
                    setActiveTab(tab.id);
                }, isSelected: tab.id === activeTab, key: tab.id, "data-test-subject": tab.testSubj }, tab.name))))));
        if (activeTab === TAB_SUMMARY) {
            content = react_1.default.createElement(tabs_1.TabSummary, { snapshotDetails: snapshotDetails });
        }
        else if (activeTab === TAB_FAILURES) {
            content = react_1.default.createElement(tabs_1.TabFailures, { snapshotState: snapshotState, indexFailures: indexFailures });
        }
    }
    else if (error) {
        const notFound = error.status === 404;
        const errorObject = notFound
            ? {
                data: {
                    error: i18n.translate('xpack.snapshotRestore.snapshotDetails.errorSnapshotNotFound', {
                        defaultMessage: `Either the snapshot '{snapshotId}' doesn't exist in the repository '{repositoryName}' or the repository doesn't exist.`,
                        values: {
                            snapshotId,
                            repositoryName,
                        },
                    }),
                },
            }
            : error;
        content = (react_1.default.createElement(components_1.SectionError, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.errorLoadingRepositoryTitle", defaultMessage: "Error loading repository" }), error: errorObject }));
    }
    else {
        // Assume the content is loading.
        content = (react_1.default.createElement(components_1.SectionLoading, null,
            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.loadingSnapshotDescription", defaultMessage: "Loading snapshot\u2026" })));
    }
    const renderFooter = () => {
        return (react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween", alignItems: "center" },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(eui_1.EuiButtonEmpty, { iconType: "cross", flush: "left", onClick: onClose, "data-test-subj": "srSnapshotDetailsFlyoutCloseButton" },
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.closeButtonLabel", defaultMessage: "Close" })))));
    };
    return (react_1.default.createElement(eui_1.EuiFlyout, { onClose: onClose, "data-test-subj": "srSnapshotDetailsFlyout", "aria-labelledby": "srSnapshotDetailsFlyoutTitle", size: "m", maxWidth: 400 },
        react_1.default.createElement(eui_1.EuiFlyoutHeader, null,
            react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "column", gutterSize: "none" },
                react_1.default.createElement(eui_1.EuiFlexItem, null,
                    react_1.default.createElement(eui_1.EuiTitle, { size: "m" },
                        react_1.default.createElement("h2", { id: "srSnapshotDetailsFlyoutTitle", "data-test-subj": "srSnapshotDetailsFlyoutTitle" }, snapshotId))),
                react_1.default.createElement(eui_1.EuiFlexItem, null,
                    react_1.default.createElement(eui_1.EuiText, { size: "s" },
                        react_1.default.createElement("p", null,
                            react_1.default.createElement(eui_1.EuiLink, { href: navigation_1.linkToRepository(repositoryName) },
                                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.snapshotDetails.repositoryTitle", defaultMessage: "'{repositoryName}' repository", values: { repositoryName } })))))),
            tabs),
        react_1.default.createElement(eui_1.EuiFlyoutBody, { "data-test-subj": "srSnapshotDetailsContent" }, content),
        react_1.default.createElement(eui_1.EuiFlyoutFooter, null, renderFooter())));
};
exports.SnapshotDetails = react_router_dom_1.withRouter(SnapshotDetailsUi);
