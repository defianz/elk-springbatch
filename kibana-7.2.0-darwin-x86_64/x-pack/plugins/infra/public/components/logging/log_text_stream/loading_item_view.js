"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable max-classes-per-file */
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const React = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
class LogTextStreamLoadingItemView extends React.PureComponent {
    render() {
        const { alignment, className, hasMore, isLoading, isStreaming, lastStreamingUpdate, onLoadMore, } = this.props;
        if (isStreaming) {
            return (React.createElement(ProgressEntry, { alignment: alignment, className: className, color: "primary", isLoading: true },
                React.createElement(ProgressMessage, null,
                    React.createElement(eui_1.EuiText, { color: "subdued" },
                        React.createElement(react_1.FormattedMessage, { id: "xpack.infra.logs.streamingNewEntriesText", defaultMessage: "Streaming new entries" }))),
                lastStreamingUpdate ? (React.createElement(ProgressMessage, null,
                    React.createElement(eui_1.EuiText, { color: "subdued" },
                        React.createElement(eui_1.EuiIcon, { type: "clock" }),
                        React.createElement(react_1.FormattedMessage, { id: "xpack.infra.logs.lastStreamingUpdateText", defaultMessage: " last updated {lastUpdateTime}", values: {
                                lastUpdateTime: (React.createElement(react_1.FormattedRelative, { value: lastStreamingUpdate, updateInterval: 1000 })),
                            } })))) : null));
        }
        else if (isLoading) {
            return (React.createElement(ProgressEntry, { alignment: alignment, className: className, color: "subdued", isLoading: true },
                React.createElement(ProgressMessage, null,
                    React.createElement(react_1.FormattedMessage, { id: "xpack.infra.logs.loadingAdditionalEntriesText", defaultMessage: "Loading additional entries" }))));
        }
        else if (!hasMore) {
            return (React.createElement(ProgressEntry, { alignment: alignment, className: className, color: "subdued", isLoading: false },
                React.createElement(ProgressMessage, null,
                    React.createElement(react_1.FormattedMessage, { id: "xpack.infra.logs.noAdditionalEntriesFoundText", defaultMessage: "No additional entries found" })),
                onLoadMore ? (React.createElement(eui_1.EuiButtonEmpty, { size: "xs", onClick: onLoadMore, iconType: "refresh" },
                    React.createElement(react_1.FormattedMessage, { id: "xpack.infra.logs.loadAgainButtonLabel", defaultMessage: "Load again" }))) : null));
        }
        else {
            return null;
        }
    }
}
exports.LogTextStreamLoadingItemView = LogTextStreamLoadingItemView;
class ProgressEntry extends React.PureComponent {
    render() {
        const { alignment, children, className, color, isLoading } = this.props;
        // NOTE: styled-components seems to make all props in EuiProgress required, so this
        // style attribute hacking replaces styled-components here for now until that can be fixed
        // see: https://github.com/elastic/eui/issues/1655
        const alignmentStyle = alignment === 'top' ? { top: 0, bottom: 'initial' } : { top: 'initial', bottom: 0 };
        return (React.createElement(ProgressEntryWrapper, { className: className },
            React.createElement(eui_1.EuiProgress, Object.assign({ style: alignmentStyle, color: color, size: "xs", position: "absolute" }, (!isLoading ? { max: 1, value: 1 } : {}))),
            children));
    }
}
const ProgressEntryWrapper = eui_styled_components_1.default.div `
  align-items: center;
  display: flex;
  min-height: ${props => props.theme.eui.euiSizeXXL};
  position: relative;
`;
const ProgressMessage = eui_styled_components_1.default.div `
  padding: 8px 16px;
`;
