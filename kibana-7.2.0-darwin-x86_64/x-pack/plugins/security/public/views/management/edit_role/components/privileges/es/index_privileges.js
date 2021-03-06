"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const react_1 = tslib_1.__importStar(require("react"));
const role_utils_1 = require("../../../../../../lib/role_utils");
const objects_1 = require("../../../../../../objects");
const index_privilege_form_1 = require("./index_privilege_form");
class IndexPrivileges extends react_1.Component {
    constructor(props) {
        super(props);
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
        this.onIndexPrivilegeChange = (privilegeIndex) => {
            return (updatedPrivilege) => {
                const { role } = this.props;
                const { indices } = role.elasticsearch;
                const newIndices = [...indices];
                newIndices[privilegeIndex] = updatedPrivilege;
                this.props.onChange({
                    ...this.props.role,
                    elasticsearch: {
                        ...this.props.role.elasticsearch,
                        indices: newIndices,
                    },
                });
                this.loadAvailableFields(newIndices);
            };
        };
        this.onIndexPrivilegeDelete = (privilegeIndex) => {
            return () => {
                const { role } = this.props;
                const newIndices = [...role.elasticsearch.indices];
                newIndices.splice(privilegeIndex, 1);
                this.props.onChange({
                    ...this.props.role,
                    elasticsearch: {
                        ...this.props.role.elasticsearch,
                        indices: newIndices,
                    },
                });
            };
        };
        this.isPlaceholderPrivilege = (indexPrivilege) => {
            return indexPrivilege.names.length === 0;
        };
        this.loadFieldsForPattern = async (pattern) => {
            if (!pattern) {
                return { [pattern]: [] };
            }
            try {
                return {
                    [pattern]: await objects_1.getFields(this.props.httpClient, pattern),
                };
            }
            catch (e) {
                return {
                    [pattern]: [],
                };
            }
        };
        this.state = {
            availableFields: {},
        };
    }
    componentDidMount() {
        this.loadAvailableFields(this.props.role.elasticsearch.indices);
    }
    render() {
        const { indices = [] } = this.props.role.elasticsearch;
        const { indexPatterns, allowDocumentLevelSecurity, allowFieldLevelSecurity } = this.props;
        const props = {
            indexPatterns,
            // If editing an existing role while that has been disabled, always show the FLS/DLS fields because currently
            // a role is only marked as disabled if it has FLS/DLS setup (usually before the user changed to a license that
            // doesn't permit FLS/DLS).
            allowDocumentLevelSecurity: allowDocumentLevelSecurity || !role_utils_1.isRoleEnabled(this.props.role),
            allowFieldLevelSecurity: allowFieldLevelSecurity || !role_utils_1.isRoleEnabled(this.props.role),
            isReadOnlyRole: role_utils_1.isReadOnlyRole(this.props.role),
        };
        const forms = indices.map((indexPrivilege, idx) => (react_1.default.createElement(index_privilege_form_1.IndexPrivilegeForm, Object.assign({ key: idx }, props, { formIndex: idx, validator: this.props.validator, indexPrivilege: indexPrivilege, availableFields: this.state.availableFields[indexPrivilege.names.join(',')], onChange: this.onIndexPrivilegeChange(idx), onDelete: this.onIndexPrivilegeDelete(idx) }))));
        return forms;
    }
    loadAvailableFields(privileges) {
        // readonly roles cannot be edited, and therefore do not need to fetch available fields.
        if (role_utils_1.isReadOnlyRole(this.props.role)) {
            return;
        }
        const patterns = privileges.map(index => index.names.join(','));
        const cachedPatterns = Object.keys(this.state.availableFields);
        const patternsToFetch = lodash_1.default.difference(patterns, cachedPatterns);
        const fetchRequests = patternsToFetch.map(this.loadFieldsForPattern);
        Promise.all(fetchRequests).then(response => {
            this.setState({
                availableFields: {
                    ...this.state.availableFields,
                    ...response.reduce((acc, o) => ({ ...acc, ...o }), {}),
                },
            });
        });
    }
}
exports.IndexPrivileges = IndexPrivileges;
