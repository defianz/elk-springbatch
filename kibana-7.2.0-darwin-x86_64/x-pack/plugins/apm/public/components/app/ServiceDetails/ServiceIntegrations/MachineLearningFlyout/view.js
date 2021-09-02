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
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
const useFetcher_1 = require("../../../../../hooks/useFetcher");
const ml_1 = require("../../../../../services/rest/ml");
const KibanaLink_1 = require("../../../../shared/Links/KibanaLink");
const MLJobLink_1 = require("../../../../shared/Links/MachineLearningLinks/MLJobLink");
const MLLink_1 = require("../../../../shared/Links/MachineLearningLinks/MLLink");
const TransactionSelect_1 = require("./TransactionSelect");
function MachineLearningFlyoutView({ hasIndexPattern, isCreatingJob, onClickCreate, onClose, serviceName, serviceTransactionTypes }) {
    const [transactionType, setTransactionType] = react_2.useState(serviceTransactionTypes[0]);
    const { data: hasMLJob = false, status } = useFetcher_1.useFetcher(() => ml_1.getHasMLJob({ serviceName, transactionType }), [serviceName, transactionType]);
    const isLoadingMLJob = status === useFetcher_1.FETCH_STATUS.LOADING;
    return (react_2.default.createElement(eui_1.EuiFlyout, { onClose: onClose, size: "s" },
        react_2.default.createElement(eui_1.EuiFlyoutHeader, null,
            react_2.default.createElement(eui_1.EuiTitle, null,
                react_2.default.createElement("h2", null, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.enableAnomalyDetectionTitle', {
                    defaultMessage: 'Enable anomaly detection'
                }))),
            react_2.default.createElement(eui_1.EuiSpacer, { size: "s" })),
        react_2.default.createElement(eui_1.EuiFlyoutBody, null,
            hasMLJob && (react_2.default.createElement("div", null,
                react_2.default.createElement(eui_1.EuiCallOut, { title: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.callout.jobExistsTitle', {
                        defaultMessage: 'Job already exists'
                    }), color: "success", iconType: "check" },
                    react_2.default.createElement("p", null,
                        i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.callout.jobExistsDescription', {
                            defaultMessage: 'There is currently a job running for {serviceName} ({transactionType}).',
                            values: {
                                serviceName,
                                transactionType
                            }
                        }),
                        ' ',
                        react_2.default.createElement(MLJobLink_1.MLJobLink, { serviceName: serviceName, transactionType: transactionType }, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.callout.jobExistsDescription.viewJobLinkText', {
                            defaultMessage: 'View existing job'
                        })))),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }))),
            !hasIndexPattern && (react_2.default.createElement("div", null,
                react_2.default.createElement(eui_1.EuiCallOut, { title: react_2.default.createElement("span", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.apm.serviceDetails.enableAnomalyDetectionPanel.callout.noPatternTitle", defaultMessage: "No APM index pattern available. To create a job, please import the APM index pattern via the {setupInstructionLink}", values: {
                                setupInstructionLink: (react_2.default.createElement(KibanaLink_1.KibanaLink, { path: `/home/tutorial/apm` }, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.callout.noPatternTitle.setupInstructionLinkText', {
                                    defaultMessage: 'Setup Instructions'
                                })))
                            } })), color: "warning", iconType: "alert" }),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }))),
            react_2.default.createElement(eui_1.EuiText, null,
                react_2.default.createElement("p", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.apm.serviceDetails.enableAnomalyDetectionPanel.createMLJobDescription", defaultMessage: "Here you can create a machine learning job to calculate anomaly scores on durations for APM transactions\n                    within the {serviceName} service. Once enabled, {transactionDurationGraphText} will show the expected bounds and annotate\n                    the graph once the anomaly score is >=75.", values: {
                            serviceName,
                            transactionDurationGraphText: (react_2.default.createElement("b", null, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.createMLJobDescription.transactionDurationGraphText', {
                                defaultMessage: 'the transaction duration graph'
                            })))
                        } })),
                react_2.default.createElement("p", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.apm.serviceDetails.enableAnomalyDetectionPanel.manageMLJobDescription", defaultMessage: "Jobs can be created for each service + transaction type combination.\n                    Once a job is created, you can manage it and see more details in the {mlJobsPageLink}.", values: {
                            mlJobsPageLink: (react_2.default.createElement(MLLink_1.MLLink, null, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.manageMLJobDescription.mlJobsPageLinkText', {
                                defaultMessage: 'Machine Learning jobs management page'
                            })))
                        } }),
                    ' ',
                    react_2.default.createElement("em", null, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.manageMLJobDescription.noteText', {
                        defaultMessage: 'Note: It might take a few minutes for the job to begin calculating results.'
                    })))),
            react_2.default.createElement(eui_1.EuiSpacer, null)),
        react_2.default.createElement(eui_1.EuiFlyoutFooter, null,
            react_2.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween", alignItems: "flexEnd" },
                react_2.default.createElement(eui_1.EuiFlexItem, null, serviceTransactionTypes.length > 1 ? (react_2.default.createElement(TransactionSelect_1.TransactionSelect, { selectedTransactionType: transactionType, transactionTypes: serviceTransactionTypes, onChange: (value) => {
                        setTransactionType(value);
                    } })) : null),
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiFormRow, null,
                        react_2.default.createElement(eui_1.EuiButton, { onClick: () => onClickCreate({ transactionType }), fill: true, disabled: isCreatingJob ||
                                hasMLJob ||
                                !hasIndexPattern ||
                                isLoadingMLJob }, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.createNewJobButtonLabel', {
                            defaultMessage: 'Create new job'
                        }))))))));
}
exports.MachineLearningFlyoutView = MachineLearningFlyoutView;
