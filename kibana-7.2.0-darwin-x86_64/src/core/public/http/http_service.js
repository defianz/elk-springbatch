"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpService = void 0;

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _fetch = require("./fetch");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var HttpService =
/*#__PURE__*/
function () {
  function HttpService() {
    _classCallCheck(this, HttpService);

    _defineProperty(this, "loadingCount$", new Rx.BehaviorSubject(0));

    _defineProperty(this, "stop$", new Rx.Subject());
  }

  _createClass(HttpService, [{
    key: "setup",
    value: function setup(deps) {
      var _this = this;

      var _setup2 = (0, _fetch.setup)(deps),
          fetch = _setup2.fetch,
          shorthand = _setup2.shorthand;

      return {
        fetch: fetch,
        delete: shorthand('DELETE'),
        get: shorthand('GET'),
        head: shorthand('HEAD'),
        options: shorthand('OPTIONS'),
        patch: shorthand('PATCH'),
        post: shorthand('POST'),
        put: shorthand('PUT'),
        addLoadingCount: function addLoadingCount(count$) {
          count$.pipe((0, _operators.distinctUntilChanged)(), (0, _operators.tap)(function (count) {
            if (count < 0) {
              throw new Error('Observables passed to loadingCount.add() must only emit positive numbers');
            }
          }), // use takeUntil() so that we can finish each stream on stop() the same way we do when they complete,
          (0, _operators.takeUntil)(_this.stop$), (0, _operators.endWith)(0), (0, _operators.startWith)(0), (0, _operators.pairwise)(), (0, _operators.map)(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                prev = _ref2[0],
                next = _ref2[1];

            return next - prev;
          })).subscribe({
            next: function next(delta) {
              _this.loadingCount$.next(_this.loadingCount$.getValue() + delta);
            },
            error: function error(_error) {
              deps.fatalErrors.add(_error);
            }
          });
        },
        getLoadingCount$: function getLoadingCount$() {
          return _this.loadingCount$.pipe((0, _operators.distinctUntilChanged)());
        }
      };
    } // eslint-disable-next-line no-unused-params

  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "stop",
    value: function stop() {
      this.stop$.next();
      this.loadingCount$.complete();
    }
  }]);

  return HttpService;
}();
/** @public */


exports.HttpService = HttpService;