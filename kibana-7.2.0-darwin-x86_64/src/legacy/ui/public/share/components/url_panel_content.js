"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlPanelContent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _url = require("url");

var _react2 = require("@kbn/i18n/react");

var _state_hashing = require("../../state_management/state_hashing");

var _url_shortener = require("../lib/url_shortener");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: Remove once EuiIconTip supports "content" prop
var FixedEuiIconTip = _eui.EuiIconTip;
var ExportUrlAsType;

(function (ExportUrlAsType) {
  ExportUrlAsType["EXPORT_URL_AS_SAVED_OBJECT"] = "savedObject";
  ExportUrlAsType["EXPORT_URL_AS_SNAPSHOT"] = "snapshot";
})(ExportUrlAsType || (ExportUrlAsType = {}));

var UrlPanelContentUI =
/*#__PURE__*/
function (_Component) {
  _inherits(UrlPanelContentUI, _Component);

  function UrlPanelContentUI(props) {
    var _this;

    _classCallCheck(this, UrlPanelContentUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UrlPanelContentUI).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "mounted", void 0);

    _defineProperty(_assertThisInitialized(_this), "shortUrlCache", void 0);

    _defineProperty(_assertThisInitialized(_this), "isNotSaved", function () {
      return _this.props.objectId === undefined || _this.props.objectId === '';
    });

    _defineProperty(_assertThisInitialized(_this), "resetUrl", function () {
      if (_this.mounted) {
        _this.shortUrlCache = undefined;

        _this.setState({
          useShortUrl: false
        }, _this.setUrl);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getSavedObjectUrl", function () {
      if (_this.isNotSaved()) {
        return;
      }

      var url = window.location.href; // Replace hashes with original RISON values.

      var unhashedUrl = (0, _state_hashing.unhashUrl)(url, _this.props.getUnhashableStates());
      var parsedUrl = (0, _url.parse)(unhashedUrl);

      if (!parsedUrl || !parsedUrl.hash) {
        return;
      } // Get the application route, after the hash, and remove the #.


      var parsedAppUrl = (0, _url.parse)(parsedUrl.hash.slice(1), true);
      return (0, _url.format)({
        protocol: parsedUrl.protocol,
        auth: parsedUrl.auth,
        host: parsedUrl.host,
        pathname: parsedUrl.pathname,
        hash: (0, _url.format)({
          pathname: parsedAppUrl.pathname,
          query: {
            // Add global state to the URL so that the iframe doesn't just show the time range
            // default.
            _g: parsedAppUrl.query._g
          }
        })
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getSnapshotUrl", function () {
      var url = window.location.href; // Replace hashes with original RISON values.

      return (0, _state_hashing.unhashUrl)(url, _this.props.getUnhashableStates());
    });

    _defineProperty(_assertThisInitialized(_this), "makeUrlEmbeddable", function (url) {
      var embedQueryParam = '?embed=true';
      var urlHasQueryString = url.indexOf('?') !== -1;

      if (urlHasQueryString) {
        return url.replace('?', "".concat(embedQueryParam, "&"));
      }

      return "".concat(url).concat(embedQueryParam);
    });

    _defineProperty(_assertThisInitialized(_this), "makeIframeTag", function (url) {
      if (!url) {
        return;
      }

      var embeddableUrl = _this.makeUrlEmbeddable(url);

      return "<iframe src=\"".concat(embeddableUrl, "\" height=\"600\" width=\"800\"></iframe>");
    });

    _defineProperty(_assertThisInitialized(_this), "setUrl", function () {
      var url;

      if (_this.state.exportUrlAs === ExportUrlAsType.EXPORT_URL_AS_SAVED_OBJECT) {
        url = _this.getSavedObjectUrl();
      } else if (_this.state.useShortUrl) {
        url = _this.shortUrlCache;
      } else {
        url = _this.getSnapshotUrl();
      }

      if (_this.props.isEmbedded) {
        url = _this.makeIframeTag(url);
      }

      _this.setState({
        url: url
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleExportUrlAs", function (optionId) {
      _this.setState({
        exportUrlAs: optionId
      }, _this.setUrl);
    });

    _defineProperty(_assertThisInitialized(_this), "handleShortUrlChange",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(evt) {
        var isChecked, shortUrl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isChecked = evt.target.checked;

                if (!(!isChecked || _this.shortUrlCache !== undefined)) {
                  _context.next = 4;
                  break;
                }

                _this.setState({
                  useShortUrl: isChecked
                }, _this.setUrl);

                return _context.abrupt("return");

              case 4:
                // "Use short URL" is checked but shortUrl has not been generated yet so one needs to be created.
                _this.setState({
                  isCreatingShortUrl: true,
                  shortUrlErrorMsg: undefined
                });

                _context.prev = 5;
                _context.next = 8;
                return (0, _url_shortener.shortenUrl)(_this.getSnapshotUrl());

              case 8:
                shortUrl = _context.sent;

                if (_this.mounted) {
                  _this.shortUrlCache = shortUrl;

                  _this.setState({
                    isCreatingShortUrl: false,
                    useShortUrl: isChecked
                  }, _this.setUrl);
                }

                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](5);

                if (_this.mounted) {
                  _this.shortUrlCache = undefined;

                  _this.setState({
                    useShortUrl: false,
                    isCreatingShortUrl: false,
                    shortUrlErrorMsg: _this.props.intl.formatMessage({
                      id: 'common.ui.share.urlPanel.unableCreateShortUrlErrorMessage',
                      defaultMessage: 'Unable to create short URL. Error: {errorMessage}'
                    }, {
                      errorMessage: _context.t0.message
                    })
                  }, _this.setUrl);
                }

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[5, 12]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "renderExportUrlAsOptions", function () {
      return [_defineProperty({
        id: ExportUrlAsType.EXPORT_URL_AS_SNAPSHOT,
        label: _this.renderWithIconTip(_react.default.createElement(_react2.FormattedMessage, {
          id: "common.ui.share.urlPanel.snapshotLabel",
          defaultMessage: "Snapshot"
        }), _react.default.createElement(_react2.FormattedMessage, {
          id: "common.ui.share.urlPanel.snapshotDescription",
          defaultMessage: "Snapshot URLs encode the current state of the {objectType} in the URL itself. Edits to the saved {objectType} won't be visible via this URL.",
          values: {
            objectType: _this.props.objectType
          }
        }))
      }, 'data-test-subj', 'exportAsSnapshot'), _defineProperty({
        id: ExportUrlAsType.EXPORT_URL_AS_SAVED_OBJECT,
        disabled: _this.isNotSaved(),
        label: _this.renderWithIconTip(_react.default.createElement(_react2.FormattedMessage, {
          id: "common.ui.share.urlPanel.savedObjectLabel",
          defaultMessage: "Saved object"
        }), _react.default.createElement(_react2.FormattedMessage, {
          id: "common.ui.share.urlPanel.savedObjectDescription",
          defaultMessage: "You can share this URL with people to let them load the most recent saved version of this {objectType}.",
          values: {
            objectType: _this.props.objectType
          }
        }))
      }, 'data-test-subj', 'exportAsSavedObject')];
    });

    _defineProperty(_assertThisInitialized(_this), "renderWithIconTip", function (child, tipContent) {
      return _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "none"
      }, _react.default.createElement(_eui.EuiFlexItem, null, child), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(FixedEuiIconTip, {
        content: tipContent,
        position: "bottom"
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "renderExportAsRadioGroup", function () {
      var generateLinkAsHelp = _this.isNotSaved() ? _react.default.createElement(_react2.FormattedMessage, {
        id: "common.ui.share.urlPanel.canNotShareAsSavedObjectHelpText",
        defaultMessage: "Can't share as saved object until the {objectType} has been saved.",
        values: {
          objectType: _this.props.objectType
        }
      }) : undefined;
      return _react.default.createElement(_eui.EuiFormRow, {
        label: _react.default.createElement(_react2.FormattedMessage, {
          id: "common.ui.share.urlPanel.generateLinkAsLabel",
          defaultMessage: "Generate the link as"
        }),
        helpText: generateLinkAsHelp
      }, _react.default.createElement(_eui.EuiRadioGroup, {
        options: _this.renderExportUrlAsOptions(),
        idSelected: _this.state.exportUrlAs,
        onChange: _this.handleExportUrlAs
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "renderShortUrlSwitch", function () {
      if (_this.state.exportUrlAs === ExportUrlAsType.EXPORT_URL_AS_SAVED_OBJECT || !_this.props.allowShortUrl) {
        return;
      }

      var shortUrlLabel = _react.default.createElement(_react2.FormattedMessage, {
        id: "common.ui.share.urlPanel.shortUrlLabel",
        defaultMessage: "Short URL"
      });

      var switchLabel = _this.state.isCreatingShortUrl ? _react.default.createElement("span", null, _react.default.createElement(_eui.EuiLoadingSpinner, {
        size: "s"
      }), " ", shortUrlLabel) : shortUrlLabel;

      var switchComponent = _react.default.createElement(_eui.EuiSwitch, {
        label: switchLabel,
        checked: _this.state.useShortUrl,
        onChange: _this.handleShortUrlChange,
        "data-test-subj": "useShortUrl"
      });

      var tipContent = _react.default.createElement(_react2.FormattedMessage, {
        id: "common.ui.share.urlPanel.shortUrlHelpText",
        defaultMessage: "We recommend sharing shortened snapshot URLs for maximum compatibility. Internet Explorer has URL length restrictions, and some wiki and markup parsers don't do well with the full-length version of the snapshot URL, but the short URL should work great."
      });

      return _react.default.createElement(_eui.EuiFormRow, {
        helpText: _this.state.shortUrlErrorMsg,
        "data-test-subj": "createShortUrl"
      }, _this.renderWithIconTip(switchComponent, tipContent));
    });

    _this.shortUrlCache = undefined;
    _this.state = {
      exportUrlAs: ExportUrlAsType.EXPORT_URL_AS_SNAPSHOT,
      useShortUrl: false,
      isCreatingShortUrl: false,
      url: ''
    };
    return _this;
  }

  _createClass(UrlPanelContentUI, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('hashchange', this.resetUrl);
      this.mounted = false;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      this.setUrl();
      window.addEventListener('hashchange', this.resetUrl, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_eui.EuiForm, {
        className: "kbnShareContextMenu__finalPanel",
        "data-test-subj": "shareUrlForm"
      }, this.renderExportAsRadioGroup(), this.renderShortUrlSwitch(), _react.default.createElement(_eui.EuiCopy, {
        textToCopy: this.state.url,
        anchorClassName: "kbnShareContextMenu__copyAnchor"
      }, function (copy) {
        return _react.default.createElement(_eui.EuiButton, {
          fill: true,
          onClick: copy,
          disabled: _this2.state.isCreatingShortUrl || _this2.state.url === '',
          "data-share-url": _this2.state.url,
          "data-test-subj": "copyShareUrlButton",
          size: "s"
        }, _this2.props.isEmbedded ? _react.default.createElement(_react2.FormattedMessage, {
          id: "common.ui.share.urlPanel.copyIframeCodeButtonLabel",
          defaultMessage: "Copy iFrame code"
        }) : _react.default.createElement(_react2.FormattedMessage, {
          id: "common.ui.share.urlPanel.copyLinkButtonLabel",
          defaultMessage: "Copy link"
        }));
      }));
    }
  }]);

  return UrlPanelContentUI;
}(_react.Component);

var UrlPanelContent = (0, _react2.injectI18n)(UrlPanelContentUI);
exports.UrlPanelContent = UrlPanelContent;