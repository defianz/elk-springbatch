"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeSpecs = void 0;

var _boolean = require("./boolean");

var _datatable = require("./datatable");

var _error = require("./error");

var _filter = require("./filter");

var _image = require("./image");

var _null = require("./null");

var _number = require("./number");

var _pointseries = require("./pointseries");

var _render = require("./render");

var _shape = require("./shape");

var _string = require("./string");

var _style = require("./style");

var _kibana_context = require("./kibana_context");

var _kibana_datatable = require("./kibana_datatable");

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
const typeSpecs = [_boolean.boolean, _datatable.datatable, _error.error, _filter.filter, _image.image, _number.number, _null.nullType, _pointseries.pointseries, _render.render, _shape.shape, _string.string, _style.style, _kibana_context.kibanaContext, _kibana_datatable.kibanaDatatable];
exports.typeSpecs = typeSpecs;