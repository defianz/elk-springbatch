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
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importStar(require("react"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const LicenseContext_1 = require("../../../../context/LicenseContext");
const MachineLearningFlyout_1 = require("./MachineLearningFlyout");
const WatcherFlyout_1 = require("./WatcherFlyout");
class ServiceIntegrations extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = { isPopoverOpen: false, activeFlyout: null };
        this.getPanelItems = lodash_1.memoize((mlAvailable) => {
            let panelItems = [];
            if (mlAvailable) {
                panelItems = panelItems.concat(this.getMLPanelItems());
            }
            return panelItems.concat(this.getWatcherPanelItems());
        });
        this.getMLPanelItems = () => {
            return [
                {
                    name: i18n_1.i18n.translate('xpack.apm.serviceDetails.integrationsMenu.enableMLAnomalyDetectionButtonLabel', {
                        defaultMessage: 'Enable ML anomaly detection'
                    }),
                    icon: 'machineLearningApp',
                    toolTipContent: i18n_1.i18n.translate('xpack.apm.serviceDetails.integrationsMenu.enableMLAnomalyDetectionButtonTooltip', {
                        defaultMessage: 'Set up a machine learning job for this service'
                    }),
                    onClick: () => {
                        this.closePopover();
                        this.openFlyout('ML');
                    }
                }
            ];
        };
        this.getWatcherPanelItems = () => {
            return [
                {
                    name: i18n_1.i18n.translate('xpack.apm.serviceDetails.integrationsMenu.enableWatcherErrorReportsButtonLabel', {
                        defaultMessage: 'Enable watcher error reports'
                    }),
                    icon: 'watchesApp',
                    onClick: () => {
                        this.closePopover();
                        this.openFlyout('Watcher');
                    }
                },
                {
                    name: i18n_1.i18n.translate('xpack.apm.serviceDetails.integrationsMenu.viewWatchesButtonLabel', {
                        defaultMessage: 'View existing watches'
                    }),
                    icon: 'watchesApp',
                    href: chrome_1.default.addBasePath('/app/kibana#/management/elasticsearch/watcher'),
                    target: '_blank',
                    onClick: () => this.closePopover()
                }
            ];
        };
        this.openPopover = () => this.setState({
            isPopoverOpen: true
        });
        this.closePopover = () => this.setState({
            isPopoverOpen: false
        });
        this.openFlyout = (name) => this.setState({ activeFlyout: name });
        this.closeFlyouts = () => this.setState({ activeFlyout: null });
    }
    render() {
        const button = (react_1.default.createElement(eui_1.EuiButtonEmpty, { iconType: "arrowDown", iconSide: "right", onClick: this.openPopover }, i18n_1.i18n.translate('xpack.apm.serviceDetails.integrationsMenu.integrationsButtonLabel', {
            defaultMessage: 'Integrations'
        })));
        return (react_1.default.createElement(LicenseContext_1.LicenseContext.Consumer, null, license => (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiPopover, { id: "integrations-menu", button: button, isOpen: this.state.isPopoverOpen, closePopover: this.closePopover, panelPaddingSize: "none", anchorPosition: "downRight" },
                react_1.default.createElement(eui_1.EuiContextMenu, { initialPanelId: 0, panels: [
                        {
                            id: 0,
                            items: this.getPanelItems(license.features.ml.is_available)
                        }
                    ] })),
            react_1.default.createElement(MachineLearningFlyout_1.MachineLearningFlyout, { isOpen: this.state.activeFlyout === 'ML', onClose: this.closeFlyouts, urlParams: this.props.urlParams, serviceTransactionTypes: this.props.transactionTypes }),
            react_1.default.createElement(WatcherFlyout_1.WatcherFlyout, { isOpen: this.state.activeFlyout === 'Watcher', onClose: this.closeFlyouts, urlParams: this.props.urlParams })))));
    }
}
exports.ServiceIntegrations = ServiceIntegrations;
