"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a;
"use strict";
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const types_1 = require("../../graphql/types");
const custom_field_panel_1 = require("./custom_field_panel");
const field_to_display_name_1 = require("./lib/field_to_display_name");
const createFieldToOptionMapper = (intl) => (field) => ({
    text: field_to_display_name_1.fieldToName(field, intl),
    field,
});
let OPTIONS;
const getOptions = (nodeType, intl) => {
    if (!OPTIONS) {
        const mapFieldToOption = createFieldToOptionMapper(intl);
        OPTIONS = {
            [types_1.InfraNodeType.pod]: ['kubernetes.namespace', 'kubernetes.node.name', 'service.type'].map(mapFieldToOption),
            [types_1.InfraNodeType.container]: [
                'host.name',
                'cloud.availability_zone',
                'cloud.machine.type',
                'cloud.project.id',
                'cloud.provider',
                'service.type',
            ].map(mapFieldToOption),
            [types_1.InfraNodeType.host]: [
                'cloud.availability_zone',
                'cloud.machine.type',
                'cloud.project.id',
                'cloud.provider',
                'service.type',
            ].map(mapFieldToOption),
        };
    }
    return OPTIONS[nodeType];
};
const initialState = {
    isPopoverOpen: false,
};
exports.WaffleGroupByControls = react_1.injectI18n((_a = class extends react_2.default.PureComponent {
        constructor() {
            super(...arguments);
            this.state = initialState;
            this.handleRemove = (field) => () => {
                const { groupBy } = this.props;
                this.props.onChange(groupBy.filter(g => g.field !== field));
                const options = this.props.customOptions.filter(g => g.field !== field);
                this.props.onChangeCustomOptions(options);
                // We need to close the panel after we rmeove the pill icon otherwise
                // it will remain open because the click is still captured by the EuiFilterButton
                setTimeout(() => this.handleClose());
            };
            this.handleClose = () => {
                this.setState({ isPopoverOpen: false });
            };
            this.handleToggle = () => {
                this.setState(state => ({ isPopoverOpen: !state.isPopoverOpen }));
            };
            this.handleCustomField = (field) => {
                const options = [
                    ...this.props.customOptions,
                    {
                        text: field,
                        field,
                    },
                ];
                this.props.onChangeCustomOptions(options);
                const fn = this.handleClick(field);
                fn();
            };
            this.handleClick = (field) => () => {
                const { groupBy } = this.props;
                if (groupBy.some(g => g.field === field)) {
                    this.handleRemove(field)();
                }
                else if (this.props.groupBy.length < 2) {
                    this.props.onChange([...groupBy, { field }]);
                    this.handleClose();
                }
            };
        }
        render() {
            const { nodeType, groupBy, intl } = this.props;
            const options = getOptions(nodeType, intl).concat(this.props.customOptions);
            if (!options.length) {
                throw Error(intl.formatMessage({
                    id: 'xpack.infra.waffle.unableToSelectGroupErrorMessage',
                    defaultMessage: 'Unable to select group by options for {nodeType}',
                }, {
                    nodeType,
                }));
            }
            const panels = [
                {
                    id: 'firstPanel',
                    title: intl.formatMessage({
                        id: 'xpack.infra.waffle.selectTwoGroupingsTitle',
                        defaultMessage: 'Select up to two groupings',
                    }),
                    items: [
                        {
                            name: intl.formatMessage({
                                id: 'xpack.infra.waffle.customGroupByOptionName',
                                defaultMessage: 'Custom Field',
                            }),
                            icon: 'empty',
                            panel: 'customPanel',
                        },
                        ...options.map(o => {
                            const icon = groupBy.some(g => g.field === o.field) ? 'check' : 'empty';
                            const panel = {
                                name: o.text,
                                onClick: this.handleClick(o.field),
                                icon,
                            };
                            return panel;
                        }),
                    ],
                },
                {
                    id: 'customPanel',
                    title: intl.formatMessage({
                        id: 'xpack.infra.waffle.customGroupByPanelTitle',
                        defaultMessage: 'Group By Custom Field',
                    }),
                    content: (react_2.default.createElement(custom_field_panel_1.CustomFieldPanel, { onSubmit: this.handleCustomField, fields: this.props.fields })),
                },
            ];
            const buttonBody = groupBy.length > 0 ? (groupBy
                .map(g => options.find(o => o.field === g.field))
                .filter(o => o != null)
                // In this map the `o && o.field` is totally unnecessary but Typescript is
                // too stupid to realize that the filter above prevents the next map from being null
                .map(o => react_2.default.createElement(eui_1.EuiBadge, { key: o && o.field }, o && o.text))) : (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.waffle.groupByAllTitle", defaultMessage: "All" }));
            const button = (react_2.default.createElement(eui_1.EuiFilterButton, { iconType: "arrowDown", onClick: this.handleToggle },
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.waffle.groupByButtonLabel", defaultMessage: "Group By: " }),
                buttonBody));
            return (react_2.default.createElement(eui_1.EuiFilterGroup, null,
                react_2.default.createElement(eui_1.EuiPopover, { isOpen: this.state.isPopoverOpen, id: "groupByPanel", button: button, panelPaddingSize: "none", closePopover: this.handleClose },
                    react_2.default.createElement(eui_1.EuiContextMenu, { initialPanelId: "firstPanel", panels: panels }))));
        }
    },
    _a.displayName = 'WaffleGroupByControls',
    _a));
