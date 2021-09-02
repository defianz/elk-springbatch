"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datemath_1 = tslib_1.__importDefault(require("@elastic/datemath"));
const eui_1 = require("@elastic/eui");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = tslib_1.__importDefault(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
const EuiSuperDatePickerAbsoluteFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';
class MetricsTimeControls extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.handleTimeChange = ({ start, end }) => {
            const parsedStart = datemath_1.default.parse(start);
            const parsedEnd = datemath_1.default.parse(end, { roundUp: true });
            if (parsedStart && parsedEnd) {
                this.props.onChangeTimeRange({
                    from: parsedStart.valueOf(),
                    to: parsedEnd.valueOf(),
                    interval: '>=1m',
                });
            }
        };
        this.handleRefreshChange = ({ isPaused, refreshInterval }) => {
            if (isPaused) {
                this.props.setAutoReload(false);
            }
            else {
                this.props.setRefreshInterval(refreshInterval);
                this.props.setAutoReload(true);
            }
        };
    }
    render() {
        const { currentTimeRange, isLiveStreaming, refreshInterval } = this.props;
        return (react_1.default.createElement(MetricsTimeControlsContainer, null,
            react_1.default.createElement(eui_1.EuiSuperDatePicker, { start: moment_1.default(currentTimeRange.from).format(EuiSuperDatePickerAbsoluteFormat), end: moment_1.default(currentTimeRange.to).format(EuiSuperDatePickerAbsoluteFormat), isPaused: !isLiveStreaming, refreshInterval: refreshInterval ? refreshInterval : 0, onTimeChange: this.handleTimeChange, onRefreshChange: this.handleRefreshChange })));
    }
}
exports.MetricsTimeControls = MetricsTimeControls;
const MetricsTimeControlsContainer = eui_styled_components_1.default.div `
  max-width: 750px;
`;
