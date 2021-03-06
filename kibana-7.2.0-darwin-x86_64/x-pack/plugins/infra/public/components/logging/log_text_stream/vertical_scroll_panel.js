"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const d3_array_1 = require("d3-array");
const sortBy_1 = tslib_1.__importDefault(require("lodash/fp/sortBy"));
const throttle_1 = tslib_1.__importDefault(require("lodash/fp/throttle"));
const React = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
const SCROLL_THROTTLE_INTERVAL = 250;
exports.ASSUMED_SCROLLBAR_WIDTH = 20;
class VerticalScrollPanel extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.scrollRef = React.createRef();
        this.childRefs = new Map();
        this.childDimensions = new Map();
        this.handleScroll = throttle_1.default(SCROLL_THROTTLE_INTERVAL, () => {
            this.reportVisibleChildren();
        });
        this.registerChild = (key, element) => {
            if (element === null) {
                this.childRefs.delete(key);
            }
            else {
                this.childRefs.set(key, element);
            }
        };
        this.updateChildDimensions = () => {
            this.childDimensions = new Map(sortDimensionsByTop(Array.from(this.childRefs.entries()).reduce((accumulatedDimensions, [key, child]) => {
                const currentOffsetRect = child.getOffsetRect();
                if (currentOffsetRect !== null) {
                    accumulatedDimensions.push([key, currentOffsetRect]);
                }
                return accumulatedDimensions;
            }, [])));
        };
        this.getVisibleChildren = () => {
            if (this.scrollRef.current === null || this.childDimensions.size <= 0) {
                return;
            }
            const { childDimensions, props: { height: scrollViewHeight }, scrollRef: { current: { scrollTop }, }, } = this;
            return getVisibleChildren(Array.from(childDimensions.entries()), scrollViewHeight, scrollTop);
        };
        this.getScrollPosition = () => {
            if (this.scrollRef.current === null) {
                return;
            }
            const { props: { height: scrollViewHeight }, scrollRef: { current: { scrollHeight, scrollTop }, }, } = this;
            return {
                pagesAbove: scrollTop / scrollViewHeight,
                pagesBelow: (scrollHeight - scrollTop - scrollViewHeight) / scrollViewHeight,
            };
        };
        this.reportVisibleChildren = () => {
            const { onVisibleChildrenChange } = this.props;
            const visibleChildren = this.getVisibleChildren();
            const scrollPosition = this.getScrollPosition();
            if (!visibleChildren || !scrollPosition || typeof onVisibleChildrenChange !== 'function') {
                return;
            }
            onVisibleChildrenChange({
                bottomChild: visibleChildren.bottomChild,
                middleChild: visibleChildren.middleChild,
                topChild: visibleChildren.topChild,
                ...scrollPosition,
            });
        };
        this.centerTarget = (target, offset) => {
            const { props: { height: scrollViewHeight }, childDimensions, scrollRef, } = this;
            if (scrollRef.current === null || !target || childDimensions.size <= 0) {
                return;
            }
            const targetDimensions = childDimensions.get(target);
            if (targetDimensions) {
                const targetOffset = typeof offset === 'undefined' ? targetDimensions.height / 2 : offset;
                scrollRef.current.scrollTop = targetDimensions.top + targetOffset - scrollViewHeight / 2;
            }
        };
        this.handleUpdatedChildren = (target, offset) => {
            this.updateChildDimensions();
            if (!!target) {
                this.centerTarget(target, offset);
            }
            this.reportVisibleChildren();
        };
    }
    componentDidMount() {
        this.handleUpdatedChildren(this.props.target, undefined);
    }
    getSnapshotBeforeUpdate(prevProps) {
        if (prevProps.target !== this.props.target && this.props.target) {
            return {
                scrollOffset: undefined,
                scrollTarget: this.props.target,
            };
        }
        else {
            const visibleChildren = this.getVisibleChildren();
            if (visibleChildren) {
                return {
                    scrollOffset: visibleChildren.middleChildOffset,
                    scrollTarget: visibleChildren.middleChild,
                };
            }
        }
        return {
            scrollOffset: undefined,
            scrollTarget: undefined,
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handleUpdatedChildren(snapshot.scrollTarget, snapshot.scrollOffset);
    }
    componentWillUnmount() {
        this.childRefs.clear();
    }
    render() {
        const { children, height, width, hideScrollbar, 'data-test-subj': dataTestSubj } = this.props;
        const scrollbarOffset = hideScrollbar ? exports.ASSUMED_SCROLLBAR_WIDTH : 0;
        return (React.createElement(ScrollPanelWrapper, { "data-test-subj": dataTestSubj, style: { height, width: width + scrollbarOffset }, scrollbarOffset: scrollbarOffset, onScroll: this.handleScroll, innerRef: 
            /* workaround for missing RefObject support in styled-components typings */
            this.scrollRef }, typeof children === 'function' ? children(this.registerChild) : null));
    }
}
VerticalScrollPanel.defaultProps = {
    hideScrollbar: false,
};
exports.VerticalScrollPanel = VerticalScrollPanel;
const ScrollPanelWrapper = eui_styled_components_1.default.div.attrs({}) `
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  padding-right: ${props => props.scrollbarOffset || 0}px;

  & * {
    overflow-anchor: none;
  }
`;
const getVisibleChildren = (childDimensions, scrollViewHeight, scrollTop) => {
    const middleChildIndex = Math.min(getChildIndexBefore(childDimensions, scrollTop + scrollViewHeight / 2), childDimensions.length - 1);
    const topChildIndex = Math.min(getChildIndexBefore(childDimensions, scrollTop, 0, middleChildIndex), childDimensions.length - 1);
    const bottomChildIndex = Math.min(getChildIndexBefore(childDimensions, scrollTop + scrollViewHeight, middleChildIndex), childDimensions.length - 1);
    return {
        bottomChild: childDimensions[bottomChildIndex][0],
        bottomChildOffset: childDimensions[bottomChildIndex][1].top - scrollTop - scrollViewHeight,
        middleChild: childDimensions[middleChildIndex][0],
        middleChildOffset: scrollTop + scrollViewHeight / 2 - childDimensions[middleChildIndex][1].top,
        topChild: childDimensions[topChildIndex][0],
        topChildOffset: childDimensions[topChildIndex][1].top - scrollTop,
    };
};
const sortDimensionsByTop = sortBy_1.default('1.top');
const getChildIndexBefore = d3_array_1.bisector(([key, rect]) => rect.top + rect.height)
    .left;
