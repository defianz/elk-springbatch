"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FatalErrorsService = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _fatal_errors_screen = require("./fatal_errors_screen");

var _get_error_info = require("./get_error_info");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @interal */
var FatalErrorsService =
/*#__PURE__*/
function () {
  /**
   *
   * @param rootDomElement
   * @param onFirstErrorCb - Callback function that gets executed after the first error,
   *   but before the FatalErrorsService renders the error to the DOM.
   */
  function FatalErrorsService(rootDomElement, onFirstErrorCb) {
    _classCallCheck(this, FatalErrorsService);

    this.rootDomElement = rootDomElement;
    this.onFirstErrorCb = onFirstErrorCb;

    _defineProperty(this, "errorInfo$", new Rx.ReplaySubject());
  }

  _createClass(FatalErrorsService, [{
    key: "setup",
    value: function setup(_ref) {
      var _this = this;

      var i18n = _ref.i18n,
          injectedMetadata = _ref.injectedMetadata;
      this.errorInfo$.pipe((0, _operators.first)(), (0, _operators.tap)(function () {
        _this.onFirstErrorCb();

        _this.renderError(injectedMetadata, i18n);
      })).subscribe({
        error: function error(_error) {
          // eslint-disable-next-line no-console
          console.error('Uncaught error in fatal error service internals', _error);
        }
      });
      var fatalErrorsSetup = {
        add: function add(error, source) {
          var errorInfo = (0, _get_error_info.getErrorInfo)(error, source);

          _this.errorInfo$.next(errorInfo);

          if (error instanceof Error) {
            // make stack traces clickable by putting whole error in the console
            // eslint-disable-next-line no-console
            console.error(error);
          }

          throw error;
        },
        get$: function get$() {
          return _this.errorInfo$.asObservable();
        }
      };
      return fatalErrorsSetup;
    }
  }, {
    key: "renderError",
    value: function renderError(injectedMetadata, i18n) {
      // delete all content in the rootDomElement
      this.rootDomElement.textContent = ''; // create and mount a container for the <FatalErrorScreen>

      var container = document.createElement('div');
      this.rootDomElement.appendChild(container);
      (0, _reactDom.render)(_react.default.createElement(i18n.Context, null, _react.default.createElement(_fatal_errors_screen.FatalErrorsScreen, {
        buildNumber: injectedMetadata.getKibanaBuildNumber(),
        kibanaVersion: injectedMetadata.getKibanaVersion(),
        errorInfo$: this.errorInfo$
      })), container);
    }
  }]);

  return FatalErrorsService;
}();

exports.FatalErrorsService = FatalErrorsService;