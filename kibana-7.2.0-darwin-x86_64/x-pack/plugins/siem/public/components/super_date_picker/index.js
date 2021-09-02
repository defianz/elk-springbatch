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
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const actions_1 = require("../../store/actions");
const MAX_RECENTLY_USED_RANGES = 9;
const MyEuiSuperDatePicker = eui_1.EuiSuperDatePicker;
exports.SuperDatePickerComponent = class extends react_1.Component {
    constructor(props) {
        super(props);
        this.onRefresh = ({ start, end, refreshInterval }) => {
            this.updateReduxTime({
                start,
                end,
                isQuickSelection: this.state.isQuickSelection,
                isInvalid: false,
            });
            const currentStart = this.formatDate(start);
            const currentEnd = this.state.isQuickSelection
                ? this.formatDate(end, { roundUp: true })
                : this.formatDate(end);
            if (!this.state.isQuickSelection ||
                (this.props.start === currentStart && this.props.end === currentEnd)) {
                this.refetchQuery(this.props.refetch);
            }
        };
        this.onRefreshChange = ({ isPaused, refreshInterval }) => {
            const { id, duration, policy, stopAutoReload, startAutoReload } = this.props;
            if (duration !== refreshInterval) {
                this.props.setDuration({ id, duration: refreshInterval });
            }
            if (isPaused && policy === 'interval') {
                stopAutoReload({ id });
            }
            else if (!isPaused && policy === 'manual') {
                startAutoReload({ id });
            }
            if (!isPaused &&
                (!this.state.isQuickSelection || (this.state.isQuickSelection && this.props.toStr !== 'now'))) {
                this.refetchQuery(this.props.refetch);
            }
        };
        this.refetchQuery = (query) => {
            query.forEach((refetch) => refetch());
        };
        this.formatDate = (date, options) => {
            const momentDate = datemath_1.default.parse(date, options);
            return momentDate != null && momentDate.isValid() ? momentDate.valueOf() : 0;
        };
        this.onTimeChange = ({ start, end, isQuickSelection, isInvalid }) => {
            if (!isInvalid) {
                this.updateReduxTime({ start, end, isQuickSelection, isInvalid });
                this.setState((prevState) => {
                    const recentlyUsedRanges = [
                        { start, end },
                        ...fp_1.take(MAX_RECENTLY_USED_RANGES, prevState.recentlyUsedRanges.filter(recentlyUsedRange => !(recentlyUsedRange.start === start && recentlyUsedRange.end === end))),
                    ];
                    return {
                        recentlyUsedRanges,
                        isQuickSelection,
                    };
                });
            }
        };
        this.updateReduxTime = ({ start, end, isQuickSelection }) => {
            const { id, setAbsoluteSuperDatePicker, setRelativeSuperDatePicker, timelineId, updateTimelineRange, } = this.props;
            const fromDate = this.formatDate(start);
            let toDate = this.formatDate(end, { roundUp: true });
            if (isQuickSelection) {
                setRelativeSuperDatePicker({
                    id,
                    fromStr: start,
                    toStr: end,
                    from: fromDate,
                    to: toDate,
                });
            }
            else {
                toDate = this.formatDate(end);
                setAbsoluteSuperDatePicker({
                    id,
                    from: this.formatDate(start),
                    to: this.formatDate(end),
                });
            }
            if (timelineId != null) {
                updateTimelineRange({
                    id: timelineId,
                    start: fromDate,
                    end: toDate,
                });
            }
        };
        this.state = {
            isQuickSelection: true,
            recentlyUsedRanges: [],
            showUpdateButton: true,
        };
    }
    render() {
        const { duration, end, start, kind, fromStr, policy, toStr, isLoading } = this.props;
        const endDate = kind === 'relative' ? toStr : new Date(end).toISOString();
        const startDate = kind === 'relative' ? fromStr : new Date(start).toISOString();
        return (react_1.default.createElement(MyEuiSuperDatePicker, { end: endDate, isLoading: isLoading, isPaused: policy === 'manual', onTimeChange: this.onTimeChange, onRefreshChange: this.onRefreshChange, onRefresh: this.onRefresh, recentlyUsedRanges: this.state.recentlyUsedRanges, refreshInterval: duration, showUpdateButton: this.state.showUpdateButton, start: startDate }));
    }
};
const mapStateToProps = (state, { id }) => {
    const myState = fp_1.getOr({}, `inputs.${id}`, state);
    return {
        policy: fp_1.get('policy.kind', myState),
        duration: fp_1.get('policy.duration', myState),
        kind: fp_1.get('timerange.kind', myState),
        start: fp_1.get('timerange.from', myState),
        end: fp_1.get('timerange.to', myState),
        fromStr: fp_1.get('timerange.fromStr', myState),
        toStr: fp_1.get('timerange.toStr', myState),
        isLoading: myState.query.filter((i) => i.loading === true).length > 0,
        refetch: myState.query.map((i) => i.refetch),
    };
};
exports.SuperDatePicker = react_redux_1.connect(mapStateToProps, {
    setAbsoluteSuperDatePicker: actions_1.inputsActions.setAbsoluteRangeDatePicker,
    setRelativeSuperDatePicker: actions_1.inputsActions.setRelativeRangeDatePicker,
    startAutoReload: actions_1.inputsActions.startAutoReload,
    stopAutoReload: actions_1.inputsActions.stopAutoReload,
    setDuration: actions_1.inputsActions.setDuration,
    updateTimelineRange: actions_1.timelineActions.updateRange,
})(exports.SuperDatePickerComponent);
