"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importStar(require("react"));
const notify_1 = require("ui/notify");
const ml_1 = require("../../../../../services/rest/ml");
const savedObjects_1 = require("../../../../../services/rest/savedObjects");
const MLJobLink_1 = require("../../../../shared/Links/MachineLearningLinks/MLJobLink");
const view_1 = require("./view");
class MachineLearningFlyout extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isCreatingJob: false,
            hasIndexPattern: false
        };
        this.mounted = false;
        this.onClickCreate = async ({ transactionType }) => {
            this.setState({ isCreatingJob: true });
            try {
                const { serviceName } = this.props.urlParams;
                if (!serviceName) {
                    throw new Error('Service name is required to create this ML job');
                }
                const res = await ml_1.startMLJob({ serviceName, transactionType });
                const didSucceed = res.datafeeds[0].success && res.jobs[0].success;
                if (!didSucceed) {
                    throw new Error('Creating ML job failed');
                }
                this.addSuccessToast({ transactionType });
            }
            catch (e) {
                this.addErrorToast();
            }
            this.setState({ isCreatingJob: false });
            this.props.onClose();
        };
        this.addErrorToast = () => {
            const { urlParams } = this.props;
            const { serviceName } = urlParams;
            if (!serviceName) {
                return;
            }
            notify_1.toastNotifications.addWarning({
                title: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.jobCreationFailedNotificationTitle', {
                    defaultMessage: 'Job creation failed'
                }),
                text: (react_1.default.createElement("p", null, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.jobCreationFailedNotificationText', {
                    defaultMessage: 'Your current license may not allow for creating machine learning jobs, or this job may already exist.'
                })))
            });
        };
        this.addSuccessToast = ({ transactionType }) => {
            const { urlParams } = this.props;
            const { serviceName } = urlParams;
            if (!serviceName) {
                return;
            }
            notify_1.toastNotifications.addSuccess({
                title: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.jobCreatedNotificationTitle', {
                    defaultMessage: 'Job successfully created'
                }),
                text: (react_1.default.createElement("p", null,
                    i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.jobCreatedNotificationText', {
                        defaultMessage: 'The analysis is now running for {serviceName} ({transactionType}). It might take a while before results are added to the response times graph.',
                        values: {
                            serviceName,
                            transactionType
                        }
                    }),
                    ' ',
                    react_1.default.createElement(MLJobLink_1.MLJobLink, { serviceName: serviceName, transactionType: transactionType }, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableAnomalyDetectionPanel.jobCreatedNotificationText.viewJobLinkText', {
                        defaultMessage: 'View job'
                    }))))
            });
        };
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    async componentDidMount() {
        this.mounted = true;
        const indexPattern = await savedObjects_1.getAPMIndexPattern();
        // setTimeout:0 hack forces the state update to wait for next tick
        // in case the component is mid-unmount :/
        setTimeout(() => {
            if (!this.mounted) {
                return;
            }
            this.setState({
                hasIndexPattern: !!indexPattern
            });
        }, 0);
    }
    render() {
        const { isOpen, onClose, urlParams, serviceTransactionTypes } = this.props;
        const { serviceName } = urlParams;
        const { isCreatingJob, hasIndexPattern } = this.state;
        if (!isOpen || !serviceName) {
            return null;
        }
        return (react_1.default.createElement(view_1.MachineLearningFlyoutView, { hasIndexPattern: hasIndexPattern, isCreatingJob: isCreatingJob, onClickCreate: this.onClickCreate, onClose: onClose, serviceName: serviceName, serviceTransactionTypes: serviceTransactionTypes }));
    }
}
exports.MachineLearningFlyout = MachineLearningFlyout;
