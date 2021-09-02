"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchEmbeddable = void 0;

var _angular = _interopRequireDefault(require("angular"));

var _lodash = _interopRequireDefault(require("lodash"));

var _i18n = require("@kbn/i18n");

var _embeddable = require("ui/embeddable");

var _adapters = require("ui/inspector/adapters");

var _get_time = require("ui/timefilter/get_time");

var columnActions = _interopRequireWildcard(require("../doc_table/actions/columns"));

var _search_template = _interopRequireDefault(require("./search_template.html"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SearchEmbeddable =
/*#__PURE__*/
function (_Embeddable) {
  _inherits(SearchEmbeddable, _Embeddable);

  function SearchEmbeddable(_ref) {
    var _this;

    var onEmbeddableStateChanged = _ref.onEmbeddableStateChanged,
        savedSearch = _ref.savedSearch,
        editable = _ref.editable,
        editUrl = _ref.editUrl,
        $rootScope = _ref.$rootScope,
        $compile = _ref.$compile;

    _classCallCheck(this, SearchEmbeddable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SearchEmbeddable).call(this, {
      title: savedSearch.title,
      editUrl: editUrl,
      editLabel: _i18n.i18n.translate('kbn.embeddable.search.editLabel', {
        defaultMessage: 'Edit saved search'
      }),
      editable: editable,
      indexPatterns: _lodash.default.compact([savedSearch.searchSource.getField('index')])
    }));

    _defineProperty(_assertThisInitialized(_this), "onEmbeddableStateChanged", void 0);

    _defineProperty(_assertThisInitialized(_this), "savedSearch", void 0);

    _defineProperty(_assertThisInitialized(_this), "$rootScope", void 0);

    _defineProperty(_assertThisInitialized(_this), "$compile", void 0);

    _defineProperty(_assertThisInitialized(_this), "customization", void 0);

    _defineProperty(_assertThisInitialized(_this), "inspectorAdaptors", void 0);

    _defineProperty(_assertThisInitialized(_this), "searchScope", void 0);

    _defineProperty(_assertThisInitialized(_this), "panelTitle", '');

    _defineProperty(_assertThisInitialized(_this), "filtersSearchSource", void 0);

    _defineProperty(_assertThisInitialized(_this), "timeRange", void 0);

    _defineProperty(_assertThisInitialized(_this), "filters", void 0);

    _defineProperty(_assertThisInitialized(_this), "query", void 0);

    _defineProperty(_assertThisInitialized(_this), "searchInstance", void 0);

    _this.onEmbeddableStateChanged = onEmbeddableStateChanged;
    _this.savedSearch = savedSearch;
    _this.$rootScope = $rootScope;
    _this.$compile = $compile;
    _this.customization = {};
    _this.inspectorAdaptors = {
      requests: new _adapters.RequestAdapter()
    };
    return _this;
  }

  _createClass(SearchEmbeddable, [{
    key: "getInspectorAdapters",
    value: function getInspectorAdapters() {
      return this.inspectorAdaptors;
    }
  }, {
    key: "onContainerStateChanged",
    value: function onContainerStateChanged(containerState) {
      this.customization = containerState.embeddableCustomization || {};
      this.filters = containerState.filters;
      this.query = containerState.query;
      this.timeRange = containerState.timeRange;
      this.panelTitle = '';

      if (!containerState.hidePanelTitles) {
        this.panelTitle = containerState.customTitle !== undefined ? containerState.customTitle : this.savedSearch.title;
      }

      if (this.searchScope) {
        this.pushContainerStateParamsToScope(this.searchScope);
      }
    }
    /**
     *
     * @param {Element} domNode
     * @param {ContainerState} containerState
     */

  }, {
    key: "render",
    value: function render(domNode, containerState) {
      this.onContainerStateChanged(containerState);
      this.initializeSearchScope();

      if (!this.searchScope) {
        throw new Error('Search scope not defined');
        return;
      }

      this.searchInstance = this.$compile(_search_template.default)(this.searchScope);

      var rootNode = _angular.default.element(domNode);

      rootNode.append(this.searchInstance);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.savedSearch.destroy();

      if (this.searchInstance) {
        this.searchInstance.remove();
      }

      if (this.searchScope) {
        this.searchScope.$destroy();
        delete this.searchScope;
      }
    }
  }, {
    key: "initializeSearchScope",
    value: function initializeSearchScope() {
      var _this2 = this;

      var searchScope = this.$rootScope.$new();
      searchScope.description = this.savedSearch.description;
      searchScope.searchSource = this.savedSearch.searchSource;
      searchScope.inspectorAdapters = this.inspectorAdaptors;
      var timeRangeSearchSource = searchScope.searchSource.create();
      timeRangeSearchSource.setField('filter', function () {
        if (!_this2.searchScope || !_this2.timeRange) {
          return;
        }

        return (0, _get_time.getTime)(_this2.searchScope.searchSource.getField('index'), _this2.timeRange);
      });
      this.filtersSearchSource = searchScope.searchSource.create();
      this.filtersSearchSource.setParent(timeRangeSearchSource);
      searchScope.searchSource.setParent(this.filtersSearchSource);
      this.pushContainerStateParamsToScope(searchScope);

      searchScope.setSortOrder = function (columnName, direction) {
        searchScope.sort = _this2.customization.sort = [columnName, direction];

        _this2.emitEmbeddableStateChange(_this2.getEmbeddableState());
      };

      searchScope.addColumn = function (columnName) {
        if (!searchScope.columns) {
          return;
        }

        _this2.savedSearch.searchSource.getField('index').popularizeField(columnName, 1);

        columnActions.addColumn(searchScope.columns, columnName);
        searchScope.columns = _this2.customization.columns = searchScope.columns;

        _this2.emitEmbeddableStateChange(_this2.getEmbeddableState());
      };

      searchScope.removeColumn = function (columnName) {
        if (!searchScope.columns) {
          return;
        }

        _this2.savedSearch.searchSource.getField('index').popularizeField(columnName, 1);

        columnActions.removeColumn(searchScope.columns, columnName);
        _this2.customization.columns = searchScope.columns;

        _this2.emitEmbeddableStateChange(_this2.getEmbeddableState());
      };

      searchScope.moveColumn = function (columnName, newIndex) {
        if (!searchScope.columns) {
          return;
        }

        columnActions.moveColumn(searchScope.columns, columnName, newIndex);
        _this2.customization.columns = searchScope.columns;

        _this2.emitEmbeddableStateChange(_this2.getEmbeddableState());
      };

      searchScope.filter = function (field, value, operator) {
        var index = _this2.savedSearch.searchSource.getField('index').id;

        var stagedFilter = {
          field: field,
          value: value,
          operator: operator,
          index: index
        };

        _this2.emitEmbeddableStateChange(_objectSpread({}, _this2.getEmbeddableState(), {
          stagedFilter: stagedFilter
        }));
      };

      this.searchScope = searchScope;
    }
  }, {
    key: "emitEmbeddableStateChange",
    value: function emitEmbeddableStateChange(embeddableState) {
      this.onEmbeddableStateChanged(embeddableState);
    }
  }, {
    key: "getEmbeddableState",
    value: function getEmbeddableState() {
      return {
        customization: this.customization
      };
    }
  }, {
    key: "pushContainerStateParamsToScope",
    value: function pushContainerStateParamsToScope(searchScope) {
      // If there is column or sort data on the panel, that means the original columns or sort settings have
      // been overridden in a dashboard.
      searchScope.columns = this.customization.columns || this.savedSearch.columns;
      searchScope.sort = this.customization.sort || this.savedSearch.sort;
      searchScope.sharedItemTitle = this.panelTitle;
      this.filtersSearchSource.setField('filter', this.filters);
      this.filtersSearchSource.setField('query', this.query);
    }
  }]);

  return SearchEmbeddable;
}(_embeddable.Embeddable);

exports.SearchEmbeddable = SearchEmbeddable;