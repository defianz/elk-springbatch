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
const lodash_1 = require("lodash");
const moment_timezone_1 = tslib_1.__importDefault(require("moment-timezone"));
const react_2 = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const notify_1 = require("ui/notify");
const KibanaLink_1 = require("../../../shared/Links/KibanaLink");
const createErrorGroupWatch_1 = require("./createErrorGroupWatch");
const ElasticDocsLink_1 = require("../../../shared/Links/ElasticDocsLink");
const getUserTimezone = lodash_1.memoize(() => {
    const uiSettings = chrome_1.default.getUiSettingsClient();
    return uiSettings.get('dateFormat:tz') === 'Browser'
        ? moment_timezone_1.default.tz.guess()
        : uiSettings.get('dateFormat:tz');
});
const SmallInput = styled_components_1.default.div `
  .euiFormRow {
    max-width: 85px;
  }
  .euiFormHelpText {
    width: 200px;
  }
`;
class WatcherFlyout extends react_2.Component {
    constructor() {
        super(...arguments);
        this.state = {
            schedule: 'daily',
            threshold: 10,
            actions: {
                slack: false,
                email: false
            },
            interval: {
                value: 10,
                unit: 'm'
            },
            daily: '08:00',
            emails: '',
            slackUrl: ''
        };
        this.onChangeSchedule = (schedule) => {
            this.setState({ schedule });
        };
        this.onChangeThreshold = (event) => {
            this.setState({
                threshold: parseInt(event.target.value, 10)
            });
        };
        this.onChangeDailyUnit = (event) => {
            this.setState({
                daily: event.target.value
            });
        };
        this.onChangeIntervalValue = (event) => {
            this.setState({
                interval: {
                    value: parseInt(event.target.value, 10),
                    unit: this.state.interval.unit
                }
            });
        };
        this.onChangeIntervalUnit = (event) => {
            this.setState({
                interval: {
                    value: this.state.interval.value,
                    unit: event.target.value
                }
            });
        };
        this.onChangeAction = (actionName) => {
            this.setState({
                actions: {
                    ...this.state.actions,
                    [actionName]: !this.state.actions[actionName]
                }
            });
        };
        this.onChangeEmails = (event) => {
            this.setState({ emails: event.target.value });
        };
        this.onChangeSlackUrl = (event) => {
            this.setState({ slackUrl: event.target.value });
        };
        this.createWatch = () => {
            const { serviceName } = this.props.urlParams;
            if (!serviceName) {
                return;
            }
            const emails = this.state.actions.email
                ? this.state.emails
                    .split(',')
                    .map(email => email.trim())
                    .filter(email => !!email)
                : [];
            const slackUrl = this.state.actions.slack ? this.state.slackUrl : '';
            const schedule = this.state.schedule === 'interval'
                ? {
                    interval: `${this.state.interval.value}${this.state.interval.unit}`
                }
                : {
                    daily: { at: `${this.state.daily}` }
                };
            const timeRange = this.state.schedule === 'interval'
                ? {
                    value: this.state.interval.value,
                    unit: this.state.interval.unit
                }
                : {
                    value: 24,
                    unit: 'h'
                };
            return createErrorGroupWatch_1.createErrorGroupWatch({
                emails,
                schedule,
                serviceName,
                slackUrl,
                threshold: this.state.threshold,
                timeRange
            })
                .then((id) => {
                this.props.onClose();
                this.addSuccessToast(id);
            })
                .catch(e => {
                // eslint-disable-next-line
                console.error(e);
                this.addErrorToast();
            });
        };
        this.addErrorToast = () => {
            notify_1.toastNotifications.addWarning({
                title: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.watchCreationFailedNotificationTitle', {
                    defaultMessage: 'Watch creation failed'
                }),
                text: (react_2.default.createElement("p", null, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.watchCreationFailedNotificationText', {
                    defaultMessage: 'Make sure your user has permission to create watches.'
                })))
            });
        };
        this.addSuccessToast = (id) => {
            notify_1.toastNotifications.addSuccess({
                title: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.watchCreatedNotificationTitle', {
                    defaultMessage: 'New watch created!'
                }),
                text: (react_2.default.createElement("p", null,
                    i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.watchCreatedNotificationText', {
                        defaultMessage: 'The watch is now ready and will send error reports for {serviceName}.',
                        values: {
                            serviceName: this.props.urlParams.serviceName
                        }
                    }),
                    ' ',
                    react_2.default.createElement(KibanaLink_1.KibanaLink, { path: `/management/elasticsearch/watcher/watches/watch/${id}` }, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.watchCreatedNotificationText.viewWatchLinkText', {
                        defaultMessage: 'View watch'
                    }))))
            });
        };
    }
    render() {
        if (!this.props.isOpen) {
            return null;
        }
        const userTimezoneSetting = getUserTimezone();
        const dailyTime = this.state.daily;
        const inputTime = `${dailyTime}Z`; // Add tz to make into UTC
        const inputFormat = 'HH:mmZ'; // Parse as 24 hour w. tz
        const dailyTimeFormatted = moment_timezone_1.default(inputTime, inputFormat)
            .tz(userTimezoneSetting)
            .format('HH:mm'); // Format as 24h
        const dailyTime12HourFormatted = moment_timezone_1.default(inputTime, inputFormat)
            .tz(userTimezoneSetting)
            .format('hh:mm A (z)'); // Format as 12h w. tz
        // Generate UTC hours for Daily Report select field
        const intervalHours = lodash_1.range(24).map(i => {
            const hour = lodash_1.padLeft(i.toString(), 2, '0');
            return { value: `${hour}:00`, text: `${hour}:00 UTC` };
        });
        const flyoutBody = (react_2.default.createElement(eui_1.EuiText, null,
            react_2.default.createElement("p", null,
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.apm.serviceDetails.enableErrorReportsPanel.formDescription", defaultMessage: "This form will assist in creating a Watch that can notify you of error occurrences from this service.\n              To learn more about Watcher, please read our {documentationLink}.", values: {
                        documentationLink: (react_2.default.createElement(ElasticDocsLink_1.ElasticDocsLink, { target: "_blank", section: "/x-pack", path: "/watcher-getting-started.html" }, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.formDescription.documentationLinkText', {
                            defaultMessage: 'documentation'
                        })))
                    } })),
            react_2.default.createElement(eui_1.EuiForm, null,
                react_2.default.createElement("h4", null, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.conditionTitle', {
                    defaultMessage: 'Condition'
                })),
                react_2.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.occurrencesThresholdLabel', {
                        defaultMessage: 'Occurrences threshold per error group'
                    }), helpText: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.occurrencesThresholdHelpText', {
                        defaultMessage: 'Threshold to be met for error group to be included in report.'
                    }), compressed: true },
                    react_2.default.createElement(eui_1.EuiFieldNumber, { icon: "number", min: 1, value: this.state.threshold, onChange: this.onChangeThreshold })),
                react_2.default.createElement("h4", null, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.triggerScheduleTitle', {
                    defaultMessage: 'Trigger schedule'
                })),
                react_2.default.createElement(eui_1.EuiText, { size: "xs", color: "subdued" }, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.triggerScheduleDescription', {
                    defaultMessage: 'Choose the time interval for the report, when the threshold is exceeded.'
                })),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }),
                react_2.default.createElement(eui_1.EuiRadio, { id: "daily", label: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.dailyReportRadioButtonLabel', {
                        defaultMessage: 'Daily report'
                    }), onChange: () => this.onChangeSchedule('daily'), checked: this.state.schedule === 'daily' }),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }),
                react_2.default.createElement(eui_1.EuiFormRow, { helpText: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.dailyReportHelpText', {
                        defaultMessage: 'The daily report will be sent at {dailyTimeFormatted} / {dailyTime12HourFormatted}.',
                        values: { dailyTimeFormatted, dailyTime12HourFormatted }
                    }), compressed: true },
                    react_2.default.createElement(eui_1.EuiSelect, { value: dailyTime, onChange: this.onChangeDailyUnit, options: intervalHours, disabled: this.state.schedule !== 'daily' })),
                react_2.default.createElement(eui_1.EuiRadio, { id: "interval", label: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.intervalRadioButtonLabel', {
                        defaultMessage: 'Interval'
                    }), onChange: () => this.onChangeSchedule('interval'), checked: this.state.schedule === 'interval' }),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }),
                react_2.default.createElement(eui_1.EuiFlexGroup, null,
                    react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_2.default.createElement(SmallInput, null,
                            react_2.default.createElement(eui_1.EuiFormRow, { helpText: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.intervalHelpText', {
                                    defaultMessage: 'Time interval between reports.'
                                }), compressed: true },
                                react_2.default.createElement(eui_1.EuiFieldNumber, { icon: "clock", min: 1, value: this.state.interval.value, onChange: this.onChangeIntervalValue, disabled: this.state.schedule !== 'interval' })))),
                    react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_2.default.createElement(eui_1.EuiFormRow, { compressed: true },
                            react_2.default.createElement(eui_1.EuiSelect, { value: this.state.interval.unit, onChange: this.onChangeIntervalUnit, options: [
                                    {
                                        value: 'm',
                                        text: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.intervalUnit.minsLabel', {
                                            defaultMessage: 'mins'
                                        })
                                    },
                                    {
                                        value: 'h',
                                        text: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.intervalUnit.hrsLabel', {
                                            defaultMessage: 'hrs'
                                        })
                                    }
                                ], disabled: this.state.schedule !== 'interval' })))),
                react_2.default.createElement("h4", null, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.actionsTitle', {
                    defaultMessage: 'Actions'
                })),
                react_2.default.createElement(eui_1.EuiText, { size: "xs", color: "subdued" }, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.actionsDescription', {
                    defaultMessage: 'Reports can be sent by email or posted to a Slack channel. Each report will include the top 10 errors sorted by occurrence.'
                })),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }),
                react_2.default.createElement(eui_1.EuiSwitch, { label: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.sendEmailLabel', {
                        defaultMessage: 'Send email'
                    }), checked: this.state.actions.email, onChange: () => this.onChangeAction('email') }),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }),
                this.state.actions.email && (react_2.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.recipientsLabel', {
                        defaultMessage: 'Recipients (separated with comma)'
                    }), compressed: true, helpText: react_2.default.createElement("span", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.apm.serviceDetails.enableErrorReportsPanel.recipientsHelpText", defaultMessage: "If you have not configured email, please see the {documentationLink}.", values: {
                                documentationLink: (react_2.default.createElement(ElasticDocsLink_1.ElasticDocsLink, { target: "_blank", section: "/x-pack", path: "/actions-email.html#configuring-email" }, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.recipientsHelpText.documentationLinkText', {
                                    defaultMessage: 'documentation'
                                })))
                            } })) },
                    react_2.default.createElement(eui_1.EuiFieldText, { icon: "user", value: this.state.emails, onChange: this.onChangeEmails }))),
                react_2.default.createElement(eui_1.EuiSwitch, { label: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.sendSlackNotificationLabel', {
                        defaultMessage: 'Send Slack notification'
                    }), checked: this.state.actions.slack, onChange: () => this.onChangeAction('slack') }),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }),
                this.state.actions.slack && (react_2.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.slackWebhookURLLabel', {
                        defaultMessage: 'Slack Webhook URL'
                    }), compressed: true, helpText: react_2.default.createElement("span", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.apm.serviceDetails.enableErrorReportsPanel.slackWebhookURLHelpText", defaultMessage: "To get a Slack webhook, please see the {documentationLink}.", values: {
                                documentationLink: (react_2.default.createElement(eui_1.EuiLink, { target: "_blank", href: "https://get.slack.help/hc/en-us/articles/115005265063-Incoming-WebHooks-for-Slack" }, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.slackWebhookURLHelpText.documentationLinkText', {
                                    defaultMessage: 'documentation'
                                })))
                            } })) },
                    react_2.default.createElement(eui_1.EuiFieldText, { icon: "link", value: this.state.slackUrl, onChange: this.onChangeSlackUrl }))))));
        return (react_2.default.createElement(eui_1.EuiFlyout, { onClose: this.props.onClose, size: "s" },
            react_2.default.createElement(eui_1.EuiFlyoutHeader, null,
                react_2.default.createElement(eui_1.EuiTitle, null,
                    react_2.default.createElement("h2", null, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.enableErrorReportsTitle', {
                        defaultMessage: 'Enable error reports'
                    })))),
            react_2.default.createElement(eui_1.EuiFlyoutBody, null, flyoutBody),
            react_2.default.createElement(eui_1.EuiFlyoutFooter, null,
                react_2.default.createElement(eui_1.EuiButton, { onClick: this.createWatch, fill: true, disabled: !this.state.actions.email && !this.state.actions.slack }, i18n_1.i18n.translate('xpack.apm.serviceDetails.enableErrorReportsPanel.createWatchButtonLabel', {
                    defaultMessage: 'Create watch'
                })))));
    }
}
exports.WatcherFlyout = WatcherFlyout;
