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
const lib_1 = require("../../lib");
class SpaceIdentifierUI extends react_2.Component {
    constructor(props) {
        super(props);
        this.textFieldRef = null;
        this.getLabel = () => {
            if (!this.props.editable) {
                return (react_2.default.createElement("p", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.spaceIdentifier.urlIdentifierTitle", defaultMessage: "URL identifier" })));
            }
            const editLinkText = this.state.editing ? (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.spaceIdentifier.resetSpaceNameLinkText", defaultMessage: "[reset]" })) : (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.spaceIdentifier.customizeSpaceLinkText", defaultMessage: "[customize]" }));
            const editLinkLabel = this.state.editing
                ? this.props.intl.formatMessage({
                    id: 'xpack.spaces.management.spaceIdentifier.resetSpaceNameLinkLabel',
                    defaultMessage: 'Reset the URL identifier',
                })
                : this.props.intl.formatMessage({
                    id: 'xpack.spaces.management.spaceIdentifier.customizeSpaceNameLinkLabel',
                    defaultMessage: 'Customize the URL identifier',
                });
            return (react_2.default.createElement("p", null,
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.spaceIdentifier.urlIdentifierLabel", defaultMessage: "URL identifier " }),
                react_2.default.createElement(eui_1.EuiLink, { onClick: this.onEditClick, "aria-label": editLinkLabel }, editLinkText)));
        };
        this.getHelpText = (identifier = this.props.intl.formatMessage({
            id: 'xpack.spaces.management.spaceIdentifier.emptySpaceIdentifierText',
            defaultMessage: 'awesome-space',
        })) => {
            return (react_2.default.createElement("p", null,
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.spaceIdentifier.kibanaURLForSpaceIdentifierDescription", defaultMessage: "Example: https://my-kibana.example{spaceIdentifier}/app/kibana.", values: {
                        spaceIdentifier: react_2.default.createElement("strong", null,
                            "/s/",
                            identifier),
                    } })));
        };
        this.onEditClick = () => {
            const currentlyEditing = this.state.editing;
            if (currentlyEditing) {
                // "Reset" clicked. Create space identifier based on the space name.
                const resetIdentifier = lib_1.toSpaceIdentifier(this.props.space.name);
                this.setState({
                    editing: false,
                });
                this.props.onChange(resetIdentifier);
            }
            else {
                this.setState({
                    editing: true,
                }, () => {
                    if (this.textFieldRef) {
                        this.textFieldRef.focus();
                    }
                });
            }
        };
        this.onChange = (e) => {
            if (!this.state.editing) {
                return;
            }
            this.props.onChange(e.target.value);
        };
        this.state = {
            editing: false,
        };
    }
    render() {
        const { intl } = this.props;
        const { id = '' } = this.props.space;
        return (react_2.default.createElement(react_2.Fragment, null,
            react_2.default.createElement(eui_1.EuiFormRow, Object.assign({ label: this.getLabel(), helpText: this.getHelpText(id) }, this.props.validator.validateURLIdentifier(this.props.space), { fullWidth: true }),
                react_2.default.createElement(eui_1.EuiFieldText, { readOnly: !this.state.editing, placeholder: this.state.editing || !this.props.editable
                        ? undefined
                        : intl.formatMessage({
                            id: 'xpack.spaces.management.spaceIdentifier.urlIdentifierGeneratedFromSpaceNameTooltip',
                            defaultMessage: 'awesome-space',
                        }), value: id, onChange: this.onChange, inputRef: ref => (this.textFieldRef = ref), fullWidth: true }))));
    }
}
exports.SpaceIdentifier = react_1.injectI18n(SpaceIdentifierUI);
