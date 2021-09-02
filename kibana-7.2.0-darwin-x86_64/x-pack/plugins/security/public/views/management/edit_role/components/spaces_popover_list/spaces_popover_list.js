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
const constants_1 = require("../../../../../../../spaces/common/constants");
const components_1 = require("../../../../../../../spaces/public/components");
class SpacesPopoverList extends react_2.Component {
    constructor() {
        super(...arguments);
        this.state = {
            searchTerm: '',
            allowSpacesListFocus: false,
            isPopoverOpen: false,
        };
        this.getMenuPanel = () => {
            const { intl } = this.props;
            const { searchTerm } = this.state;
            const items = this.getVisibleSpaces(searchTerm).map(this.renderSpaceMenuItem);
            const panelProps = {
                className: 'spcMenu',
                title: intl.formatMessage({
                    id: 'xpack.security.management.editRole.spacesPopoverList.popoverTitle',
                    defaultMessage: 'Spaces',
                }),
                watchedItemProps: ['data-search-term'],
            };
            if (this.props.spaces.length >= constants_1.SPACE_SEARCH_COUNT_THRESHOLD) {
                return (react_2.default.createElement(eui_1.EuiContextMenuPanel, Object.assign({}, panelProps),
                    this.renderSearchField(),
                    this.renderSpacesListPanel(items, searchTerm)));
            }
            return react_2.default.createElement(eui_1.EuiContextMenuPanel, Object.assign({}, panelProps, { items: items }));
        };
        this.onButtonClick = () => {
            this.setState({
                isPopoverOpen: !this.state.isPopoverOpen,
                searchTerm: '',
            });
        };
        this.closePopover = () => {
            this.setState({
                isPopoverOpen: false,
                searchTerm: '',
            });
        };
        this.getVisibleSpaces = (searchTerm) => {
            const { spaces } = this.props;
            let filteredSpaces = spaces;
            if (searchTerm) {
                filteredSpaces = spaces.filter(space => {
                    const { name, description = '' } = space;
                    return (name.toLowerCase().indexOf(searchTerm) >= 0 ||
                        description.toLowerCase().indexOf(searchTerm) >= 0);
                });
            }
            return filteredSpaces;
        };
        this.renderSpacesListPanel = (items, searchTerm) => {
            if (items.length === 0) {
                return (react_2.default.createElement(eui_1.EuiText, { color: "subdued", className: "eui-textCenter" },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.editRole.spacesPopoverList.noSpacesFoundTitle", defaultMessage: " no spaces found " })));
            }
            return (react_2.default.createElement(eui_1.EuiContextMenuPanel, { key: `spcMenuList`, "data-search-term": searchTerm, className: "spcMenu__spacesList", hasFocus: this.state.allowSpacesListFocus, initialFocusedItemIndex: this.state.allowSpacesListFocus ? 0 : undefined, items: items }));
        };
        this.renderSearchField = () => {
            const { intl } = this.props;
            return (react_2.default.createElement("div", { key: "manageSpacesSearchField", className: "spcMenu__searchFieldWrapper" }, 
            // @ts-ignore onSearch isn't defined on the type
            react_2.default.createElement(eui_1.EuiFieldSearch, { placeholder: intl.formatMessage({
                    id: 'xpack.security.management.editRole.spacesPopoverList.findSpacePlaceholder',
                    defaultMessage: 'Find a space',
                }), incremental: true, onSearch: this.onSearch, onKeyDown: this.onSearchKeyDown, onFocus: this.onSearchFocus, compressed: true })));
        };
        this.onSearchKeyDown = (e) => {
            //  9: tab
            // 13: enter
            // 40: arrow-down
            const focusableKeyCodes = [9, 13, 40];
            const keyCode = e.keyCode;
            if (focusableKeyCodes.includes(keyCode)) {
                // Allows the spaces list panel to recieve focus. This enables keyboard and screen reader navigation
                this.setState({
                    allowSpacesListFocus: true,
                });
            }
        };
        this.onSearchFocus = () => {
            this.setState({
                allowSpacesListFocus: false,
            });
        };
        this.onSearch = (searchTerm) => {
            this.setState({
                searchTerm: searchTerm.trim().toLowerCase(),
            });
        };
        this.renderSpaceMenuItem = (space) => {
            const icon = react_2.default.createElement(components_1.SpaceAvatar, { space: space, size: 's' });
            return (react_2.default.createElement(eui_1.EuiContextMenuItem, { key: space.id, icon: icon, toolTipTitle: space.description && space.name, toolTipContent: space.description }, space.name));
        };
    }
    render() {
        const button = (react_2.default.createElement(eui_1.EuiButtonEmpty, { size: 'xs', onClick: this.onButtonClick },
            react_2.default.createElement("span", { className: "secSpacesPopoverList__buttonText" }, this.props.buttonText)));
        return (react_2.default.createElement(eui_1.EuiPopover, { id: 'spacesPopoverList', button: button, isOpen: this.state.isPopoverOpen, closePopover: this.closePopover, panelPaddingSize: "none", anchorPosition: "downLeft", ownFocus: true }, this.getMenuPanel()));
    }
}
exports.SpacesPopoverList = SpacesPopoverList;
