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
const react_1 = tslib_1.__importDefault(require("react"));
const config_schemas_1 = require("../../../../common/config_schemas");
const config_schemas_translations_map_1 = require("../../../../common/config_schemas_translations_map");
const config_form_1 = require("./config_form");
class ConfigViewUi extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.form = react_1.default.createRef();
        this.schema = config_schemas_translations_map_1.translateConfigSchema(config_schemas_1.configBlockSchemas);
        this.onValueChange = (field) => (e) => {
            const value = e.currentTarget ? e.currentTarget.value : e;
            this.setState((state) => ({
                configBlock: {
                    ...state.configBlock,
                    [field]: value,
                },
            }));
        };
        this.editMode = props.configBlock !== undefined;
        this.state = {
            valid: false,
            configBlock: props.configBlock || {
                type: this.schema[0].id,
            },
        };
    }
    render() {
        const thisConfigSchema = this.schema.find(s => this.state.configBlock.type === s.id);
        if (!thisConfigSchema) {
            return i18n_1.i18n.translate('xpack.beatsManagement.tagConfig.invalidSchema', {
                defaultMessage: 'Error: This config is invalid, it is not supported by Beats and should be removed',
            });
        }
        return (react_1.default.createElement(eui_1.EuiFlyout, { onClose: this.props.onClose },
            react_1.default.createElement(eui_1.EuiFlyoutHeader, { hasBorder: true },
                react_1.default.createElement(eui_1.EuiTitle, { size: "m" },
                    react_1.default.createElement("h2", null, this.editMode
                        ? this.props.onSave
                            ? i18n_1.i18n.translate('xpack.beatsManagement.tagConfig.editConfigurationTitle', {
                                defaultMessage: 'Edit configuration block',
                            })
                            : i18n_1.i18n.translate('xpack.beatsManagement.tagConfig.viewConfigurationTitle"', {
                                defaultMessage: 'View configuration block',
                            })
                        : i18n_1.i18n.translate('xpack.beatsManagement.tagConfig.addConfigurationTitle"', {
                            defaultMessage: 'Add configuration block',
                        })))),
            react_1.default.createElement(eui_1.EuiFlyoutBody, null,
                react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.beatsManagement.tagConfig.typeLabel', {
                        defaultMessage: 'Type',
                    }) },
                    react_1.default.createElement(eui_1.EuiSelect, { options: this.schema.map(s => ({ value: s.id, text: s.name })), value: this.state.configBlock.type, disabled: this.editMode, onChange: this.onValueChange('type') })),
                react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.beatsManagement.tagConfig.descriptionLabel', {
                        defaultMessage: 'Description',
                    }) },
                    react_1.default.createElement(eui_1.EuiFieldText, { value: this.state.configBlock.description, disabled: !this.props.onSave, onChange: this.onValueChange('description'), placeholder: i18n_1.i18n.translate('xpack.beatsManagement.tagConfig.descriptionPlaceholder', {
                            defaultMessage: 'Description (optional)',
                        }) })),
                react_1.default.createElement("h3", null, i18n_1.i18n.translate('xpack.beatsManagement.tagConfig.configurationTypeText', {
                    defaultMessage: '{configType} configuration',
                    values: {
                        configType: thisConfigSchema ? thisConfigSchema.name : 'Unknown',
                    },
                })),
                react_1.default.createElement(eui_1.EuiHorizontalRule, null),
                react_1.default.createElement(config_form_1.ConfigForm, { onSubmit: this.props.onSave
                        ? data => {
                            if (this.props.onSave) {
                                this.props.onSave({
                                    ...this.state.configBlock,
                                    config: data,
                                });
                            }
                            this.props.onClose();
                        }
                        : undefined, canSubmit: canIt => this.setState({ valid: canIt }), ref: this.form, values: this.state.configBlock, id: thisConfigSchema ? thisConfigSchema.name : 'Undefined', schema: thisConfigSchema })),
            react_1.default.createElement(eui_1.EuiFlyoutFooter, null,
                react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween" },
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiButtonEmpty, { iconType: "cross", onClick: this.props.onClose }, i18n_1.i18n.translate('xpack.beatsManagement.tagConfig.closeButtonLabel', {
                            defaultMessage: 'Close',
                        }))),
                    this.props.onSave && (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiButton, { disabled: !this.state.valid, fill: true, onClick: () => {
                                if (this.form.current) {
                                    this.form.current.submit();
                                }
                            } }, i18n_1.i18n.translate('xpack.beatsManagement.tagConfig.saveButtonLabel', {
                            defaultMessage: 'Save',
                        }))))))));
    }
}
exports.ConfigView = ConfigViewUi;
