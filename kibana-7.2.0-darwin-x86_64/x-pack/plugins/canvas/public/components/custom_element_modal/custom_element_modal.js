"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable react/forbid-elements */
const react_1 = tslib_1.__importStar(require("react"));
const lodash_1 = require("lodash");
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const eui_1 = require("@elastic/eui");
// @ts-ignore converting /libs/constants to TS breaks CI
const constants_1 = require("../../../common/lib/constants");
const dataurl_1 = require("../../../common/lib/dataurl");
const element_card_1 = require("../element_card");
const MAX_NAME_LENGTH = 40;
const MAX_DESCRIPTION_LENGTH = 100;
class CustomElementModal extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            name: this.props.name || '',
            description: this.props.description || '',
            image: this.props.image || '',
        };
        this._handleChange = (type, value) => {
            this.setState({ [type]: value });
        };
        this._handleUpload = (files) => {
            const [file] = files;
            const [type, subtype] = lodash_1.get(file, 'type', '').split('/');
            if (type === 'image' && constants_1.VALID_IMAGE_TYPES.indexOf(subtype) >= 0) {
                dataurl_1.encode(file).then((dataurl) => this._handleChange('image', dataurl));
            }
        };
    }
    render() {
        const { onSave, onCancel, title, ...rest } = this.props;
        const { name, description, image } = this.state;
        return (react_1.default.createElement(eui_1.EuiModal, Object.assign({}, rest, { className: `canvasCustomElementModal`, maxWidth: 700, onClose: onCancel, initialFocus: ".canvasCustomElementForm__name" }),
            react_1.default.createElement(eui_1.EuiModalHeader, null,
                react_1.default.createElement(eui_1.EuiModalHeaderTitle, null,
                    react_1.default.createElement("h3", null, title))),
            react_1.default.createElement(eui_1.EuiModalBody, null,
                react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween", alignItems: "flexStart" },
                    react_1.default.createElement(eui_1.EuiFlexItem, { className: "canvasCustomElementForm", grow: 2 },
                        react_1.default.createElement(eui_1.EuiFormRow, { label: "Name", helpText: `${MAX_NAME_LENGTH - name.length} characters remaining`, compressed: true },
                            react_1.default.createElement(eui_1.EuiFieldText, { value: name, className: "canvasCustomElementForm__name", onChange: e => e.target.value.length <= MAX_NAME_LENGTH &&
                                    this._handleChange('name', e.target.value), required: true })),
                        react_1.default.createElement(eui_1.EuiFormRow, { label: "Description", helpText: `${MAX_DESCRIPTION_LENGTH - description.length} characters remaining` },
                            react_1.default.createElement(eui_1.EuiTextArea, { value: description, rows: 2, onChange: e => e.target.value.length <= MAX_DESCRIPTION_LENGTH &&
                                    this._handleChange('description', e.target.value) })),
                        react_1.default.createElement(eui_1.EuiFormRow, { className: "canvasCustomElementForm__thumbnail", label: "Thumbnail image", compressed: true },
                            react_1.default.createElement(eui_1.EuiFilePicker, { initialPromptText: "Select or drag and drop an image", onChange: this._handleUpload, className: "canvasImageUpload", accept: "image/*" })),
                        react_1.default.createElement(eui_1.EuiText, { className: "canvasCustomElementForm__thumbnailHelp", size: "xs" },
                            react_1.default.createElement("p", null, "Take a screenshot of your element and upload it here. This can also be done after saving."))),
                    react_1.default.createElement(eui_1.EuiFlexItem, { className: "canvasElementCard__wrapper canvasCustomElementForm__preview", grow: 1 },
                        react_1.default.createElement(eui_1.EuiTitle, { size: "xxxs" },
                            react_1.default.createElement("h4", null, "Element preview")),
                        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
                        react_1.default.createElement(element_card_1.ElementCard, { title: name, description: description, image: image })))),
            react_1.default.createElement(eui_1.EuiModalFooter, null,
                react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "flexEnd" },
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiButtonEmpty, { onClick: onCancel }, "Cancel")),
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiButton, { fill: true, onClick: () => {
                                onSave(name, description, image);
                            } }, "Save"))))));
    }
}
CustomElementModal.propTypes = {
    name: prop_types_1.default.string,
    description: prop_types_1.default.string,
    image: prop_types_1.default.string,
    title: prop_types_1.default.string.isRequired,
    onSave: prop_types_1.default.func.isRequired,
    onCancel: prop_types_1.default.func.isRequired,
};
exports.CustomElementModal = CustomElementModal;
