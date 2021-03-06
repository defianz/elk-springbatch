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
class WaffleTimeControls extends react_2.default.Component {
    constructor() {
        super(...arguments);
        this.handleChangeDate = (time) => {
            const { onChangeTime } = this.props;
            if (onChangeTime && time) {
                onChangeTime(time.valueOf());
            }
        };
        this.startLiveStreaming = () => {
            const { startLiveStreaming } = this.props;
            if (startLiveStreaming) {
                startLiveStreaming();
            }
        };
        this.stopLiveStreaming = () => {
            const { stopLiveStreaming } = this.props;
            if (stopLiveStreaming) {
                stopLiveStreaming();
            }
        };
    }
    render() {
        const { currentTime, isLiveStreaming } = this.props;
        const currentMoment = moment_1.default(currentTime);
        const liveStreamingButton = isLiveStreaming ? (react_2.default.createElement(eui_1.EuiButtonEmpty, { color: "primary", iconSide: "left", iconType: "pause", onClick: this.stopLiveStreaming },
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.waffleTime.stopRefreshingButtonLabel", defaultMessage: "Stop refreshing" }))) : (react_2.default.createElement(eui_1.EuiButtonEmpty, { iconSide: "left", iconType: "play", onClick: this.startLiveStreaming },
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.waffleTime.autoRefreshButtonLabel", defaultMessage: "Auto-refresh" })));
        return (react_2.default.createElement(eui_1.EuiFormControlLayout, { append: liveStreamingButton, "data-test-subj": "waffleDatePicker" },
            react_2.default.createElement(eui_1.EuiDatePicker, { className: "euiFieldText--inGroup", dateFormat: "L LTS", disabled: isLiveStreaming, injectTimes: currentMoment ? [currentMoment] : [], isLoading: isLiveStreaming, onChange: this.handleChangeDate, popperPlacement: "top-end", selected: currentMoment, shouldCloseOnSelect: true, showTimeSelect: true, timeFormat: "LT" })));
    }
}
exports.WaffleTimeControls = WaffleTimeControls;
