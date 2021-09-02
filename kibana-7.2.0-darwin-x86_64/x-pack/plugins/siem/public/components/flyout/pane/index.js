"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const resize_handle_1 = require("../../resize_handle");
const styled_handles_1 = require("../../resize_handle/styled_handles");
const header_1 = require("../header");
const i18n = tslib_1.__importStar(require("./translations"));
const actions_1 = require("../../../store/actions");
const minWidthPixels = 550; // do not allow the flyout to shrink below this width (pixels)
const maxWidthPercent = 95; // do not allow the flyout to grow past this percentage of the view
const EuiFlyoutContainer = styled_components_1.default.div `
  .timeline-flyout {
    min-width: 150px;
    width: ${({ width }) => `${width}px`};
  }
  .timeline-flyout-header {
    align-items: center;
    box-shadow: none;
    display: flex;
    flex-direction: row;
    height: ${({ headerHeight }) => `${headerHeight}px`};
    max-height: ${({ headerHeight }) => `${headerHeight}px`};
    overflow: hidden;
    padding: 5px 0 0 10px;
  }
  .timeline-flyout-body {
    overflow-y: hidden;
    padding: 0;
    .euiFlyoutBody__overflow {
      padding: 0;
    }
  }
`;
const FlyoutHeaderContainer = styled_components_1.default.div `
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
// manually wrap the close button because EuiButtonIcon can't be a wrapped `styled`
const WrappedCloseButton = styled_components_1.default.div `
  margin-right: 5px;
`;
const FlyoutHeaderWithCloseButton = recompose_1.pure(({ onClose, timelineId, usersViewing }) => (React.createElement(FlyoutHeaderContainer, null,
    React.createElement(WrappedCloseButton, null,
        React.createElement(eui_1.EuiToolTip, { content: i18n.CLOSE_TIMELINE },
            React.createElement(eui_1.EuiButtonIcon, { "aria-label": i18n.CLOSE_TIMELINE, "data-test-subj": "close-timeline", iconType: "cross", onClick: onClose }))),
    React.createElement(header_1.FlyoutHeader, { timelineId: timelineId, usersViewing: usersViewing }))));
class FlyoutPaneComponent extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.renderFlyout = () => React.createElement(React.Fragment, null);
        this.onResize = ({ delta, id }) => {
            const { applyDeltaToWidth } = this.props;
            const bodyClientWidthPixels = document.body.clientWidth;
            applyDeltaToWidth({
                bodyClientWidthPixels,
                delta,
                id,
                maxWidthPercent,
                minWidthPixels,
            });
        };
    }
    render() {
        const { children, flyoutHeight, headerHeight, onClose, timelineId, usersViewing, width, } = this.props;
        return (React.createElement(EuiFlyoutContainer, { headerHeight: headerHeight, "data-test-subj": "flyout-pane", width: width },
            React.createElement(eui_1.EuiFlyout, { "aria-label": i18n.TIMELINE_DESCRIPTION, className: "timeline-flyout", "data-test-subj": "eui-flyout", hideCloseButton: true, maxWidth: `${maxWidthPercent}%`, onClose: onClose, size: "l" },
                React.createElement(resize_handle_1.Resizeable, { handle: React.createElement(styled_handles_1.TimelineResizeHandle, { "data-test-subj": "flyout-resize-handle", height: flyoutHeight }), id: timelineId, onResize: this.onResize, render: this.renderFlyout }),
                React.createElement(eui_1.EuiFlyoutHeader, { className: "timeline-flyout-header", "data-test-subj": "eui-flyout-header", hasBorder: false },
                    React.createElement(FlyoutHeaderWithCloseButton, { onClose: onClose, timelineId: timelineId, usersViewing: usersViewing })),
                React.createElement(eui_1.EuiFlyoutBody, { "data-test-subj": "eui-flyout-body", className: "timeline-flyout-body" }, children))));
    }
}
exports.Pane = react_redux_1.connect(null, {
    applyDeltaToWidth: actions_1.timelineActions.applyDeltaToWidth,
})(FlyoutPaneComponent);
