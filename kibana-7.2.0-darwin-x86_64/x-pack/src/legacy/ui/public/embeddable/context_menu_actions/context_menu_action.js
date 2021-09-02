"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContextMenuAction {
    /**
     *
     * @param {string} config.id
     * @param {string} config.parentPanelId - set if this action belongs on a nested child panel
     * @param {function} options.onClick
     * @param {ContextMenuPanel} options.childContextMenuPanel - optional child panel to open when clicked.
     * @param {function} options.isDisabled - optionally set a custom disabled function
     * @param {function} options.isVisible - optionally set a custom isVisible function
     * @param {function} options.getHref
     * @param {function} options.getDisplayName
     * @param {Element} options.icon
     */
    constructor(config, options) {
        this.id = config.id;
        this.parentPanelId = config.parentPanelId;
        this.icon = options.icon;
        this.childContextMenuPanel = options.childContextMenuPanel;
        this.getDisplayName = options.getDisplayName;
        if ('onClick' in options) {
            this.onClick = options.onClick;
        }
        if (options.isDisabled) {
            this.isDisabled = options.isDisabled;
        }
        if (options.isVisible) {
            this.isVisible = options.isVisible;
        }
        if ('getHref' in options) {
            this.getHref = options.getHref;
        }
    }
    /**
     * Whether this action should be visible based on the parameters given.  Defaults to always visible.
     * @param {PanelActionAPI} panelActionAPI
     * @return {boolean}
     */
    isVisible(panelActionAPI) {
        return true;
    }
    /**
     * Whether this action should be disabled based on the parameters given. Defaults to always enabled.
     * @param {PanelActionAPI} panelActionAPI
     */
    isDisabled(panelActionAPI) {
        return false;
    }
}
exports.ContextMenuAction = ContextMenuAction;
