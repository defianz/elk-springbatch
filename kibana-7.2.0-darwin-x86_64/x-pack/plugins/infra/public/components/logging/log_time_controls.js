"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_2 = tslib_1.__importDefault(require("react"));
const noop = () => undefined;
class LogTimeControlsUI extends react_2.default.PureComponent {
    constructor() {
        super(...arguments);
        this.handleChangeDate = (date) => {
            if (date !== null) {
                this.props.jumpToTime(date.valueOf());
            }
        };
        this.startLiveStreaming = () => {
            this.props.startLiveStreaming(5000);
        };
        this.stopLiveStreaming = () => {
            this.props.stopLiveStreaming();
        };
    }
    render() {
        const { currentTime, isLiveStreaming, intl } = this.props;
        const currentMoment = currentTime ? moment_1.default(currentTime) : null;
        if (isLiveStreaming) {
            return (react_2.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "s" },
                react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiDatePicker, { disabled: true, onChange: noop, value: intl.formatMessage({
                            id: 'xpack.infra.logs.streamingDescription',
                            defaultMessage: 'Streaming new entries…',
                        }) })),
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiButtonEmpty, { color: "primary", iconType: "pause", iconSide: "left", onClick: this.stopLiveStreaming },
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.logs.stopStreamingButtonLabel", defaultMessage: "Stop streaming" })))));
        }
        else {
            return (react_2.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "s" },
                react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiDatePicker, { dateFormat: "L LTS", onChange: this.handleChangeDate, popperPlacement: "top-end", selected: currentMoment, shouldCloseOnSelect: true, showTimeSelect: true, timeFormat: "LTS", injectTimes: currentMoment ? [currentMoment] : [] })),
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiButtonEmpty, { iconType: "play", iconSide: "left", onClick: this.startLiveStreaming },
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.logs.startStreamingButtonLabel", defaultMessage: "Stream live" })))));
        }
    }
}
exports.LogTimeControls = react_1.injectI18n(LogTimeControlsUI);
