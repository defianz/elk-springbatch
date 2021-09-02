"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialsMixin = tutorialsMixin;

var _joi = _interopRequireDefault(require("joi"));

var _tutorial_schema = require("../core_plugins/kibana/common/tutorials/tutorial_schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function tutorialsMixin(kbnServer, server) {
  const tutorialProviders = [];
  const scopedTutorialContextFactories = [];
  server.decorate('server', 'getTutorials', request => {
    const initialContext = {};
    const scopedContext = scopedTutorialContextFactories.reduce((accumulatedContext, contextFactory) => {
      return { ...accumulatedContext,
        ...contextFactory(request)
      };
    }, initialContext);
    return tutorialProviders.map(tutorialProvider => {
      return tutorialProvider(server, scopedContext);
    });
  });
  server.decorate('server', 'registerTutorial', specProvider => {
    const emptyContext = {};

    const {
      error
    } = _joi.default.validate(specProvider(server, emptyContext), _tutorial_schema.tutorialSchema);

    if (error) {
      throw new Error(`Unable to register tutorial spec because its invalid. ${error}`);
    }

    tutorialProviders.push(specProvider);
  });
  server.decorate('server', 'addScopedTutorialContextFactory', scopedTutorialContextFactory => {
    if (typeof scopedTutorialContextFactory !== 'function') {
      throw new Error(`Unable to add scoped(request) context factory because you did not provide a function`);
    }

    scopedTutorialContextFactories.push(scopedTutorialContextFactory);
  });
}