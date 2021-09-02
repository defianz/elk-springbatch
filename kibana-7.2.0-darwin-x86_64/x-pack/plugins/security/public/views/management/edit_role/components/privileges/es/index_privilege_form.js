"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const react_2 = tslib_1.__importStar(require("react"));
// @ts-ignore
const role_privileges_1 = require("../../../../../../services/role_privileges");
const fromOption = (option) => option.label;
const toOption = (value) => ({ label: value });
class IndexPrivilegeForm extends react_2.Component {
    constructor(props) {
        super(props);
        this.getPrivilegeForm = () => {
            return (react_2.default.createElement(react_2.Fragment, null,
                react_2.default.createElement(eui_1.EuiFlexGroup, null,
                    react_2.default.createElement(eui_1.EuiFlexItem, null,
                        react_2.default.createElement(eui_1.EuiFormRow, Object.assign({ label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.indexPrivilegeForm.indicesFormRowLabel", defaultMessage: "Indices" }), fullWidth: true }, this.props.validator.validateIndexPrivilege(this.props.indexPrivilege)),
                            react_2.default.createElement(eui_1.EuiComboBox, { "data-test-subj": `indicesInput${this.props.formIndex}`, options: this.props.indexPatterns.map(toOption), selectedOptions: this.props.indexPrivilege.names.map(toOption), onCreateOption: this.onCreateIndexPatternOption, onChange: this.onIndexPatternsChange, isDisabled: this.props.isReadOnlyRole }))),
                    react_2.default.createElement(eui_1.EuiFlexItem, null,
                        react_2.default.createElement(eui_1.EuiFormRow, { label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.indexPrivilegeForm.privilegesFormRowLabel", defaultMessage: "Privileges" }), fullWidth: true },
                            react_2.default.createElement(eui_1.EuiComboBox, { "data-test-subj": `privilegesInput${this.props.formIndex}`, options: role_privileges_1.getIndexPrivileges().map(toOption), selectedOptions: this.props.indexPrivilege.privileges.map(toOption), onChange: this.onPrivilegeChange, isDisabled: this.props.isReadOnlyRole })))),
                react_2.default.createElement(eui_1.EuiSpacer, null),
                this.getFieldLevelControls(),
                this.getGrantedDocumentsControl()));
        };
        this.getFieldLevelControls = () => {
            const { allowFieldLevelSecurity, allowDocumentLevelSecurity, availableFields, indexPrivilege, isReadOnlyRole, } = this.props;
            if (!allowFieldLevelSecurity) {
                return null;
            }
            const { grant, except } = this.getFieldSecurity(indexPrivilege);
            return (react_2.default.createElement(react_2.default.Fragment, null,
                react_2.default.createElement(eui_1.EuiFlexGroup, { direction: "column" },
                    !isReadOnlyRole && (react_2.default.createElement(eui_1.EuiFlexItem, null, 
                    // @ts-ignore missing "compressed" prop definition
                    react_2.default.createElement(eui_1.EuiSwitch, { "data-test-subj": `restrictFieldsQuery${this.props.formIndex}`, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRoles.indexPrivilegeForm.grantFieldPrivilegesLabel", defaultMessage: "Grant access to specific fields" }), compressed: true, checked: this.state.fieldSecurityExpanded, onChange: this.toggleFieldSecurity }))),
                    this.state.fieldSecurityExpanded && (react_2.default.createElement(eui_1.EuiFlexItem, null,
                        react_2.default.createElement(eui_1.EuiFlexGroup, null,
                            react_2.default.createElement(eui_1.EuiFlexItem, null,
                                react_2.default.createElement(eui_1.EuiFormRow, { label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRoles.indexPrivilegeForm.grantedFieldsFormRowLabel", defaultMessage: "Granted fields" }), fullWidth: true, className: "indexPrivilegeForm__grantedFieldsRow", helpText: !isReadOnlyRole && grant.length === 0 ? (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRoles.indexPrivilegeForm.grantedFieldsFormRowHelpText", defaultMessage: "If no fields are granted, then users assigned to this role will not be able to see any data for this index." })) : (undefined) },
                                    react_2.default.createElement(react_2.Fragment, null,
                                        react_2.default.createElement(eui_1.EuiComboBox, { "data-test-subj": `fieldInput${this.props.formIndex}`, options: availableFields ? availableFields.map(toOption) : [], selectedOptions: grant.map(toOption), onCreateOption: this.onCreateGrantedField, onChange: this.onGrantedFieldsChange, isDisabled: this.props.isReadOnlyRole })))),
                            react_2.default.createElement(eui_1.EuiFlexItem, null,
                                react_2.default.createElement(eui_1.EuiFormRow, { label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRoles.indexPrivilegeForm.deniedFieldsFormRowLabel", defaultMessage: "Denied fields" }), fullWidth: true, className: "indexPrivilegeForm__deniedFieldsRow" },
                                    react_2.default.createElement(react_2.Fragment, null,
                                        react_2.default.createElement(eui_1.EuiComboBox, { "data-test-subj": `deniedFieldInput${this.props.formIndex}`, options: availableFields ? availableFields.map(toOption) : [], selectedOptions: except.map(toOption), onCreateOption: this.onCreateDeniedField, onChange: this.onDeniedFieldsChange, isDisabled: isReadOnlyRole })))))))),
                allowDocumentLevelSecurity && react_2.default.createElement(eui_1.EuiSpacer, null)));
        };
        this.getGrantedDocumentsControl = () => {
            const { allowDocumentLevelSecurity, indexPrivilege, isReadOnlyRole } = this.props;
            if (!allowDocumentLevelSecurity) {
                return null;
            }
            return (
            // @ts-ignore
            react_2.default.createElement(eui_1.EuiFlexGroup, { direction: "column" },
                !this.props.isReadOnlyRole && (react_2.default.createElement(eui_1.EuiFlexItem, null, 
                // @ts-ignore missing "compressed" proptype
                react_2.default.createElement(eui_1.EuiSwitch, { "data-test-subj": `restrictDocumentsQuery${this.props.formIndex}`, label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.indexPrivilegeForm.grantReadPrivilegesLabel", defaultMessage: "Grant read privileges to specific documents" }), compressed: true, checked: this.state.queryExpanded, onChange: this.toggleDocumentQuery, disabled: isReadOnlyRole }))),
                this.state.queryExpanded && (react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiFormRow, { label: react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.indexPrivilegeForm.grantedDocumentsQueryFormRowLabel", defaultMessage: "Granted documents query" }), fullWidth: true },
                        react_2.default.createElement(eui_1.EuiTextArea, { "data-test-subj": `queryInput${this.props.formIndex}`, style: { resize: 'none' }, fullWidth: true, value: indexPrivilege.query, onChange: this.onQueryChange, readOnly: this.props.isReadOnlyRole }))))));
        };
        this.toggleDocumentQuery = () => {
            const willToggleOff = this.state.queryExpanded;
            const willToggleOn = !willToggleOff;
            // If turning off, then save the current query in state so that we can restore it if the user changes their mind.
            this.setState({
                queryExpanded: !this.state.queryExpanded,
                documentQuery: willToggleOff ? this.props.indexPrivilege.query : this.state.documentQuery,
            });
            // If turning off, then remove the query from the Index Privilege
            if (willToggleOff) {
                this.props.onChange({
                    ...this.props.indexPrivilege,
                    query: '',
                });
            }
            // If turning on, then restore the saved query if available
            if (willToggleOn && !this.props.indexPrivilege.query && this.state.documentQuery) {
                this.props.onChange({
                    ...this.props.indexPrivilege,
                    query: this.state.documentQuery,
                });
            }
        };
        this.toggleFieldSecurity = () => {
            const willToggleOff = this.state.fieldSecurityExpanded;
            const willToggleOn = !willToggleOff;
            const { grant, except } = this.getFieldSecurity(this.props.indexPrivilege);
            // If turning off, then save the current configuration in state so that we can restore it if the user changes their mind.
            this.setState({
                fieldSecurityExpanded: !this.state.fieldSecurityExpanded,
                grantedFields: willToggleOff ? grant : this.state.grantedFields,
                exceptedFields: willToggleOff ? except : this.state.exceptedFields,
            });
            // If turning off, then remove the field security from the Index Privilege
            if (willToggleOff) {
                this.props.onChange({
                    ...this.props.indexPrivilege,
                    field_security: {
                        grant: ['*'],
                        except: [],
                    },
                });
            }
            // If turning on, then restore the saved field security if available
            const hasConfiguredFieldSecurity = this.isFieldSecurityConfigured(this.props.indexPrivilege);
            const hasSavedFieldSecurity = this.state.exceptedFields.length > 0 || this.state.grantedFields.length > 0;
            if (willToggleOn && !hasConfiguredFieldSecurity && hasSavedFieldSecurity) {
                this.props.onChange({
                    ...this.props.indexPrivilege,
                    field_security: {
                        grant: this.state.grantedFields,
                        except: this.state.exceptedFields,
                    },
                });
            }
        };
        this.onCreateIndexPatternOption = (option) => {
            const newIndexPatterns = this.props.indexPrivilege.names.concat([option]);
            this.props.onChange({
                ...this.props.indexPrivilege,
                names: newIndexPatterns,
            });
        };
        this.onIndexPatternsChange = (newPatterns) => {
            this.props.onChange({
                ...this.props.indexPrivilege,
                names: newPatterns.map(fromOption),
            });
        };
        this.onPrivilegeChange = (newPrivileges) => {
            this.props.onChange({
                ...this.props.indexPrivilege,
                privileges: newPrivileges.map(fromOption),
            });
        };
        this.onQueryChange = (e) => {
            this.props.onChange({
                ...this.props.indexPrivilege,
                query: e.target.value,
            });
        };
        this.onCreateGrantedField = (grant) => {
            if (!this.props.indexPrivilege.field_security ||
                !this.props.indexPrivilege.field_security.grant) {
                return;
            }
            const newGrants = this.props.indexPrivilege.field_security.grant.concat([grant]);
            this.props.onChange({
                ...this.props.indexPrivilege,
                field_security: {
                    ...this.props.indexPrivilege.field_security,
                    grant: newGrants,
                },
            });
        };
        this.onGrantedFieldsChange = (grantedFields) => {
            this.props.onChange({
                ...this.props.indexPrivilege,
                field_security: {
                    ...this.props.indexPrivilege.field_security,
                    grant: grantedFields.map(fromOption),
                },
            });
        };
        this.onCreateDeniedField = (except) => {
            if (!this.props.indexPrivilege.field_security ||
                !this.props.indexPrivilege.field_security.except) {
                return;
            }
            const newExcepts = this.props.indexPrivilege.field_security.except.concat([except]);
            this.props.onChange({
                ...this.props.indexPrivilege,
                field_security: {
                    ...this.props.indexPrivilege.field_security,
                    except: newExcepts,
                },
            });
        };
        this.onDeniedFieldsChange = (deniedFields) => {
            this.props.onChange({
                ...this.props.indexPrivilege,
                field_security: {
                    ...this.props.indexPrivilege.field_security,
                    except: deniedFields.map(fromOption),
                },
            });
        };
        this.getFieldSecurity = (indexPrivilege) => {
            const { grant = [], except = [] } = indexPrivilege.field_security || {};
            return { grant, except };
        };
        this.isFieldSecurityConfigured = (indexPrivilege) => {
            const { grant, except } = this.getFieldSecurity(indexPrivilege);
            return except.length > 0 || (grant.length > 0 && !lodash_1.default.isEqual(grant, ['*']));
        };
        const { grant, except } = this.getFieldSecurity(props.indexPrivilege);
        this.state = {
            queryExpanded: !!props.indexPrivilege.query,
            fieldSecurityExpanded: this.isFieldSecurityConfigured(props.indexPrivilege),
            grantedFields: grant,
            exceptedFields: except,
            documentQuery: props.indexPrivilege.query,
        };
    }
    render() {
        return (react_2.default.createElement(react_2.Fragment, null,
            react_2.default.createElement(eui_1.EuiHorizontalRule, null),
            react_2.default.createElement(eui_1.EuiFlexGroup, { className: "index-privilege-form" },
                react_2.default.createElement(eui_1.EuiFlexItem, null, this.getPrivilegeForm()),
                !this.props.isReadOnlyRole && (react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiFormRow, { hasEmptyLabelSpace: true },
                        react_2.default.createElement(eui_1.EuiButtonIcon, { "aria-label": i18n_1.i18n.translate('xpack.security.management.editRole.indexPrivilegeForm.deleteSpacePrivilegeAriaLabel', { defaultMessage: 'Delete index privilege' }), color: 'danger', onClick: this.props.onDelete, iconType: 'trash' })))))));
    }
}
exports.IndexPrivilegeForm = IndexPrivilegeForm;
