"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importStar(require("react"));
const space_attributes_1 = require("../../../../../../../../../spaces/common/space_attributes");
const spaceToOption = (space, currentSelection) => {
    if (!space) {
        return;
    }
    return {
        id: `spaceOption_${space.id}`,
        label: space.name,
        color: space_attributes_1.getSpaceColor(space),
        disabled: (currentSelection === 'global' && space.id !== '*') ||
            (currentSelection === 'spaces' && space.id === '*'),
    };
};
const spaceIdToOption = (spaces) => (s) => spaceToOption(spaces.find(space => space.id === s));
class SpaceSelector extends react_1.Component {
    constructor() {
        super(...arguments);
        this.onChange = (selectedSpaces) => {
            this.props.onChange(selectedSpaces.map(s => s.id.split('spaceOption_')[1]));
        };
        this.getOptions = () => {
            const options = this.props.spaces.map(space => spaceToOption(space, this.props.selectedSpaceIds.includes('*')
                ? 'global'
                : this.props.selectedSpaceIds.length > 0
                    ? 'spaces'
                    : undefined));
            return options.filter(Boolean);
        };
        this.getSelectedOptions = () => {
            const options = this.props.selectedSpaceIds.map(spaceIdToOption(this.props.spaces));
            return options.filter(Boolean);
        };
    }
    render() {
        const renderOption = (option, searchValue, contentClassName) => {
            const { color, label } = option;
            return (react_1.default.createElement(eui_1.EuiHealth, { color: color },
                react_1.default.createElement("span", { className: contentClassName },
                    react_1.default.createElement(eui_1.EuiHighlight, { search: searchValue }, label))));
        };
        return (react_1.default.createElement(eui_1.EuiComboBox, { "data-test-subj": 'spaceSelectorComboBox', "aria-label": this.props.intl.formatMessage({
                id: 'xpack.security.management.editRole.spaceSelectorLabel',
                defaultMessage: 'Spaces',
            }), fullWidth: true, options: this.getOptions(), renderOption: renderOption, selectedOptions: this.getSelectedOptions(), isDisabled: this.props.disabled, onChange: this.onChange }));
    }
}
exports.SpaceSelector = SpaceSelector;
