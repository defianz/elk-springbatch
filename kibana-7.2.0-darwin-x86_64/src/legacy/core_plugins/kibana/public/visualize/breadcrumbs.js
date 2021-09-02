"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLandingBreadcrumbs = getLandingBreadcrumbs;
exports.getWizardStep1Breadcrumbs = getWizardStep1Breadcrumbs;
exports.getWizardStep2Breadcrumbs = getWizardStep2Breadcrumbs;
exports.getCreateBreadcrumbs = getCreateBreadcrumbs;
exports.getEditBreadcrumbs = getEditBreadcrumbs;

var _i18n = require("@kbn/i18n");

var _visualize_constants = require("./visualize_constants");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getLandingBreadcrumbs() {
  return [{
    text: _i18n.i18n.translate('kbn.visualize.listing.breadcrumb', {
      defaultMessage: 'Visualize'
    }),
    href: "#".concat(_visualize_constants.VisualizeConstants.LANDING_PAGE_PATH)
  }];
}

function getWizardStep1Breadcrumbs() {
  return [].concat(_toConsumableArray(getLandingBreadcrumbs()), [{
    text: _i18n.i18n.translate('kbn.visualize.wizard.step1Breadcrumb', {
      defaultMessage: 'Create'
    })
  }]);
}

function getWizardStep2Breadcrumbs() {
  return [].concat(_toConsumableArray(getLandingBreadcrumbs()), [{
    text: _i18n.i18n.translate('kbn.visualize.wizard.step2Breadcrumb', {
      defaultMessage: 'Create'
    })
  }]);
}

function getCreateBreadcrumbs() {
  return [].concat(_toConsumableArray(getLandingBreadcrumbs()), [{
    text: _i18n.i18n.translate('kbn.visualize.editor.createBreadcrumb', {
      defaultMessage: 'Create'
    })
  }]);
}

function getEditBreadcrumbs($route) {
  return [].concat(_toConsumableArray(getLandingBreadcrumbs()), [{
    text: $route.current.locals.savedVis.title
  }]);
}