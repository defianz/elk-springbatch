"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_2 = require("@kbn/i18n/react");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const version_1 = require("../../../../common/version");
const deprecation_logging_toggle_1 = require("./deprecation_logging_toggle");
// Leaving these here even if unused so they are picked up for i18n static analysis
// Keep this until last minor release (when next major is also released).
const WAIT_FOR_RELEASE_STEP = {
    title: i18n_1.i18n.translate('xpack.upgradeAssistant.overviewTab.steps.waitForReleaseStep.stepTitle', {
        defaultMessage: 'Wait for the Elasticsearch {nextEsVersion} release',
        values: {
            nextEsVersion: `${version_1.NEXT_MAJOR_VERSION}.0`,
        },
    }),
    children: (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiText, { grow: false },
            react_1.default.createElement("p", null,
                react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.waitForReleaseStep.stepDetail", defaultMessage: "Once the release is out, upgrade to the latest {currentEsMajorVersion} version, and then\n              return here to proceed with your {nextEsMajorVersion} upgrade.", values: {
                        currentEsMajorVersion: `${version_1.CURRENT_MAJOR_VERSION}.x`,
                        nextEsMajorVersion: `${version_1.NEXT_MAJOR_VERSION}.0`,
                    } }))))),
};
// Swap in this step for the one above it on the last minor release.
// @ts-ignore
const START_UPGRADE_STEP = {
    title: i18n_1.i18n.translate('xpack.upgradeAssistant.overviewTab.steps.startUpgradeStep.stepTitle', {
        defaultMessage: 'Start your upgrade',
    }),
    children: (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiText, { grow: false },
            react_1.default.createElement("p", null, chrome_1.default.getInjected('isCloudEnabled', false) ? (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.startUpgradeStepCloud.stepDetail.goToCloudDashboardDetail", defaultMessage: "Go to the Deployments section on the Elastic Cloud dashboard to start your upgrade." })) : (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.startUpgradeStepOnPrem.stepDetail.followInstructionsDetail", defaultMessage: "Follow {instructionButton} to start your upgrade.", values: {
                    instructionButton: (react_1.default.createElement(eui_1.EuiLink, { href: "https://www.elastic.co/guide/en/elasticsearch/reference/7.0/setup-upgrade.html", target: "_blank" },
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.startUpgradeStepOnPrem.stepDetail.instructionButtonLabel", defaultMessage: "these instructions" }))),
                } })))))),
};
exports.StepsUI = ({ checkupData, setSelectedTabIndex, intl }) => {
    const checkupDataTyped = checkupData;
    const countByType = Object.keys(checkupDataTyped).reduce((counts, checkupType) => {
        counts[checkupType] = checkupDataTyped[checkupType].length;
        return counts;
    }, {});
    return (react_1.default.createElement(eui_1.EuiSteps, { className: "upgSteps", headingElement: "h2", steps: [
            {
                title: countByType.cluster
                    ? intl.formatMessage({
                        id: 'xpack.upgradeAssistant.overviewTab.steps.clusterStep.issuesRemainingStepTitle',
                        defaultMessage: 'Check for issues with your cluster',
                    })
                    : intl.formatMessage({
                        id: 'xpack.upgradeAssistant.overviewTab.steps.clusterStep.noIssuesRemainingStepTitle',
                        defaultMessage: 'Your cluster settings are ready',
                    }),
                status: countByType.cluster ? 'warning' : 'complete',
                children: (react_1.default.createElement(eui_1.EuiText, null, countByType.cluster ? (react_1.default.createElement(react_1.Fragment, null,
                    react_1.default.createElement("p", null,
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.clusterStep.todo.todoDetail", defaultMessage: "Go to the {clusterTabButton} to update the deprecated settings.", values: {
                                clusterTabButton: (react_1.default.createElement(eui_1.EuiLink, { onClick: () => setSelectedTabIndex(1) },
                                    react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.clusterStep.todo.clusterTabButtonLabel", defaultMessage: "Cluster tab" }))),
                            } })),
                    react_1.default.createElement("p", null,
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.clusterStep.remainingIssuesDetail", defaultMessage: "{numIssues} issues must be resolved.", values: {
                                numIssues: (react_1.default.createElement(eui_1.EuiNotificationBadge, null, countByType.cluster)),
                            } })))) : (react_1.default.createElement("p", null,
                    react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.clusterStep.noRemainingIssuesLabel", defaultMessage: "No remaining deprecated settings." }))))),
            },
            {
                title: countByType.indices
                    ? intl.formatMessage({
                        id: 'xpack.upgradeAssistant.overviewTab.steps.indicesStep.issuesRemainingStepTitle',
                        defaultMessage: 'Check for issues with your indices',
                    })
                    : intl.formatMessage({
                        id: 'xpack.upgradeAssistant.overviewTab.steps.indicesStep.noIssuesRemainingStepTitle',
                        defaultMessage: 'Your index settings are ready',
                    }),
                status: countByType.indices ? 'warning' : 'complete',
                children: (react_1.default.createElement(eui_1.EuiText, null, countByType.indices ? (react_1.default.createElement(react_1.Fragment, null,
                    react_1.default.createElement("p", null,
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.indicesStep.todo.todoDetail", defaultMessage: "Go to the {indicesTabButton} to update the deprecated settings.", values: {
                                indicesTabButton: (react_1.default.createElement(eui_1.EuiLink, { onClick: () => setSelectedTabIndex(2) },
                                    react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.indicesStep.todo.indicesTabButtonLabel", defaultMessage: "Indices tab" }))),
                            } })),
                    react_1.default.createElement("p", null,
                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.indicesStep.remainingIssuesDetail", defaultMessage: "{numIssues} issues must be resolved.", values: {
                                numIssues: (react_1.default.createElement(eui_1.EuiNotificationBadge, null, countByType.indices)),
                            } })))) : (react_1.default.createElement("p", null,
                    react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.indicesStep.noRemainingIssuesLabel", defaultMessage: "No remaining deprecated settings." }))))),
            },
            {
                title: intl.formatMessage({
                    id: 'xpack.upgradeAssistant.overviewTab.steps.deprecationLogsStep.stepTitle',
                    defaultMessage: 'Review the Elasticsearch deprecation logs',
                }),
                children: (react_1.default.createElement(react_1.Fragment, null,
                    react_1.default.createElement(eui_1.EuiText, { grow: false },
                        react_1.default.createElement("p", null,
                            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.deprecationLogsStep.deprecationLogs.logsDetail", defaultMessage: "Read the {deprecationLogsDocButton} to see if your applications\n                      are using functionality that is not available in {nextEsVersion}. You may need to enable deprecation logging.", values: {
                                    deprecationLogsDocButton: (react_1.default.createElement(eui_1.EuiLink, { href: "https://www.elastic.co/guide/en/elasticsearch/reference/7.0/logging.html#deprecation-logging", target: "_blank" },
                                        react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.upgradeAssistant.overviewTab.steps.deprecationLogsStep.deprecationLogs.deprecationLogsDocButtonLabel", defaultMessage: "deprecation logs" }))),
                                    nextEsVersion: `${version_1.NEXT_MAJOR_VERSION}.0`,
                                } }))),
                    react_1.default.createElement(eui_1.EuiSpacer, null),
                    react_1.default.createElement(eui_1.EuiFormRow, { label: intl.formatMessage({
                            id: 'xpack.upgradeAssistant.overviewTab.steps.deprecationLogsStep.enableDeprecationLoggingLabel',
                            defaultMessage: 'Enable deprecation logging?',
                        }), describedByIds: ['deprecation-logging'] },
                        react_1.default.createElement(deprecation_logging_toggle_1.DeprecationLoggingToggle, null)))),
            },
            // Swap in START_UPGRADE_STEP on the last minor release.
            WAIT_FOR_RELEASE_STEP,
        ] }));
};
exports.Steps = react_2.injectI18n(exports.StepsUI);
