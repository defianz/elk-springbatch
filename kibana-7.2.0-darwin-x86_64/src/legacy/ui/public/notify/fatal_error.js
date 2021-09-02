"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__newPlatformSetup__ = __newPlatformSetup__;
exports.addFatalErrorCallback = addFatalErrorCallback;
exports.fatalError = fatalError;

var _format_angular_http_error = require("./lib/format_angular_http_error");

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
var newPlatformFatalErrors;

function __newPlatformSetup__(instance) {
  if (newPlatformFatalErrors) {
    throw new Error('ui/notify/fatal_error already initialized with new platform apis');
  }

  newPlatformFatalErrors = instance;
}

function addFatalErrorCallback(callback) {
  newPlatformFatalErrors.get$().subscribe(function () {
    callback();
  });
}

function fatalError(error, location) {
  // add support for angular http errors to newPlatformFatalErrors
  if ((0, _format_angular_http_error.isAngularHttpError)(error)) {
    error = (0, _format_angular_http_error.formatAngularHttpError)(error);
  }

  newPlatformFatalErrors.add(error, location);
}