"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const react_redux_1 = require("react-redux");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const drag_and_drop_1 = require("../../store/drag_and_drop");
const truncatable_text_1 = require("../truncatable_text");
const helpers_1 = require("./helpers");
// As right now, we do not know what we want there, we will keep it as a placeholder
exports.DragEffects = styled_components_1.default.div ``;
const ProviderContainer = styled_components_1.default.div `
  &:hover {
    transition: background-color 0.7s ease;
    background-color: ${props => props.theme.eui.euiColorLightShade};
  }
`;
/**
 * Wraps a draggable component to handle registration / unregistration of the
 * data provider associated with the item being dropped
 */
class DraggableWrapperComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.shouldComponentUpdate = ({ dataProvider, render, width }) => fp_1.isEqual(dataProvider, this.props.dataProvider) &&
            render !== this.props.render &&
            width === this.props.width
            ? false
            : true;
    }
    componentDidMount() {
        const { dataProvider, registerProvider } = this.props;
        registerProvider({ provider: dataProvider });
    }
    componentWillUnmount() {
        const { dataProvider, unRegisterProvider } = this.props;
        unRegisterProvider({ id: dataProvider.id });
    }
    render() {
        const { dataProvider, render, width } = this.props;
        return (React.createElement("div", { "data-test-subj": "draggableWrapperDiv" },
            React.createElement(react_beautiful_dnd_1.Droppable, { isDropDisabled: true, droppableId: helpers_1.getDroppableId(dataProvider.id) }, droppableProvided => (React.createElement("div", Object.assign({ ref: droppableProvided.innerRef }, droppableProvided.droppableProps),
                React.createElement(react_beautiful_dnd_1.Draggable, { draggableId: helpers_1.getDraggableId(dataProvider.id), index: 0, key: dataProvider.id }, (provided, snapshot) => (React.createElement(ProviderContainer, Object.assign({}, provided.draggableProps, provided.dragHandleProps, { innerRef: provided.innerRef, "data-test-subj": "providerContainer", style: {
                        ...provided.draggableProps.style,
                        zIndex: 9000,
                    } }), width != null && !snapshot.isDragging ? (React.createElement(truncatable_text_1.TruncatableText, { "data-test-subj": "draggable-truncatable-content", size: "s", width: width }, render(dataProvider, provided, snapshot))) : (React.createElement(eui_1.EuiText, { "data-test-subj": "draggable-content", size: "s" }, render(dataProvider, provided, snapshot)))))),
                droppableProvided.placeholder)))));
    }
}
exports.DraggableWrapper = react_redux_1.connect(null, {
    registerProvider: drag_and_drop_1.dragAndDropActions.registerProvider,
    unRegisterProvider: drag_and_drop_1.dragAndDropActions.unRegisterProvider,
})(DraggableWrapperComponent);
