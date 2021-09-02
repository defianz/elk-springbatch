"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelUtils = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = _interopRequireDefault(require("lodash"));

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _dashboard_constants = require("../dashboard_constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PANEL_HEIGHT_SCALE_FACTOR = 5;
var PANEL_HEIGHT_SCALE_FACTOR_WITH_MARGINS = 4;
var PANEL_WIDTH_SCALE_FACTOR = 4;

var PanelUtils =
/*#__PURE__*/
function () {
  function PanelUtils() {
    _classCallCheck(this, PanelUtils);
  }

  _createClass(PanelUtils, null, [{
    key: "convertPanelDataPre_6_1",
    // 6.1 switched from gridster to react grid. React grid uses different variables for tracking layout
    // eslint-disable-next-line @typescript-eslint/camelcase
    value: function convertPanelDataPre_6_1(panel) {
      ['col', 'row'].forEach(function (key) {
        if (!_lodash.default.has(panel, key)) {
          throw new Error(_i18n.i18n.translate('kbn.dashboard.panel.unableToMigratePanelDataForSixOneZeroErrorMessage', {
            defaultMessage: 'Unable to migrate panel data for "6.1.0" backwards compatibility, panel does not contain expected field: {key}',
            values: {
              key: key
            }
          }));
        }
      });
      panel.gridData = {
        x: panel.col - 1,
        y: panel.row - 1,
        w: panel.size_x || _dashboard_constants.DEFAULT_PANEL_WIDTH,
        h: panel.size_y || _dashboard_constants.DEFAULT_PANEL_HEIGHT,
        i: panel.panelIndex.toString()
      };
      panel.version = _chrome.default.getKibanaVersion();
      panel.panelIndex = panel.panelIndex.toString();
      delete panel.size_x;
      delete panel.size_y;
      delete panel.row;
      delete panel.col;
      return panel;
    } // 6.3 changed the panel dimensions to allow finer control over sizing
    // 1) decrease column height from 100 to 20.
    // 2) increase rows from 12 to 48
    // Need to scale pre 6.3 panels so they maintain the same layout
    // eslint-disable-next-line @typescript-eslint/camelcase

  }, {
    key: "convertPanelDataPre_6_3",
    value: function convertPanelDataPre_6_3(panel, useMargins) {
      ['w', 'x', 'h', 'y'].forEach(function (key) {
        if (!_lodash.default.has(panel.gridData, key)) {
          throw new Error(_i18n.i18n.translate('kbn.dashboard.panel.unableToMigratePanelDataForSixThreeZeroErrorMessage', {
            defaultMessage: 'Unable to migrate panel data for "6.3.0" backwards compatibility, panel does not contain expected field: {key}',
            values: {
              key: key
            }
          }));
        }
      }); // see https://github.com/elastic/kibana/issues/20635 on why the scale factor changes when margins are being used

      var heightScaleFactor = useMargins ? PANEL_HEIGHT_SCALE_FACTOR_WITH_MARGINS : PANEL_HEIGHT_SCALE_FACTOR;
      panel.gridData.w = panel.gridData.w * PANEL_WIDTH_SCALE_FACTOR;
      panel.gridData.x = panel.gridData.x * PANEL_WIDTH_SCALE_FACTOR;
      panel.gridData.h = panel.gridData.h * heightScaleFactor;
      panel.gridData.y = panel.gridData.y * heightScaleFactor;
      panel.version = _chrome.default.getKibanaVersion();
      return panel;
    }
  }, {
    key: "parseVersion",
    value: function parseVersion() {
      var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '6.0.0';
      var versionSplit = version.split('.');

      if (versionSplit.length < 3) {
        throw new Error(_i18n.i18n.translate('kbn.dashboard.panel.invalidVersionErrorMessage', {
          defaultMessage: 'Invalid version, {version}, expected {semver}',
          values: {
            version: version,
            semver: '<major>.<minor>.<patch>'
          }
        }));
      }

      return {
        major: parseInt(versionSplit[0], 10),
        minor: parseInt(versionSplit[1], 10)
      };
    }
  }, {
    key: "initPanelIndexes",
    value: function initPanelIndexes(panels) {
      // find the largest panelIndex in all the panels
      var maxIndex = this.getMaxPanelIndex(panels); // ensure that all panels have a panelIndex

      panels.forEach(function (panel) {
        if (!panel.panelIndex) {
          panel.panelIndex = (maxIndex++).toString();
        }
      });
    }
  }, {
    key: "getMaxPanelIndex",
    value: function getMaxPanelIndex(panels) {
      var maxId = panels.reduce(function (id, panel) {
        return Math.max(id, Number(panel.panelIndex || id));
      }, 0);
      return ++maxId;
    }
  }]);

  return PanelUtils;
}();

exports.PanelUtils = PanelUtils;