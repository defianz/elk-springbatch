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
const i18n_1 = require("@kbn/i18n");
const lodash_1 = require("lodash");
const react_2 = require("@kbn/i18n/react");
const integration_link_1 = require("./integration_link");
const helper_1 = require("../../lib/helper");
exports.IntegrationGroup = ({ basePath, dateRangeStart, dateRangeEnd, isApmAvailable, isInfraAvailable, isLogsAvailable, monitor, monitor: { ping }, }) => {
    const domain = lodash_1.get(ping, 'url.domain', '');
    const podUid = lodash_1.get(ping, 'kubernetes.pod.uid', undefined);
    const containerId = lodash_1.get(ping, 'container.id', undefined);
    const ip = lodash_1.get(ping, 'monitor.ip');
    return isApmAvailable || isInfraAvailable || isLogsAvailable ? (react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "column" },
        isApmAvailable ? (react_1.default.createElement(eui_1.EuiFlexItem, null,
            react_1.default.createElement(integration_link_1.IntegrationLink, { ariaLabel: i18n_1.i18n.translate('xpack.uptime.apmIntegrationAction.description', {
                    defaultMessage: 'Search APM for this monitor',
                    description: 'This value is shown to users when they hover over an icon that will take them to the APM app.',
                }), href: helper_1.getApmHref(monitor, basePath, dateRangeStart, dateRangeEnd), iconType: "apmApp", message: i18n_1.i18n.translate('xpack.uptime.apmIntegrationAction.text', {
                    defaultMessage: 'Check APM for domain',
                    description: 'A message explaining that when the user clicks the associated link, it will navigate to the APM app and search for the selected domain',
                }), tooltipContent: i18n_1.i18n.translate('xpack.uptime.monitorList.observabilityIntegrationsColumn.apmIntegrationLink.tooltip', {
                    defaultMessage: 'Click here to check APM for the domain "{domain}".',
                    description: 'A messsage shown in a tooltip explaining that the nested anchor tag will navigate to the APM app and search for the given URL domain.',
                    values: {
                        domain,
                    },
                }) }))) : null,
        isInfraAvailable ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(integration_link_1.IntegrationLink, { ariaLabel: i18n_1.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.ip.ariaLabel', {
                        defaultMessage: `Check Infrastructure UI for this montor's ip address`,
                        description: 'This value is shown as the aria label value for screen readers.',
                    }), href: helper_1.getInfraIpHref(monitor, basePath), iconType: "infraApp", message: i18n_1.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.ip.message', {
                        defaultMessage: 'Show host metrics',
                        description: `A message explaining that this link will take the user to the Infrastructure UI, filtered for this monitor's IP Address`,
                    }), tooltipContent: i18n_1.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.ip.tooltip', {
                        defaultMessage: 'Check Infrastructure UI for the IP "{ip}"',
                        values: {
                            ip,
                        },
                    }) })),
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(integration_link_1.IntegrationLink, { ariaLabel: i18n_1.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.kubernetes.description', {
                        defaultMessage: `Check Infrastructure UI for this monitor's pod UID`,
                        description: 'This value is shown as the aria label value for screen readers.',
                    }), href: helper_1.getInfraKubernetesHref(monitor, basePath), iconType: "infraApp", message: i18n_1.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.kubernetes.message', {
                        defaultMessage: 'Show pod metrics',
                        description: 'A message explaining that this link will take the user to the Infrastructure UI filtered for the monitor Pod UID.',
                    }), tooltipContent: i18n_1.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.kubernetes.tooltip', {
                        defaultMessage: 'Check Infrastructure UI for pod UID "{podUid}".',
                        values: {
                            podUid,
                        },
                    }) })),
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(integration_link_1.IntegrationLink, { ariaLabel: i18n_1.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.docker.description', {
                        defaultMessage: `Check Infrastructure UI for this monitor's container ID`,
                    }), href: helper_1.getInfraContainerHref(monitor, basePath), iconType: "infraApp", message: i18n_1.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.container.message', {
                        defaultMessage: 'Show container metrics',
                    }), tooltipContent: i18n_1.i18n.translate('xpack.uptime.monitorList.infraIntegrationAction.docker.tooltip', {
                        defaultMessage: 'Check Infrastructure UI for container ID "{containerId}"',
                        values: {
                            containerId,
                        },
                    }) })))) : null,
        isLogsAvailable ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(integration_link_1.IntegrationLink, { ariaLabel: i18n_1.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.kubernetes.ariaLabel', {
                        defaultMessage: 'Show pod logs',
                    }), href: helper_1.getLoggingKubernetesHref(monitor, basePath), iconType: "loggingApp", message: i18n_1.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.kubernetes.message', {
                        defaultMessage: 'Show pod logs',
                    }), tooltipContent: i18n_1.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.kubernetes.tooltip', {
                        defaultMessage: 'Check for logs for pod UID "{podUid}"',
                        values: {
                            podUid,
                        },
                    }) })),
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(integration_link_1.IntegrationLink, { ariaLabel: i18n_1.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.container.id', {
                        defaultMessage: 'Show container logs',
                    }), href: helper_1.getLoggingContainerHref(monitor, basePath), iconType: "loggingApp", message: i18n_1.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.container.message', {
                        defaultMessage: 'Show container logs',
                    }), tooltipContent: i18n_1.i18n.translate('xpack.uptime.monitorList.loggingIntegrationAction.container.tooltip', {
                        defaultMessage: 'Check Logging UI for container ID "{containerId}"',
                        values: {
                            containerId,
                        },
                    }) })))) : null)) : (react_1.default.createElement(react_2.FormattedMessage, { defaultMessage: "No integrated applications available", description: "This message is shown when no applications that Uptime links to are enabled in the current space", id: "xpack.uptime.monitorList.integrationGroup.emptyMessage" }));
};
