"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPainlessError = getPainlessError;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getPainlessError(error) {
  var rootCause = (0, _lodash.get)(error, 'resp.error.root_cause');

  if (!rootCause) {
    return;
  }

  var _rootCause = _slicedToArray(rootCause, 1),
      _rootCause$ = _rootCause[0],
      lang = _rootCause$.lang,
      script = _rootCause$.script;

  if (lang !== 'painless') {
    return;
  }

  return {
    lang: lang,
    script: script,
    message: _i18n.i18n.translate('kbn.discover.painlessError.painlessScriptedFieldErrorMessage', {
      defaultMessage: "Error with Painless scripted field '{script}'.",
      values: {
        script: script
      }
    }),
    error: error.message
  };
}