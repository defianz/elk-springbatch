"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const styled_components_1 = tslib_1.__importStar(require("styled-components"));
exports.resizeCursorStyle = 'col-resize';
exports.globalResizeCursorClassName = 'global-resize-cursor';
/** This polyfill is for Safari only. `movementX` is more accurate and "feels" better, so only use this function on Safari */
exports.calculateDeltaX = ({ prevX, screenX }) => prevX !== 0 ? screenX - prevX : 0;
const isSafari = /^((?!chrome|android|crios|fxios|Firefox).)*safari/i.test(navigator.userAgent);
// eslint-disable-next-line no-unused-expressions
styled_components_1.injectGlobal `
.${exports.globalResizeCursorClassName} {
  * {
      cursor: ${exports.resizeCursorStyle};
      &: hover {
        cursor: ${exports.resizeCursorStyle};
      }
  }
}
`;
const ResizeHandleContainer = styled_components_1.default.div `
  cursor: ${exports.resizeCursorStyle};
  ${({ height }) => (height != null ? `height: ${height}` : '')}
`;
exports.addGlobalResizeCursorStyleToBody = () => {
    document.body.classList.add(exports.globalResizeCursorClassName);
};
exports.removeGlobalResizeCursorStyleFromBody = () => {
    document.body.classList.remove(exports.globalResizeCursorClassName);
};
class Resizeable extends React.PureComponent {
    constructor(props) {
        super(props);
        this.prevX = 0;
        this.calculateDelta = (e) => {
            const deltaX = exports.calculateDeltaX({ prevX: this.prevX, screenX: e.screenX });
            this.prevX = e.screenX;
            return deltaX;
        };
        // NOTE: the ref and observable below are NOT stored in component `State`
        this.ref = React.createRef();
        this.drag$ = null;
        this.dragSubscription = null;
        this.upSubscription = null;
        this.state = {
            isResizing: false,
        };
    }
    componentDidMount() {
        const { id, onResize } = this.props;
        const move$ = rxjs_1.fromEvent(document, 'mousemove');
        const down$ = rxjs_1.fromEvent(this.ref.current, 'mousedown');
        const up$ = rxjs_1.fromEvent(document, 'mouseup');
        this.drag$ = down$.pipe(operators_1.concatMap(() => move$.pipe(operators_1.takeUntil(up$))));
        this.dragSubscription = this.drag$.subscribe(e => {
            const delta = isSafari ? this.calculateDelta(e) : e.movementX;
            if (!this.state.isResizing) {
                this.setState({ isResizing: true });
            }
            onResize({ id, delta });
            exports.addGlobalResizeCursorStyleToBody();
        });
        this.upSubscription = up$.subscribe(() => {
            if (this.state.isResizing) {
                exports.removeGlobalResizeCursorStyleFromBody();
                this.setState({ isResizing: false });
            }
        });
    }
    componentWillUnmount() {
        if (this.dragSubscription != null) {
            this.dragSubscription.unsubscribe();
        }
        if (this.upSubscription != null) {
            this.upSubscription.unsubscribe();
        }
    }
    render() {
        const { handle, height, render } = this.props;
        return (React.createElement(React.Fragment, null,
            render(this.state.isResizing),
            React.createElement(ResizeHandleContainer, { "data-test-subj": "resize-handle-container", height: height, innerRef: this.ref }, handle)));
    }
}
exports.Resizeable = Resizeable;
