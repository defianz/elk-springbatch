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
const react_2 = tslib_1.__importStar(require("react"));
const common_1 = require("../../../../../common");
const components_1 = require("../../../../components");
const lib_1 = require("../../lib");
const section_panel_1 = require("../section_panel");
const customize_space_avatar_1 = require("./customize_space_avatar");
const space_identifier_1 = require("./space_identifier");
class CustomizeSpace extends react_2.Component {
    constructor() {
        super(...arguments);
        this.state = {
            customizingAvatar: false,
            usingCustomIdentifier: false,
        };
        this.togglePopover = () => {
            this.setState({
                customizingAvatar: !this.state.customizingAvatar,
            });
        };
        this.closePopover = () => {
            this.setState({
                customizingAvatar: false,
            });
        };
        this.getPanelDescription = () => {
            return this.props.editingExistingSpace ? (react_2.default.createElement("p", null,
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.manageSpacePage.customizeSpacePanelUrlIdentifierNotEditable", defaultMessage: "The url identifier cannot be changed." }))) : (react_2.default.createElement("p", null,
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.manageSpacePage.customizeSpacePanelUrlIdentifierEditable", defaultMessage: "Note the URL identifier. You cannot change it after you create the space." })));
        };
        this.onNameChange = (e) => {
            if (!this.props.space) {
                return;
            }
            const canUpdateId = !this.props.editingExistingSpace && !this.state.usingCustomIdentifier;
            let { id } = this.props.space;
            if (canUpdateId) {
                id = lib_1.toSpaceIdentifier(e.target.value);
            }
            this.props.onChange({
                ...this.props.space,
                name: e.target.value,
                id,
            });
        };
        this.onDescriptionChange = (e) => {
            this.props.onChange({
                ...this.props.space,
                description: e.target.value,
            });
        };
        this.onSpaceIdentifierChange = (updatedIdentifier) => {
            const usingCustomIdentifier = updatedIdentifier !== lib_1.toSpaceIdentifier(this.props.space.name);
            this.setState({
                usingCustomIdentifier,
            });
            this.props.onChange({
                ...this.props.space,
                id: lib_1.toSpaceIdentifier(updatedIdentifier),
            });
        };
        this.onAvatarChange = (space) => {
            this.props.onChange(space);
        };
    }
    render() {
        const { validator, editingExistingSpace, intl } = this.props;
        const { name = '', description = '' } = this.props.space;
        const panelTitle = intl.formatMessage({
            id: 'xpack.spaces.management.manageSpacePage.customizeSpaceTitle',
            defaultMessage: 'Customize your space',
        });
        const extraPopoverProps = {
            initialFocus: 'input[name="spaceInitials"]',
        };
        return (react_2.default.createElement(section_panel_1.SectionPanel, { collapsible: false, title: panelTitle, description: panelTitle, intl: this.props.intl },
            react_2.default.createElement(eui_1.EuiDescribedFormGroup, { title: react_2.default.createElement(eui_1.EuiTitle, { size: "xs" },
                    react_2.default.createElement("h3", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.manageSpacePage.customizeSpacePanelDescription", defaultMessage: "Name your space and customize its avatar." }))), description: this.getPanelDescription(), fullWidth: true },
                react_2.default.createElement(eui_1.EuiFlexGroup, { responsive: false },
                    react_2.default.createElement(eui_1.EuiFlexItem, null,
                        react_2.default.createElement(eui_1.EuiFormRow, Object.assign({ label: intl.formatMessage({
                                id: 'xpack.spaces.management.manageSpacePage.nameFormRowLabel',
                                defaultMessage: 'Name',
                            }) }, validator.validateSpaceName(this.props.space), { fullWidth: true }),
                            react_2.default.createElement(eui_1.EuiFieldText, { name: "name", placeholder: intl.formatMessage({
                                    id: 'xpack.spaces.management.manageSpacePage.awesomeSpacePlaceholder',
                                    defaultMessage: 'Awesome space',
                                }), value: name, onChange: this.onNameChange, fullWidth: true }))),
                    react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_2.default.createElement(eui_1.EuiFormRow, { label: intl.formatMessage({
                                id: 'xpack.spaces.management.manageSpacePage.avatarFormRowLabel',
                                defaultMessage: 'Avatar',
                            }) },
                            react_2.default.createElement(eui_1.EuiPopover, Object.assign({ id: "customizeAvatarPopover", button: react_2.default.createElement("button", { title: intl.formatMessage({
                                        id: 'xpack.spaces.management.manageSpacePage.clickToCustomizeTooltip',
                                        defaultMessage: 'Click to customize this space avatar',
                                    }), onClick: this.togglePopover },
                                    react_2.default.createElement(components_1.SpaceAvatar, { space: this.props.space, size: "l" })), closePopover: this.closePopover }, extraPopoverProps, { ownFocus: true, isOpen: this.state.customizingAvatar }),
                                react_2.default.createElement("div", { style: { maxWidth: 240 } },
                                    react_2.default.createElement(customize_space_avatar_1.CustomizeSpaceAvatar, { space: this.props.space, onChange: this.onAvatarChange })))))),
                react_2.default.createElement(eui_1.EuiSpacer, null),
                this.props.space && common_1.isReservedSpace(this.props.space) ? null : (react_2.default.createElement(react_2.Fragment, null,
                    react_2.default.createElement(space_identifier_1.SpaceIdentifier, { space: this.props.space, editable: !editingExistingSpace, onChange: this.onSpaceIdentifierChange, validator: validator }))),
                react_2.default.createElement(eui_1.EuiFormRow, Object.assign({ label: intl.formatMessage({
                        id: 'xpack.spaces.management.manageSpacePage.spaceDescriptionFormRowLabel',
                        defaultMessage: 'Description (optional)',
                    }), helpText: intl.formatMessage({
                        id: 'xpack.spaces.management.manageSpacePage.spaceDescriptionHelpText',
                        defaultMessage: 'The description appears on the Space selection screen.',
                    }) }, validator.validateSpaceDescription(this.props.space), { fullWidth: true }),
                    react_2.default.createElement(eui_1.EuiTextArea, { name: "description", value: description, onChange: this.onDescriptionChange, fullWidth: true, rows: 2 })))));
    }
}
exports.CustomizeSpace = CustomizeSpace;
