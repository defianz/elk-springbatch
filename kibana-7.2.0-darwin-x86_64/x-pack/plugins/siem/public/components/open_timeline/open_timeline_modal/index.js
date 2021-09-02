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
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const __1 = require("..");
const react_apollo_1 = require("react-apollo");
const i18n = tslib_1.__importStar(require("../translations"));
const DEFAULT_SEARCH_RESULTS_PER_PAGE = 10;
const OPEN_TIMELINE_MODAL_WIDTH = 1000; // px
// TODO: this container can be removed when
// the following EUI PR is available (in Kibana):
// https://github.com/elastic/eui/pull/1902/files#diff-d662c14c5dcd7e4b41028bf60b9bc77b
const ModalContainer = styled_components_1.default.div `
  .euiModalBody {
    display: flex;
    flex-direction: column;
  }
`;
/**
 * Renders a button that when clicked, displays the `Open Timelines` modal
 */
class OpenTimelineModalButton extends React.PureComponent {
    constructor(props) {
        super(props);
        /** shows or hides the `Open Timeline` modal */
        this.toggleShowModal = () => {
            if (this.props.onToggle != null) {
                this.props.onToggle();
            }
            this.setState(state => ({
                showModal: !state.showModal,
            }));
        };
        this.closeModalTimeline = () => {
            this.toggleShowModal();
        };
        this.state = { showModal: false };
    }
    render() {
        return (React.createElement(react_apollo_1.ApolloConsumer, null, client => (React.createElement(React.Fragment, null,
            React.createElement(eui_1.EuiButtonEmpty, { color: "text", "data-test-subj": "open-timeline-button", iconSide: "left", iconType: "folderOpen", onClick: this.toggleShowModal }, i18n.OPEN_TIMELINE),
            this.state.showModal && (React.createElement(eui_1.EuiOverlayMask, null,
                React.createElement(ModalContainer, null,
                    React.createElement(eui_1.EuiModal, { "data-test-subj": "open-timeline-modal", maxWidth: OPEN_TIMELINE_MODAL_WIDTH, onClose: this.toggleShowModal },
                        React.createElement(__1.StatefulOpenTimeline, { apolloClient: client, closeModalTimeline: this.closeModalTimeline, isModal: true, defaultPageSize: DEFAULT_SEARCH_RESULTS_PER_PAGE, title: i18n.OPEN_TIMELINE_TITLE })))))))));
    }
}
exports.OpenTimelineModalButton = OpenTimelineModalButton;
