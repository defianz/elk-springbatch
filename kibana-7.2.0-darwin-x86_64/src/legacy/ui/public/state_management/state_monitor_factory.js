"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateMonitorFactory = void 0;

var _lodash = require("lodash");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var stateMonitorFactory = {
  create: function create(state, customInitialState) {
    return stateMonitor(state, customInitialState);
  }
};
exports.stateMonitorFactory = stateMonitorFactory;

function stateMonitor(state, customInitialState) {
  var destroyed = false;
  var ignoredProps = [];
  var changeHandlers = [];
  var initialState;

  _setInitialState(customInitialState);

  function _setInitialState(innerCustomInitialState) {
    // state.toJSON returns a reference, clone so we can mutate it safely
    initialState = (0, _lodash.cloneDeep)(innerCustomInitialState) || (0, _lodash.cloneDeep)(state.toJSON());
  }

  function removeIgnoredProps(innerState) {
    ignoredProps.forEach(function (path) {
      (0, _lodash.set)(innerState, path, true);
    });
    return innerState;
  }

  function getStatus() {
    // state.toJSON returns a reference, clone so we can mutate it safely
    var currentState = removeIgnoredProps((0, _lodash.cloneDeep)(state.toJSON()));
    var isClean = (0, _lodash.isEqual)(currentState, initialState);
    return {
      clean: isClean,
      dirty: !isClean
    };
  }

  function dispatchChange() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var status = getStatus();

    if (!changeHandlers) {
      throw new Error('Change handlers is undefined, this object has been destroyed');
    }

    changeHandlers.forEach(function (changeHandler) {
      changeHandler(status, type, keys);
    });
  }

  function dispatchFetch(keys) {
    dispatchChange('fetch_with_changes', keys);
  }

  function dispatchSave(keys) {
    dispatchChange('save_with_changes', keys);
  }

  function dispatchReset(keys) {
    dispatchChange('reset_with_changes', keys);
  }

  return {
    setInitialState: function setInitialState(innerCustomInitialState) {
      if (!(0, _lodash.isPlainObject)(innerCustomInitialState)) {
        throw new TypeError('The default state must be an object');
      } // check the current status


      var previousStatus = getStatus(); // update the initialState and apply ignoredProps

      _setInitialState(innerCustomInitialState);

      removeIgnoredProps(initialState); // fire the change handler if the status has changed

      if (!(0, _lodash.isEqual)(previousStatus, getStatus())) {
        dispatchChange();
      }
    },
    ignoreProps: function ignoreProps(props) {
      ignoredProps = ignoredProps.concat(props);
      removeIgnoredProps(initialState);
      return this;
    },
    onChange: function onChange(callback) {
      if (destroyed || !changeHandlers) {
        throw new Error('Monitor has been destroyed');
      }

      if (typeof callback !== 'function') {
        throw new Error('onChange handler must be a function');
      }

      changeHandlers.push(callback); // Listen for state events.

      state.on('fetch_with_changes', dispatchFetch);
      state.on('save_with_changes', dispatchSave);
      state.on('reset_with_changes', dispatchReset); // if the state is already dirty, fire the change handler immediately

      var status = getStatus();

      if (status.dirty) {
        dispatchChange();
      }

      return this;
    },
    destroy: function destroy() {
      destroyed = true;
      changeHandlers = undefined;
      state.off('fetch_with_changes', dispatchFetch);
      state.off('save_with_changes', dispatchSave);
      state.off('reset_with_changes', dispatchReset);
    }
  };
}