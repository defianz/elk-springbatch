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
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const i18n = tslib_1.__importStar(require("./translations"));
exports.Updated = recompose_1.pure(({ date, prefix, updatedAt }) => (React.createElement(React.Fragment, null,
    prefix,
    React.createElement(react_1.FormattedRelative, { "data-test-subj": "last-updated-at-date", key: `formatedRelative-${date}`, value: new Date(updatedAt) }))));
class LastUpdatedAt extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            date: Date.now(),
        };
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 10000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: Date.now(),
        });
    }
    render() {
        const { compact = false } = this.props;
        const prefix = ` ${i18n.UPDATED} `;
        return (React.createElement(eui_1.EuiToolTip, { "data-test-subj": "timeline-stream-tool-tip", content: React.createElement(React.Fragment, null,
                React.createElement(exports.Updated, { date: this.state.date, prefix: prefix, updatedAt: this.props.updatedAt })) },
            React.createElement(eui_1.EuiText, { size: "s" },
                React.createElement(eui_1.EuiIcon, { "data-test-subj": "last-updated-at-clock-icon", type: "clock" }),
                !compact ? (React.createElement(exports.Updated, { date: this.state.date, prefix: prefix, updatedAt: this.props.updatedAt })) : null)));
    }
}
exports.LastUpdatedAt = LastUpdatedAt;
