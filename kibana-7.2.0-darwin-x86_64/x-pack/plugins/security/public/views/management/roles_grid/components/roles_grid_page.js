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
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const react_2 = tslib_1.__importStar(require("react"));
const notify_1 = require("ui/notify");
const role_utils_1 = require("../../../../lib/role_utils");
const roles_api_1 = require("../../../../lib/roles_api");
const confirm_delete_1 = require("./confirm_delete");
const permission_denied_1 = require("./permission_denied");
const getRoleManagementHref = (roleName) => {
    return `#/management/security/roles/edit${roleName ? `/${roleName}` : ''}`;
};
class RolesGridPageUI extends react_2.Component {
    constructor(props) {
        super(props);
        this.getPageContent = () => {
            const { roles } = this.state;
            const { intl } = this.props;
            return (react_2.default.createElement(eui_1.EuiPageContent, null,
                react_2.default.createElement(eui_1.EuiPageContentHeader, null,
                    react_2.default.createElement(eui_1.EuiPageContentHeaderSection, null,
                        react_2.default.createElement(eui_1.EuiTitle, null,
                            react_2.default.createElement("h2", null,
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.roles.roleTitle", defaultMessage: "Roles" }))),
                        react_2.default.createElement(eui_1.EuiText, { color: "subdued", size: "s" },
                            react_2.default.createElement("p", null,
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.roles.subtitle", defaultMessage: "Apply roles to groups of users and manage permissions across the stack." })))),
                    react_2.default.createElement(eui_1.EuiPageContentHeaderSection, null,
                        react_2.default.createElement(eui_1.EuiButton, { "data-test-subj": "createRoleButton", href: getRoleManagementHref() },
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.roles.createRoleButtonLabel", defaultMessage: "Create role" })))),
                react_2.default.createElement(eui_1.EuiPageContentBody, null,
                    this.state.showDeleteConfirmation ? (react_2.default.createElement(confirm_delete_1.ConfirmDelete, { onCancel: this.onCancelDelete, rolesToDelete: this.state.selection.map(role => role.name), callback: this.handleDelete })) : null,
                    // @ts-ignore missing rowProps typedef
                    react_2.default.createElement(eui_1.EuiInMemoryTable, { itemId: "name", responsive: false, columns: this.getColumnConfig(intl), selection: {
                            itemId: 'name',
                            selectable: (role) => !role.metadata || !role.metadata._reserved,
                            selectableMessage: (selectable) => !selectable ? 'Role is reserved' : undefined,
                            onSelectionChange: (selection) => this.setState({ selection }),
                        }, pagination: {
                            initialPageSize: 20,
                            pageSizeOptions: [10, 20, 30, 50, 100],
                        }, items: this.getVisibleRoles(), loading: roles.length === 0, search: {
                            toolsLeft: this.renderToolsLeft(),
                            box: {
                                incremental: true,
                            },
                            onChange: (query) => {
                                this.setState({
                                    filter: query.queryText,
                                });
                            },
                        }, sorting: {
                            sort: {
                                field: 'name',
                                direction: 'asc',
                            },
                        }, 
                        // @ts-ignore missing rowProps typedef
                        rowProps: () => {
                            return {
                                'data-test-subj': 'roleRow',
                            };
                        }, isSelectable: true }))));
        };
        this.getColumnConfig = (intl) => {
            const reservedRoleDesc = intl.formatMessage({
                id: 'xpack.security.management.roles.reservedColumnDescription',
                defaultMessage: 'Reserved roles are built-in and cannot be edited or removed.',
            });
            return [
                {
                    field: 'name',
                    name: intl.formatMessage({
                        id: 'xpack.security.management.roles.nameColumnName',
                        defaultMessage: 'Role',
                    }),
                    sortable: true,
                    truncateText: true,
                    render: (name, record) => {
                        return (react_2.default.createElement(eui_1.EuiText, { color: "subdued", size: "s" },
                            react_2.default.createElement(eui_1.EuiLink, { "data-test-subj": "roleRowName", href: getRoleManagementHref(name) }, name),
                            !role_utils_1.isRoleEnabled(record) && (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.roles.disabledTooltip", defaultMessage: " (disabled)" }))));
                    },
                },
                {
                    field: 'metadata._reserved',
                    name: (react_2.default.createElement(eui_1.EuiToolTip, { content: reservedRoleDesc },
                        react_2.default.createElement("span", { className: "rolesGridPage__reservedRoleTooltip" },
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.roles.reservedColumnName", defaultMessage: "Reserved" }),
                            react_2.default.createElement(eui_1.EuiIcon, { size: "s", color: "subdued", type: "questionInCircle", className: "eui-alignTop" })))),
                    sortable: ({ metadata }) => (metadata && metadata._reserved) || false,
                    dataType: 'boolean',
                    align: 'right',
                    description: reservedRoleDesc,
                    render: (reserved) => {
                        const label = intl.formatMessage({
                            id: 'xpack.security.management.roles.reservedRoleIconLabel',
                            defaultMessage: 'Reserved role',
                        });
                        return reserved ? (react_2.default.createElement("span", { title: label },
                            react_2.default.createElement(eui_1.EuiIcon, { "aria-label": label, "data-test-subj": "reservedRole", type: "check" }))) : null;
                    },
                },
            ];
        };
        this.getVisibleRoles = () => {
            const { roles, filter } = this.state;
            return filter
                ? roles.filter(({ name }) => {
                    const normalized = `${name}`.toLowerCase();
                    const normalizedQuery = filter.toLowerCase();
                    return normalized.indexOf(normalizedQuery) !== -1;
                })
                : roles;
        };
        this.handleDelete = () => {
            this.setState({
                selection: [],
                showDeleteConfirmation: false,
            });
            this.loadRoles();
        };
        this.onCancelDelete = () => {
            this.setState({ showDeleteConfirmation: false });
        };
        this.state = {
            roles: [],
            selection: [],
            filter: '',
            showDeleteConfirmation: false,
            permissionDenied: false,
        };
    }
    componentDidMount() {
        this.loadRoles();
    }
    render() {
        const { permissionDenied } = this.state;
        return permissionDenied ? react_2.default.createElement(permission_denied_1.PermissionDenied, null) : this.getPageContent();
    }
    async loadRoles() {
        try {
            const roles = await roles_api_1.RolesApi.getRoles();
            this.setState({ roles });
        }
        catch (e) {
            if (lodash_1.default.get(e, 'body.statusCode') === 403) {
                this.setState({ permissionDenied: true });
            }
            else {
                notify_1.toastNotifications.addDanger(this.props.intl.formatMessage({
                    id: 'xpack.security.management.roles.fetchingRolesErrorMessage',
                    defaultMessage: 'Error fetching roles: {message}',
                }, { message: lodash_1.default.get(e, 'body.message', '') }));
            }
        }
    }
    renderToolsLeft() {
        const { selection } = this.state;
        if (selection.length === 0) {
            return;
        }
        const numSelected = selection.length;
        return (react_2.default.createElement(eui_1.EuiButton, { "data-test-subj": "deleteRoleButton", color: "danger", onClick: () => this.setState({ showDeleteConfirmation: true }) },
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.roles.deleteSelectedRolesButtonLabel", defaultMessage: "Delete {numSelected} role{numSelected, plural, one { } other {s}}", values: {
                    numSelected,
                } })));
    }
}
exports.RolesGridPage = react_1.injectI18n(RolesGridPageUI);
