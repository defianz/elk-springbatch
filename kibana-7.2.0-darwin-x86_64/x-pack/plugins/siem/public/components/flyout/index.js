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
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const store_1 = require("../../store");
const button_1 = require("./button");
const pane_1 = require("./pane");
const actions_1 = require("../../store/actions");
const helpers_1 = require("../timeline/body/helpers");
const track_usage_1 = require("../../lib/track_usage");
/** The height in pixels of the flyout header, exported for use in height calculations */
exports.flyoutHeaderHeight = 60;
exports.Badge = styled_components_1.default(eui_1.EuiBadge) `
  position: absolute;
  padding-left: 4px;
  padding-right: 4px;
  right: 0%;
  top: 0%;
  border-bottom-left-radius: 5px;
`;
const Visible = styled_components_1.default.div `
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`;
exports.FlyoutComponent = recompose_1.pure(({ children, dataProviders, flyoutHeight, headerHeight, show, showTimeline, timelineId, usersViewing, width, }) => (React.createElement(React.Fragment, null,
    React.createElement(Visible, { show: show },
        React.createElement(pane_1.Pane, { flyoutHeight: flyoutHeight, headerHeight: headerHeight, onClose: () => showTimeline({ id: timelineId, show: false }), timelineId: timelineId, usersViewing: usersViewing, width: width }, children)),
    React.createElement(button_1.FlyoutButton, { dataProviders: dataProviders, show: !show, timelineId: timelineId, onOpen: () => {
            track_usage_1.trackUiAction('open_timeline');
            showTimeline({ id: timelineId, show: true });
        } }))));
const mapStateToProps = (state, { timelineId }) => {
    const timelineById = fp_1.defaultTo({}, store_1.timelineSelectors.timelineByIdSelector(state));
    const dataProviders = fp_1.getOr([], `${timelineId}.dataProviders`, timelineById);
    const show = fp_1.getOr('false', `${timelineId}.show`, timelineById);
    const width = fp_1.getOr(helpers_1.DEFAULT_TIMELINE_WIDTH, `${timelineId}.width`, timelineById);
    return { dataProviders, show, width };
};
exports.Flyout = react_redux_1.connect(mapStateToProps, {
    showTimeline: actions_1.timelineActions.showTimeline,
})(exports.FlyoutComponent);
