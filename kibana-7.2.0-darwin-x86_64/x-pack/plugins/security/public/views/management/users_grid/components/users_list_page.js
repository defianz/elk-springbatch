"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const notify_1 = require("ui/notify");
const react_2 = require("@kbn/i18n/react");
const users_1 = require("../../../../components/management/users");
class UsersListPageUI extends react_1.Component {
    constructor(props) {
        super(props);
        this.handleDelete = (usernames, errors) => {
            const { users } = this.state;
            this.setState({
                selection: [],
                showDeleteConfirmation: false,
                users: users.filter(({ username }) => {
                    return !usernames.includes(username) || errors.includes(username);
                }),
            });
        };
        this.onCancelDelete = () => {
            this.setState({ showDeleteConfirmation: false });
        };
        this.state = {
            users: [],
            selection: [],
            showDeleteConfirmation: false,
            permissionDenied: false,
            filter: '',
        };
    }
    componentDidMount() {
        this.loadUsers();
    }
    render() {
        const { users, filter, permissionDenied, showDeleteConfirmation, selection } = this.state;
        const { intl } = this.props;
        if (permissionDenied) {
            return (react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "none" },
                react_1.default.createElement(eui_1.EuiPageContent, { horizontalPosition: "center" },
                    react_1.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "securityApp", title: react_1.default.createElement("h2", null,
                            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.deniedPermissionTitle", defaultMessage: "You need permission to manage users" })), body: react_1.default.createElement("p", { "data-test-subj": "permissionDeniedMessage" },
                            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.permissionDeniedToManageUsersDescription", defaultMessage: "Contact your system administrator." })) }))));
        }
        const path = '#/management/security/';
        const columns = [
            {
                field: 'full_name',
                name: intl.formatMessage({
                    id: 'xpack.security.management.users.fullNameColumnName',
                    defaultMessage: 'Full Name',
                }),
                sortable: true,
                truncateText: true,
                render: (fullName) => {
                    return react_1.default.createElement("div", { "data-test-subj": "userRowFullName" }, fullName);
                },
            },
            {
                field: 'username',
                name: intl.formatMessage({
                    id: 'xpack.security.management.users.userNameColumnName',
                    defaultMessage: 'User Name',
                }),
                sortable: true,
                truncateText: true,
                render: (username) => (react_1.default.createElement(eui_1.EuiLink, { "data-test-subj": "userRowUserName", href: `${path}users/edit/${username}` }, username)),
            },
            {
                field: 'email',
                name: intl.formatMessage({
                    id: 'xpack.security.management.users.emailAddressColumnName',
                    defaultMessage: 'Email Address',
                }),
                sortable: true,
                truncateText: true,
                render: (email) => {
                    return react_1.default.createElement("div", { "data-test-subj": "userRowEmail" }, email);
                },
            },
            {
                field: 'roles',
                name: intl.formatMessage({
                    id: 'xpack.security.management.users.rolesColumnName',
                    defaultMessage: 'Roles',
                }),
                render: (rolenames) => {
                    const roleLinks = rolenames.map((rolename, index) => {
                        return (react_1.default.createElement(react_1.Fragment, { key: rolename },
                            react_1.default.createElement(eui_1.EuiLink, { href: `${path}roles/edit/${rolename}` }, rolename),
                            index === rolenames.length - 1 ? null : ', '));
                    });
                    return react_1.default.createElement("div", { "data-test-subj": "userRowRoles" }, roleLinks);
                },
            },
            {
                field: 'metadata._reserved',
                name: intl.formatMessage({
                    id: 'xpack.security.management.users.reservedColumnName',
                    defaultMessage: 'Reserved',
                }),
                sortable: false,
                width: '100px',
                align: 'right',
                description: intl.formatMessage({
                    id: 'xpack.security.management.users.reservedColumnDescription',
                    defaultMessage: 'Reserved users are built-in and cannot be removed. Only the password can be changed.',
                }),
                render: (reserved) => reserved ? (react_1.default.createElement(eui_1.EuiIcon, { "aria-label": "Reserved user", "data-test-subj": "reservedUser", type: "check" })) : null,
            },
        ];
        const pagination = {
            initialPageSize: 20,
            pageSizeOptions: [10, 20, 50, 100],
        };
        const selectionConfig = {
            itemId: 'username',
            selectable: (user) => !(user.metadata && user.metadata._reserved),
            selectableMessage: (selectable) => !selectable ? 'User is a system user' : undefined,
            onSelectionChange: (updatedSelection) => this.setState({ selection: updatedSelection }),
        };
        const search = {
            toolsLeft: this.renderToolsLeft(),
            box: {
                incremental: true,
            },
            onChange: (query) => {
                this.setState({
                    filter: query.queryText,
                });
            },
        };
        const sorting = {
            sort: {
                field: 'full_name',
                direction: 'asc',
            },
        };
        const rowProps = () => {
            return {
                'data-test-subj': 'userRow',
            };
        };
        const usersToShow = filter
            ? users.filter(({ username, roles, full_name: fullName = '', email = '' }) => {
                const normalized = `${username} ${roles.join(' ')} ${fullName} ${email}`.toLowerCase();
                const normalizedQuery = filter.toLowerCase();
                return normalized.indexOf(normalizedQuery) !== -1;
            })
            : users;
        return (react_1.default.createElement("div", { className: "secUsersListingPage" },
            react_1.default.createElement(eui_1.EuiPageContent, { className: "secUsersListingPage__content" },
                react_1.default.createElement(eui_1.EuiPageContentHeader, null,
                    react_1.default.createElement(eui_1.EuiPageContentHeaderSection, null,
                        react_1.default.createElement(eui_1.EuiTitle, null,
                            react_1.default.createElement("h2", null,
                                react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.usersTitle", defaultMessage: "Users" })))),
                    react_1.default.createElement(eui_1.EuiPageContentHeaderSection, null,
                        react_1.default.createElement(eui_1.EuiButton, { "data-test-subj": "createUserButton", href: "#/management/security/users/edit" },
                            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.createNewUserButtonLabel", defaultMessage: "Create user" })))),
                react_1.default.createElement(eui_1.EuiPageContentBody, null,
                    showDeleteConfirmation ? (react_1.default.createElement(users_1.ConfirmDeleteUsers, { onCancel: this.onCancelDelete, usersToDelete: selection.map(user => user.username), callback: this.handleDelete, apiClient: this.props.apiClient })) : null,
                    // @ts-ignore missing responsive from typedef
                    react_1.default.createElement(eui_1.EuiInMemoryTable, { itemId: "username", columns: columns, selection: selectionConfig, pagination: pagination, items: usersToShow, loading: users.length === 0, search: search, sorting: sorting, 
                        // @ts-ignore missing responsive from typedef
                        rowProps: rowProps, isSelectable: true })))));
    }
    async loadUsers() {
        try {
            const users = await this.props.apiClient.getUsers();
            this.setState({ users });
        }
        catch (e) {
            if (e.body.statusCode === 403) {
                this.setState({ permissionDenied: true });
            }
            else {
                notify_1.toastNotifications.addDanger(this.props.intl.formatMessage({
                    id: 'xpack.security.management.users.fetchingUsersErrorMessage',
                    defaultMessage: 'Error fetching users: {message}',
                }, { message: e.body.message }));
            }
        }
    }
    renderToolsLeft() {
        const { selection } = this.state;
        if (selection.length === 0) {
            return;
        }
        const numSelected = selection.length;
        return (react_1.default.createElement(eui_1.EuiButton, { "data-test-subj": "deleteUserButton", color: "danger", onClick: () => this.setState({ showDeleteConfirmation: true }) },
            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.security.management.users.deleteUsersButtonLabel", defaultMessage: "Delete {numSelected} user{numSelected, plural, one { } other {s}}", values: {
                    numSelected,
                } })));
    }
}
exports.UsersListPage = react_2.injectI18n(UsersListPageUI);
