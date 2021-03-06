"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importStar(require("react"));
const constants_1 = require("../../common/constants");
const job_queue_client_1 = require("../lib/job_queue_client");
const NA = 'n/a';
const UNKNOWN = 'unknown';
const getDimensions = (info) => {
    const defaultDimensions = { width: null, height: null };
    const { width, height } = lodash_1.get(info, 'payload.layout.dimensions', defaultDimensions);
    if (width && height) {
        return (react_1.default.createElement(react_1.Fragment, null,
            "Width: ",
            width,
            " x Height: ",
            height));
    }
    return NA;
};
class ReportInfoButton extends react_1.Component {
    constructor(props) {
        super(props);
        this.loadInfo = async () => {
            this.setState({ isLoading: true });
            try {
                const info = await job_queue_client_1.jobQueueClient.getInfo(this.props.jobId);
                if (this.mounted) {
                    this.setState({ isLoading: false, info });
                }
            }
            catch (kfetchError) {
                if (this.mounted) {
                    this.setState({
                        isLoading: false,
                        calloutTitle: 'Unable to fetch report info',
                        info: null,
                        error: kfetchError,
                    });
                    throw kfetchError;
                }
            }
        };
        this.closeFlyout = () => {
            this.setState({
                isFlyoutVisible: false,
                info: null,
            });
        };
        this.showFlyout = () => {
            this.setState({ isFlyoutVisible: true });
            if (!this.state.info) {
                this.loadInfo();
            }
        };
        this.state = {
            isLoading: false,
            isFlyoutVisible: false,
            calloutTitle: 'Job Info',
            info: null,
            error: null,
        };
        this.closeFlyout = this.closeFlyout.bind(this);
        this.showFlyout = this.showFlyout.bind(this);
    }
    renderInfo() {
        const { info, error: err } = this.state;
        if (err) {
            return err.message;
        }
        if (!info) {
            return null;
        }
        const jobType = lodash_1.get(info, 'jobtype', NA);
        const processedBy = lodash_1.has(info, 'kibana_name') && lodash_1.has(info, 'kibana_id')
            ? `${info.kibana_name} (${info.kibana_id})`
            : UNKNOWN;
        // TODO queue method (clicked UI, watcher, etc)
        const jobInfoParts = {
            datetimes: [
                {
                    title: 'Created By',
                    description: lodash_1.get(info, 'created_by', NA),
                },
                {
                    title: 'Created At',
                    description: lodash_1.get(info, 'created_at', NA),
                },
                {
                    title: 'Started At',
                    description: lodash_1.get(info, 'started_at', NA),
                },
                {
                    title: 'Completed At',
                    description: lodash_1.get(info, 'completed_at', NA),
                },
                {
                    title: 'Processed By',
                    description: processedBy,
                },
                {
                    title: 'Browser Timezone',
                    description: lodash_1.get(info, 'payload.browserTimezone', NA),
                },
            ],
            payload: [
                {
                    title: 'Title',
                    description: lodash_1.get(info, 'payload.title', NA),
                },
                {
                    title: 'Type',
                    description: lodash_1.get(info, 'payload.type', NA),
                },
                {
                    title: 'Layout',
                    description: lodash_1.get(info, 'meta.layout', NA),
                },
                {
                    title: 'Dimensions',
                    description: getDimensions(info),
                },
                {
                    title: 'Job Type',
                    description: jobType,
                },
                {
                    title: 'Content Type',
                    description: lodash_1.get(info, 'output.content_type') || NA,
                },
                {
                    title: 'Size in Bytes',
                    description: lodash_1.get(info, 'output.size') || NA,
                },
            ],
            status: [
                {
                    title: 'Attempts',
                    description: lodash_1.get(info, 'attempts', NA),
                },
                {
                    title: 'Max Attempts',
                    description: lodash_1.get(info, 'max_attempts', NA),
                },
                {
                    title: 'Priority',
                    description: lodash_1.get(info, 'priority', NA),
                },
                {
                    title: 'Timeout',
                    description: lodash_1.get(info, 'timeout', NA),
                },
                {
                    title: 'Status',
                    description: lodash_1.get(info, 'status', NA),
                },
                {
                    title: 'Browser Type',
                    description: constants_1.USES_HEADLESS_JOB_TYPES.includes(jobType)
                        ? lodash_1.get(info, 'browser_type', UNKNOWN)
                        : NA,
                },
            ],
        };
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiDescriptionList, { listItems: jobInfoParts.datetimes, type: "column", align: "center", compressed: true }),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(eui_1.EuiDescriptionList, { listItems: jobInfoParts.payload, type: "column", align: "center", compressed: true }),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(eui_1.EuiDescriptionList, { listItems: jobInfoParts.status, type: "column", align: "center", compressed: true })));
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    componentDidMount() {
        this.mounted = true;
    }
    render() {
        let flyout;
        if (this.state.isFlyoutVisible) {
            flyout = (react_1.default.createElement(eui_1.EuiPortal, null,
                react_1.default.createElement(eui_1.EuiFlyout, { ownFocus: true, onClose: this.closeFlyout, size: "s", "aria-labelledby": "flyoutTitle", "data-test-subj": "reportInfoFlyout" },
                    react_1.default.createElement(eui_1.EuiFlyoutHeader, { hasBorder: true },
                        react_1.default.createElement(eui_1.EuiTitle, { size: "m" },
                            react_1.default.createElement("h2", { id: "flyoutTitle" }, this.state.calloutTitle))),
                    react_1.default.createElement(eui_1.EuiFlyoutBody, null,
                        react_1.default.createElement(eui_1.EuiText, null, this.renderInfo())))));
        }
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiButtonIcon, { onClick: this.showFlyout, iconType: "iInCircle", color: 'primary', "data-test-subj": "reportInfoButton", "aria-label": "Show report info" }),
            flyout));
    }
}
exports.ReportInfoButton = ReportInfoButton;
