"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
// @ts-ignore
const documentation_links_1 = require("../../../../../../documentation_links");
const collapsible_panel_1 = require("../../collapsible_panel");
const cluster_privileges_1 = require("./cluster_privileges");
const index_privileges_1 = require("./index_privileges");
class ElasticsearchPrivileges extends react_2.Component {
    constructor() {
        super(...arguments);
        this.getForm = () => {
            const { role, httpClient, validator, onChange, editable, indexPatterns, allowDocumentLevelSecurity, allowFieldLevelSecurity, } = this.props;
            const indexProps = {
                role,
                httpClient,
                validator,
                indexPatterns,
                allowDocumentLevelSecurity,
                allowFieldLevelSecurity,
                onChange,
            };
            return (react_2.default.createElement(react_2.Fragment, null,
                react_2.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_2.default.createElement("h3", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.elasticSearchPrivileges.clusterPrivilegesTitle", defaultMessage: "Cluster privileges" })), description: react_2.default.createElement("p", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.elasticSearchPrivileges.manageRoleActionsDescription", defaultMessage: "Manage the actions this role can perform against your cluster. " }),
                        this.learnMore(documentation_links_1.documentationLinks.esClusterPrivileges)) },
                    react_2.default.createElement(eui_1.EuiFormRow, { fullWidth: true, hasEmptyLabelSpace: true },
                        react_2.default.createElement(cluster_privileges_1.ClusterPrivileges, { role: this.props.role, onChange: this.onClusterPrivilegesChange }))),
                react_2.default.createElement(eui_1.EuiSpacer, null),
                react_2.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_2.default.createElement("h3", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.elasticSearchPrivileges.runAsPrivilegesTitle", defaultMessage: "Run As privileges" })), description: react_2.default.createElement("p", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.elasticSearchPrivileges.howToBeSubmittedOnBehalfOfOtherUsersDescription", defaultMessage: "Allow requests to be submitted on the behalf of other users. " }),
                        this.learnMore(documentation_links_1.documentationLinks.esRunAsPrivileges)) },
                    react_2.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true },
                        react_2.default.createElement(eui_1.EuiComboBox, { placeholder: this.props.editable
                                ? i18n_1.i18n.translate('xpack.security.management.editRole.elasticSearchPrivileges.addUserTitle', { defaultMessage: 'Add a user???' })
                                : undefined, options: this.props.runAsUsers.map(username => ({
                                id: username,
                                label: username,
                                isGroupLabelOption: false,
                            })), selectedOptions: this.props.role.elasticsearch.run_as.map(u => ({ label: u })), onCreateOption: this.onCreateRunAsOption, onChange: this.onRunAsUserChange, isDisabled: !editable }))),
                react_2.default.createElement(eui_1.EuiSpacer, null),
                react_2.default.createElement(eui_1.EuiTitle, { size: 'xs' },
                    react_2.default.createElement("h3", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.elasticSearchPrivileges.indexPrivilegesTitle", defaultMessage: "Index privileges" }))),
                react_2.default.createElement(eui_1.EuiSpacer, { size: 's' }),
                react_2.default.createElement(eui_1.EuiText, { size: 's', color: 'subdued' },
                    react_2.default.createElement("p", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.elasticSearchPrivileges.controlAccessToClusterDataDescription", defaultMessage: "Control access to the data in your cluster. " }),
                        this.learnMore(documentation_links_1.documentationLinks.esIndicesPrivileges))),
                react_2.default.createElement(index_privileges_1.IndexPrivileges, Object.assign({}, indexProps)),
                react_2.default.createElement(eui_1.EuiHorizontalRule, null),
                this.props.editable && (react_2.default.createElement(eui_1.EuiButton, { iconType: 'plusInCircleFilled', onClick: this.addIndexPrivilege },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.elasticSearchPrivileges.addIndexPrivilegesButtonLabel", defaultMessage: "Add index privilege" })))));
        };
        this.learnMore = (href) => (react_2.default.createElement(eui_1.EuiLink, { className: "editRole__learnMore", href: href, target: '_blank' },
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.elasticSearchPrivileges.learnMoreLinkText", defaultMessage: "Learn more" })));
        this.addIndexPrivilege = () => {
            const { role } = this.props;
            const newIndices = [
                ...role.elasticsearch.indices,
                {
                    names: [],
                    privileges: [],
                    field_security: {
                        grant: ['*'],
                    },
                },
            ];
            this.props.onChange({
                ...this.props.role,
                elasticsearch: {
                    ...this.props.role.elasticsearch,
                    indices: newIndices,
                },
            });
        };
        this.onClusterPrivilegesChange = (cluster) => {
            const role = {
                ...this.props.role,
                elasticsearch: {
                    ...this.props.role.elasticsearch,
                    cluster,
                },
            };
            this.props.onChange(role);
        };
        this.onRunAsUserChange = (users) => {
            const role = {
                ...this.props.role,
                elasticsearch: {
                    ...this.props.role.elasticsearch,
                    run_as: users.map((u) => u.label),
                },
            };
            this.props.onChange(role);
        };
        this.onCreateRunAsOption = (option) => {
            const newRunAsUsers = this.props.role.elasticsearch.run_as.concat(option);
            const role = {
                ...this.props.role,
                elasticsearch: {
                    ...this.props.role.elasticsearch,
                    run_as: newRunAsUsers,
                },
            };
            this.props.onChange(role);
        };
    }
    render() {
        return (react_2.default.createElement(collapsible_panel_1.CollapsiblePanel, { iconType: 'logoElasticsearch', title: 'Elasticsearch' }, this.getForm()));
    }
}
exports.ElasticsearchPrivileges = ElasticsearchPrivileges;
