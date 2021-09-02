"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildEuiContextMenuPanels = buildEuiContextMenuPanels;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Loops through allActions and extracts those that belong on the given contextMenuPanelId
 * @param {string} contextMenuPanelId
 * @param {Array.<ContextMenuAction>} allActions
 */
function getActionsForPanel(contextMenuPanelId, allActions) {
  return allActions.filter(function (action) {
    return action.parentPanelId === contextMenuPanelId;
  });
}
/**
 * @param {String} contextMenuPanelId
 * @param {Array.<ContextMenuAction>} actions
 * @param {Embeddable} embeddable
 * @param {ContainerState} containerState
 * @return {{
 *   Array.<EuiContextMenuPanelItemDescriptor> items - panel actions converted into the items expected to be on an
 *     EuiContextMenuPanel,
 *   Array.<EuiContextMenuPanelDescriptor> childPanels - extracted child panels, if any actions also open a panel. They
 *     need to be moved to the top level for EUI.
 *  }}
 */


function buildEuiContextMenuPanelItemsAndChildPanels(_ref) {
  var contextMenuPanelId = _ref.contextMenuPanelId,
      actions = _ref.actions,
      embeddable = _ref.embeddable,
      containerState = _ref.containerState;
  var items = [];
  var childPanels = [];
  var actionsForPanel = getActionsForPanel(contextMenuPanelId, actions);
  actionsForPanel.forEach(function (action) {
    var isVisible = action.isVisible({
      embeddable: embeddable,
      containerState: containerState
    });

    if (!isVisible) {
      return;
    }

    if (action.childContextMenuPanel) {
      childPanels.push.apply(childPanels, _toConsumableArray(buildEuiContextMenuPanels({
        contextMenuPanel: action.childContextMenuPanel,
        actions: actions,
        embeddable: embeddable,
        containerState: containerState
      })));
    }

    items.push(convertPanelActionToContextMenuItem({
      action: action,
      containerState: containerState,
      embeddable: embeddable
    }));
  });
  return {
    items: items,
    childPanels: childPanels
  };
}
/**
 * Transforms a DashboardContextMenuPanel to the shape EuiContextMenuPanel expects, inserting any registered pluggable
 * panel actions.
 * @param {ContextMenuPanel} contextMenuPanel
 * @param {Array.<ContextMenuAction>} actions to build the context menu with
 * @param {Embeddable} embeddable
 * @param {ContainerState} containerState
 * @return {EuiContextMenuPanelDescriptor[]} An array of context menu panels to be used in the eui react component.
 */


function buildEuiContextMenuPanels(_ref2) {
  var contextMenuPanel = _ref2.contextMenuPanel,
      actions = _ref2.actions,
      embeddable = _ref2.embeddable,
      containerState = _ref2.containerState;
  var euiContextMenuPanel = {
    id: contextMenuPanel.id,
    title: contextMenuPanel.title,
    items: [],
    content: contextMenuPanel.getContent({
      embeddable: embeddable,
      containerState: containerState
    })
  };
  var contextMenuPanels = [euiContextMenuPanel];

  var _buildEuiContextMenuP = buildEuiContextMenuPanelItemsAndChildPanels({
    contextMenuPanelId: contextMenuPanel.id,
    actions: actions,
    embeddable: embeddable,
    containerState: containerState
  }),
      items = _buildEuiContextMenuP.items,
      childPanels = _buildEuiContextMenuP.childPanels;

  euiContextMenuPanel.items = items;
  return contextMenuPanels.concat(childPanels);
}
/**
 *
 * @param {ContextMenuAction} action
 * @param {ContainerState} containerState
 * @param {Embeddable} embeddable
 * @return {EuiContextMenuPanelItemDescriptor}
 */


function convertPanelActionToContextMenuItem(_ref3) {
  var action = _ref3.action,
      containerState = _ref3.containerState,
      embeddable = _ref3.embeddable;
  var menuPanelItem = {
    name: action.getDisplayName({
      embeddable: embeddable,
      containerState: containerState
    }),
    icon: action.icon,
    panel: _lodash.default.get(action, 'childContextMenuPanel.id'),
    disabled: action.isDisabled({
      embeddable: embeddable,
      containerState: containerState
    }),
    'data-test-subj': "dashboardPanelAction-".concat(action.id)
  };

  if (action.onClick) {
    menuPanelItem.onClick = function () {
      if (action.onClick) {
        action.onClick({
          embeddable: embeddable,
          containerState: containerState
        });
      }
    };
  }

  if (action.getHref) {
    menuPanelItem.href = action.getHref({
      embeddable: embeddable,
      containerState: containerState
    });
  }

  return menuPanelItem;
}