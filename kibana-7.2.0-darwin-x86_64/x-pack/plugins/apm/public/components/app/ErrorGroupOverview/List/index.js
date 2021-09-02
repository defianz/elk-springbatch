"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const numeral_1 = tslib_1.__importDefault(require("@elastic/numeral"));
const i18n_1 = require("@kbn/i18n");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const i18n_2 = require("../../../../../common/i18n");
const variables_1 = require("../../../../style/variables");
const APMLink_1 = require("../../../shared/Links/APMLink");
const url_helpers_1 = require("../../../shared/Links/url_helpers");
const history_1 = require("../../../../utils/history");
function paginateItems({ items, pageIndex, pageSize }) {
    return items.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
}
const GroupIdLink = styled_components_1.default(APMLink_1.APMLink) `
  font-family: ${variables_1.fontFamilyCode};
`;
const MessageAndCulpritCell = styled_components_1.default.div `
  ${variables_1.truncate('100%')};
`;
const MessageLink = styled_components_1.default(APMLink_1.APMLink) `
  font-family: ${variables_1.fontFamilyCode};
  font-size: ${variables_1.fontSizes.large};
  ${variables_1.truncate('100%')};
`;
const Culprit = styled_components_1.default.div `
  font-family: ${variables_1.fontFamilyCode};
`;
class ErrorGroupList extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            page: {
                index: 0,
                size: 25
            }
        };
        this.onTableChange = ({ page = {}, sort = {} }) => {
            this.setState({ page });
            const { location } = this.props;
            history_1.history.push({
                ...location,
                search: url_helpers_1.fromQuery({
                    ...url_helpers_1.toQuery(location.search),
                    sortField: sort.field,
                    sortDirection: sort.direction
                })
            });
        };
    }
    render() {
        const { items } = this.props;
        const { serviceName, sortDirection, sortField } = this.props.urlParams;
        const paginatedItems = paginateItems({
            items,
            pageIndex: this.state.page.index,
            pageSize: this.state.page.size
        });
        const columns = [
            {
                name: i18n_1.i18n.translate('xpack.apm.errorsTable.groupIdColumnLabel', {
                    defaultMessage: 'Group ID'
                }),
                field: 'groupId',
                sortable: false,
                width: variables_1.px(variables_1.unit * 6),
                render: (groupId) => {
                    return (react_1.default.createElement(GroupIdLink, { path: `/${serviceName}/errors/${groupId}` }, groupId.slice(0, 5) || i18n_2.NOT_AVAILABLE_LABEL));
                }
            },
            {
                name: i18n_1.i18n.translate('xpack.apm.errorsTable.errorMessageAndCulpritColumnLabel', {
                    defaultMessage: 'Error message and culprit'
                }),
                field: 'message',
                sortable: false,
                width: '50%',
                render: (message, item) => {
                    return (react_1.default.createElement(MessageAndCulpritCell, null,
                        react_1.default.createElement(eui_1.EuiToolTip, { id: "error-message-tooltip", content: message || i18n_2.NOT_AVAILABLE_LABEL },
                            react_1.default.createElement(MessageLink, { path: `/${serviceName}/errors/${item.groupId}` }, message || i18n_2.NOT_AVAILABLE_LABEL)),
                        react_1.default.createElement("br", null),
                        react_1.default.createElement(eui_1.EuiToolTip, { id: "error-culprit-tooltip", content: item.culprit || i18n_2.NOT_AVAILABLE_LABEL },
                            react_1.default.createElement(Culprit, null, item.culprit || i18n_2.NOT_AVAILABLE_LABEL))));
                }
            },
            {
                name: '',
                field: 'handled',
                sortable: false,
                align: 'right',
                render: (isUnhandled) => isUnhandled === false && (react_1.default.createElement(eui_1.EuiBadge, { color: "warning" }, i18n_1.i18n.translate('xpack.apm.errorsTable.unhandledLabel', {
                    defaultMessage: 'Unhandled'
                })))
            },
            {
                name: i18n_1.i18n.translate('xpack.apm.errorsTable.occurrencesColumnLabel', {
                    defaultMessage: 'Occurrences'
                }),
                field: 'occurrenceCount',
                sortable: true,
                dataType: 'number',
                render: (value) => value ? numeral_1.default(value).format('0.[0]a') : i18n_2.NOT_AVAILABLE_LABEL
            },
            {
                field: 'latestOccurrenceAt',
                sortable: true,
                name: i18n_1.i18n.translate('xpack.apm.errorsTable.latestOccurrenceColumnLabel', {
                    defaultMessage: 'Latest occurrence'
                }),
                align: 'right',
                render: (value) => value ? moment_1.default(value).fromNow() : i18n_2.NOT_AVAILABLE_LABEL
            }
        ];
        return (react_1.default.createElement(eui_1.EuiBasicTable, { noItemsMessage: i18n_1.i18n.translate('xpack.apm.errorsTable.noErrorsLabel', {
                defaultMessage: 'No errors were found'
            }), items: paginatedItems, columns: columns, pagination: {
                pageIndex: this.state.page.index,
                pageSize: this.state.page.size,
                totalItemCount: this.props.items.length
            }, sorting: {
                sort: {
                    field: sortField || 'latestOccurrenceAt',
                    direction: sortDirection || 'desc'
                }
            }, onChange: this.onTableChange }));
    }
}
exports.ErrorGroupList = ErrorGroupList;
