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
const uuid_1 = require("uuid");
const eui_styled_components_1 = require("../../../../../common/eui_styled_components");
exports.AddLogColumnButtonAndPopover = ({ addLogColumn, availableFields, isDisabled }) => {
    const [isOpen, openPopover, closePopover] = usePopoverVisibilityState(false);
    const availableColumnOptions = react_2.useMemo(() => [
        {
            optionProps: {
                append: react_2.default.createElement(SystemColumnBadge, null),
                'data-test-subj': 'addTimestampLogColumn',
                // this key works around EuiSelectable using a lowercased label as
                // key, which leads to conflicts with field names
                key: 'timestamp',
                label: 'Timestamp',
            },
            columnConfiguration: {
                timestampColumn: {
                    id: uuid_1.v4(),
                },
            },
        },
        {
            optionProps: {
                'data-test-subj': 'addMessageLogColumn',
                append: react_2.default.createElement(SystemColumnBadge, null),
                // this key works around EuiSelectable using a lowercased label as
                // key, which leads to conflicts with field names
                key: 'message',
                label: 'Message',
            },
            columnConfiguration: {
                messageColumn: {
                    id: uuid_1.v4(),
                },
            },
        },
        ...availableFields.map(field => ({
            optionProps: {
                'data-test-subj': `addFieldLogColumn addFieldLogColumn:${field}`,
                // this key works around EuiSelectable using a lowercased label as
                // key, which leads to conflicts with fields that only differ in the
                // case (e.g. the metricbeat mongodb module)
                key: `field-${field}`,
                label: field,
            },
            columnConfiguration: {
                fieldColumn: {
                    id: uuid_1.v4(),
                    field,
                },
            },
        })),
    ], [availableFields]);
    const availableOptions = react_2.useMemo(() => availableColumnOptions.map(availableColumnOption => availableColumnOption.optionProps), [availableColumnOptions]);
    const handleColumnSelection = react_2.useCallback((selectedOptions) => {
        closePopover();
        const selectedOptionIndex = selectedOptions.findIndex(selectedOption => selectedOption.checked === 'on');
        const selectedOption = availableColumnOptions[selectedOptionIndex];
        addLogColumn(selectedOption.columnConfiguration);
    }, [addLogColumn, availableColumnOptions]);
    return (react_2.default.createElement(eui_1.EuiPopover, { anchorPosition: "downRight", button: react_2.default.createElement(eui_1.EuiButton, { "data-test-subj": "addLogColumnButton", isDisabled: isDisabled, iconType: "plusInCircle", onClick: openPopover },
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.addLogColumnButtonLabel", defaultMessage: "Add Column" })), closePopover: closePopover, id: "addLogColumn", isOpen: isOpen, ownFocus: true, panelPaddingSize: "none" },
        react_2.default.createElement(eui_1.EuiSelectable, { height: 600, listProps: selectableListProps, onChange: handleColumnSelection, options: availableOptions, searchable: true, searchProps: searchProps, singleSelection: true }, (list, search) => (react_2.default.createElement(SelectableContent, { "data-test-subj": "addLogColumnPopover" },
            react_2.default.createElement(eui_1.EuiPopoverTitle, null, search),
            list)))));
};
const searchProps = {
    'data-test-subj': 'fieldSearchInput',
};
const selectableListProps = {
    showIcons: false,
};
const usePopoverVisibilityState = (initialState) => {
    const [isOpen, setIsOpen] = react_2.useState(initialState);
    const closePopover = react_2.useCallback(() => setIsOpen(false), []);
    const openPopover = react_2.useCallback(() => setIsOpen(true), []);
    return react_2.useMemo(() => [isOpen, openPopover, closePopover], [isOpen, openPopover, closePopover]);
};
const SystemColumnBadge = () => (react_2.default.createElement(eui_1.EuiBadge, null,
    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.sourceConfiguration.systemColumnBadgeLabel", defaultMessage: "System" })));
const SelectableContent = eui_styled_components_1.euiStyled.div `
  width: 400px;
`;
