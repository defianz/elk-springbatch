"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_2 = tslib_1.__importStar(require("react"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const notify_1 = require("ui/notify");
const eui_1 = require("@elastic/eui");
const poller_1 = require("../../../../common/poller");
const job_statuses_1 = require("../constants/job_statuses");
const download_report_1 = require("../lib/download_report");
const job_queue_client_1 = require("../lib/job_queue_client");
const report_error_button_1 = require("./report_error_button");
const report_info_button_1 = require("./report_info_button");
const jobStatusLabelsMap = new Map([
    [
        job_statuses_1.JobStatuses.PENDING,
        i18n_1.i18n.translate('xpack.reporting.jobStatuses.pendingText', {
            defaultMessage: 'Pending',
        }),
    ],
    [
        job_statuses_1.JobStatuses.PROCESSING,
        i18n_1.i18n.translate('xpack.reporting.jobStatuses.processingText', {
            defaultMessage: 'Processing',
        }),
    ],
    [
        job_statuses_1.JobStatuses.COMPLETED,
        i18n_1.i18n.translate('xpack.reporting.jobStatuses.completedText', {
            defaultMessage: 'Completed',
        }),
    ],
    [
        job_statuses_1.JobStatuses.FAILED,
        i18n_1.i18n.translate('xpack.reporting.jobStatuses.failedText', {
            defaultMessage: 'Failed',
        }),
    ],
    [
        job_statuses_1.JobStatuses.CANCELLED,
        i18n_1.i18n.translate('xpack.reporting.jobStatuses.cancelledText', {
            defaultMessage: 'Cancelled',
        }),
    ],
]);
class ReportListingUi extends react_2.Component {
    constructor(props) {
        super(props);
        this.renderDownloadButton = (record) => {
            if (record.status !== job_statuses_1.JobStatuses.COMPLETED) {
                return;
            }
            const { intl } = this.props;
            const button = (react_2.default.createElement(eui_1.EuiButtonIcon, { onClick: () => download_report_1.downloadReport(record.id), iconType: "importAction", "aria-label": intl.formatMessage({
                    id: 'xpack.reporting.listing.table.downloadReportAriaLabel',
                    defaultMessage: 'Download report',
                }) }));
            if (record.max_size_reached) {
                return (react_2.default.createElement(eui_1.EuiToolTip, { position: "top", content: intl.formatMessage({
                        id: 'xpack.reporting.listing.table.maxSizeReachedTooltip',
                        defaultMessage: 'Max size reached, contains partial data.',
                    }) }, button));
            }
            return button;
        };
        this.renderReportErrorButton = (record) => {
            if (record.status !== job_statuses_1.JobStatuses.FAILED) {
                return;
            }
            return react_2.default.createElement(report_error_button_1.ReportErrorButton, { jobId: record.id });
        };
        this.renderInfoButton = (record) => {
            return react_2.default.createElement(report_info_button_1.ReportInfoButton, { jobId: record.id });
        };
        this.onTableChange = ({ page }) => {
            const { index: pageIndex } = page;
            this.setState({
                page: pageIndex,
            }, this.fetchJobs);
        };
        this.fetchJobs = async () => {
            // avoid page flicker when poller is updating table - only display loading screen on first load
            if (this.isInitialJobsFetch) {
                this.setState({ isLoading: true });
            }
            let jobs;
            let total;
            try {
                jobs = await job_queue_client_1.jobQueueClient.list(this.state.page);
                total = await job_queue_client_1.jobQueueClient.total();
                this.isInitialJobsFetch = false;
            }
            catch (kfetchError) {
                if (!this.licenseAllowsToShowThisPage()) {
                    notify_1.toastNotifications.addDanger(this.props.badLicenseMessage);
                    this.props.redirect('/management');
                    return;
                }
                if (kfetchError.res.status !== 401 && kfetchError.res.status !== 403) {
                    notify_1.toastNotifications.addDanger(kfetchError.res.statusText ||
                        this.props.intl.formatMessage({
                            id: 'xpack.reporting.listing.table.requestFailedErrorMessage',
                            defaultMessage: 'Request failed',
                        }));
                }
                if (this.mounted) {
                    this.setState({ isLoading: false, jobs: [], total: 0 });
                }
                return;
            }
            if (this.mounted) {
                this.setState({
                    isLoading: false,
                    total,
                    jobs: jobs.map((job) => ({
                        id: job._id,
                        type: job._source.jobtype,
                        object_type: job._source.payload.type,
                        object_title: job._source.payload.title,
                        created_by: job._source.created_by,
                        created_at: job._source.created_at,
                        started_at: job._source.started_at,
                        completed_at: job._source.completed_at,
                        status: job._source.status,
                        statusLabel: jobStatusLabelsMap.get(job._source.status) || job._source.status,
                        max_size_reached: job._source.output ? job._source.output.max_size_reached : false,
                        attempts: job._source.attempts,
                        max_attempts: job._source.max_attempts,
                    })),
                });
            }
        };
        this.licenseAllowsToShowThisPage = () => {
            return this.props.showLinks && this.props.enableLinks;
        };
        this.state = {
            page: 0,
            total: 0,
            jobs: [],
            isLoading: false,
        };
        this.isInitialJobsFetch = true;
    }
    render() {
        return (react_2.default.createElement(eui_1.EuiPageContent, { horizontalPosition: "center", className: "euiPageBody--restrictWidth-default" },
            react_2.default.createElement(eui_1.EuiTitle, null,
                react_2.default.createElement("h1", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.reporting.listing.reportstitle", defaultMessage: "Reports" }))),
            react_2.default.createElement(eui_1.EuiText, { color: "subdued", size: "s" },
                react_2.default.createElement("p", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.reporting.listing.reports.subtitle", defaultMessage: "Find reports generated in Kibana applications here" }))),
            react_2.default.createElement(eui_1.EuiSpacer, null),
            this.renderTable()));
    }
    componentWillUnmount() {
        this.mounted = false;
        this.poller.stop();
    }
    componentDidMount() {
        this.mounted = true;
        const { jobsRefresh } = chrome_1.default.getInjected('reportingPollConfig');
        this.poller = new poller_1.Poller({
            functionToPoll: () => {
                return this.fetchJobs();
            },
            pollFrequencyInMillis: jobsRefresh.interval,
            trailing: false,
            continuePollingOnError: true,
            pollFrequencyErrorMultiplier: jobsRefresh.intervalErrorMultiplier,
        });
        this.poller.start();
    }
    renderTable() {
        const { intl } = this.props;
        const tableColumns = [
            {
                field: 'object_title',
                name: intl.formatMessage({
                    id: 'xpack.reporting.listing.tableColumns.reportTitle',
                    defaultMessage: 'Report',
                }),
                render: (objectTitle, record) => {
                    return (react_2.default.createElement("div", null,
                        react_2.default.createElement("div", null, objectTitle),
                        react_2.default.createElement(eui_1.EuiText, { size: "s" },
                            react_2.default.createElement(eui_1.EuiTextColor, { color: "subdued" }, record.object_type))));
                },
            },
            {
                field: 'created_at',
                name: intl.formatMessage({
                    id: 'xpack.reporting.listing.tableColumns.createdAtTitle',
                    defaultMessage: 'Created at',
                }),
                render: (createdAt, record) => {
                    if (record.created_by) {
                        return (react_2.default.createElement("div", null,
                            react_2.default.createElement("div", null, this.formatDate(createdAt)),
                            react_2.default.createElement("span", null, record.created_by)));
                    }
                    return this.formatDate(createdAt);
                },
            },
            {
                field: 'status',
                name: intl.formatMessage({
                    id: 'xpack.reporting.listing.tableColumns.statusTitle',
                    defaultMessage: 'Status',
                }),
                render: (status, record) => {
                    if (status === 'pending') {
                        return (react_2.default.createElement("div", null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.reporting.listing.tableValue.createdAtDetail.pendingStatusReachedText", defaultMessage: "Pending - waiting for job to be processed" })));
                    }
                    let maxSizeReached;
                    if (record.max_size_reached) {
                        maxSizeReached = (react_2.default.createElement("span", null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.reporting.listing.tableValue.createdAtDetail.maxSizeReachedText", defaultMessage: " - Max size reached" })));
                    }
                    let statusTimestamp;
                    if (status === job_statuses_1.JobStatuses.PROCESSING && record.started_at) {
                        statusTimestamp = this.formatDate(record.started_at);
                    }
                    else if (record.completed_at &&
                        (status === job_statuses_1.JobStatuses.COMPLETED || status === job_statuses_1.JobStatuses.FAILED)) {
                        statusTimestamp = this.formatDate(record.completed_at);
                    }
                    let statusLabel = jobStatusLabelsMap.get(status) || status;
                    if (status === job_statuses_1.JobStatuses.PROCESSING) {
                        statusLabel = statusLabel + ` (attempt ${record.attempts} of ${record.max_attempts})`;
                    }
                    if (statusTimestamp) {
                        return (react_2.default.createElement("div", null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.reporting.listing.tableValue.createdAtDetail.statusTimestampText", defaultMessage: "{statusLabel} at {statusTimestamp}", values: {
                                    statusLabel,
                                    statusTimestamp: react_2.default.createElement("span", { className: "eui-textNoWrap" }, statusTimestamp),
                                } }),
                            maxSizeReached));
                    }
                    // unknown status
                    return (react_2.default.createElement("div", null,
                        statusLabel,
                        maxSizeReached));
                },
            },
            {
                name: intl.formatMessage({
                    id: 'xpack.reporting.listing.tableColumns.actionsTitle',
                    defaultMessage: 'Actions',
                }),
                actions: [
                    {
                        render: (record) => {
                            return (react_2.default.createElement("div", null,
                                this.renderDownloadButton(record),
                                this.renderReportErrorButton(record),
                                this.renderInfoButton(record)));
                        },
                    },
                ],
            },
        ];
        const pagination = {
            pageIndex: this.state.page,
            pageSize: 10,
            totalItemCount: this.state.total,
            hidePerPageOptions: true,
        };
        return (react_2.default.createElement(eui_1.EuiBasicTable, { itemId: 'id', items: this.state.jobs, loading: this.state.isLoading, columns: tableColumns, noItemsMessage: this.state.isLoading
                ? intl.formatMessage({
                    id: 'xpack.reporting.listing.table.loadingReportsDescription',
                    defaultMessage: 'Loading reports',
                })
                : intl.formatMessage({
                    id: 'xpack.reporting.listing.table.noCreatedReportsDescription',
                    defaultMessage: 'No reports have been created',
                }), pagination: pagination, onChange: this.onTableChange }));
    }
    formatDate(timestamp) {
        try {
            return moment_1.default(timestamp).format('YYYY-MM-DD @ hh:mm A');
        }
        catch (error) {
            // ignore parse error and display unformatted value
            return timestamp;
        }
    }
}
exports.ReportListing = react_1.injectI18n(ReportListingUi);
