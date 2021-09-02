"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const recompose_1 = require("recompose");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const store_1 = require("../../../store");
const actions_1 = require("../../../store/inputs/actions");
const i18n = tslib_1.__importStar(require("./translations"));
const timeline_1 = require("../../../store/timeline");
const AutoSaveWarningMsgComponent = recompose_1.pure(({ newTimelineModel, setTimelineRangeDatePicker, timelineId, updateAutoSaveMsg, updateTimeline, }) => (React.createElement(eui_1.EuiGlobalToastList, { toasts: timelineId != null && newTimelineModel != null
        ? [
            {
                id: 'AutoSaveWarningMsg',
                title: i18n.TITLE,
                color: 'warning',
                iconType: 'alert',
                toastLifeTimeMs: 15000,
                text: (React.createElement(React.Fragment, null,
                    React.createElement("p", null, i18n.DESCRIPTION),
                    React.createElement(eui_1.EuiFlexGroup, { justifyContent: "flexEnd", gutterSize: "s" },
                        React.createElement(eui_1.EuiFlexItem, { grow: false },
                            React.createElement(eui_1.EuiButton, { size: "s", onClick: () => {
                                    updateTimeline({ id: timelineId, timeline: newTimelineModel });
                                    updateAutoSaveMsg({ timelineId: null, newTimelineModel: null });
                                    setTimelineRangeDatePicker({
                                        from: fp_1.getOr(0, 'dateRange.start', newTimelineModel),
                                        to: fp_1.getOr(0, 'dateRange.end', newTimelineModel),
                                    });
                                } }, i18n.REFRESH_TIMELINE))))),
            },
        ]
        : [], dismissToast: () => {
        updateAutoSaveMsg({ timelineId: null, newTimelineModel: null });
    }, toastLifeTimeMs: 6000 })));
const mapStateToProps = (state) => {
    const autoSaveMessage = store_1.timelineSelectors.autoSaveMsgSelector(state);
    return {
        timelineId: autoSaveMessage.timelineId,
        newTimelineModel: autoSaveMessage.newTimelineModel,
    };
};
exports.AutoSaveWarningMsg = react_redux_1.connect(mapStateToProps, {
    setTimelineRangeDatePicker: actions_1.setTimelineRangeDatePicker,
    updateAutoSaveMsg: timeline_1.timelineActions.updateAutoSaveMsg,
    updateTimeline: timeline_1.timelineActions.updateTimeline,
})(AutoSaveWarningMsgComponent);
