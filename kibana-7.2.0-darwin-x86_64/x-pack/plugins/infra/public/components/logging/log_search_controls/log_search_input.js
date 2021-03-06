"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a;
"use strict";
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const React = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
exports.LogSearchInput = react_1.injectI18n((_a = class extends React.PureComponent {
        constructor() {
            super(...arguments);
            this.state = {
                query: '',
            };
            this.handleSubmit = evt => {
                evt.preventDefault();
                const { query } = this.state;
                if (query === '') {
                    this.props.onClear();
                }
                else {
                    this.props.onSearch(this.state.query);
                }
            };
            this.handleChangeQuery = evt => {
                this.setState({
                    query: evt.target.value,
                });
            };
        }
        render() {
            const { className, isLoading, intl } = this.props;
            const { query } = this.state;
            const classes = classnames_1.default('loggingSearchInput', className);
            return (React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement(PlainSearchField, { "aria-label": intl.formatMessage({
                        id: 'xpack.infra.logs.search.searchInLogsAriaLabel',
                        defaultMessage: 'search',
                    }), className: classes, fullWidth: true, isLoading: isLoading, onChange: this.handleChangeQuery, placeholder: intl.formatMessage({
                        id: 'xpack.infra.logs.search.searchInLogsPlaceholder',
                        defaultMessage: 'Search',
                    }), value: query })));
        }
    },
    _a.displayName = 'LogSearchInput',
    _a));
const PlainSearchField = eui_styled_components_1.default(eui_1.EuiFieldSearch) `
  background: transparent;
  box-shadow: none;

  &:focus {
    box-shadow: inset 0 -2px 0 0 ${props => props.theme.eui.euiColorPrimary};
  }
`;
