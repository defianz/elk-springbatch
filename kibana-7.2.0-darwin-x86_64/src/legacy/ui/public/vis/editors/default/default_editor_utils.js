"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupAggregationsBy = groupAggregationsBy;

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
// NOTE: we cannot export the interface with export { InterfaceName }
// as there is currently a bug on babel typescript transform plugin for it
// https://github.com/babel/babel/issues/7641
//

/**
 * Groups and sorts alphabetically aggregation objects and returns an array of options that are compatible with EuiComboBox options.
 *
 * @param aggs An array of aggregations that will be grouped.
 * @param groupBy A field name which aggregations is grouped by.
 * @param labelName A name of a property which value will be displayed.
 *
 * @returns An array of grouped and sorted alphabetically `aggs` that are compatible with EuiComboBox options. If `aggs` is not an array, the function returns an ampry array.
 */
function groupAggregationsBy(aggs) {
  var groupBy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'type';
  var labelName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'title';

  if (!Array.isArray(aggs)) {
    return [];
  }

  var groupedOptions = aggs.reduce(function (array, type) {
    var group = array.find(function (element) {
      return element.label === type[groupBy];
    });
    var option = {
      label: type[labelName],
      value: type
    };

    if (group) {
      group.options.push(option);
    } else {
      array.push({
        label: type[groupBy],
        options: [option]
      });
    }

    return array;
  }, []);
  groupedOptions.sort(sortByLabel);
  groupedOptions.forEach(function (group) {
    if (Array.isArray(group.options)) {
      group.options.sort(sortByLabel);
    }
  });

  if (groupedOptions.length === 1 && !groupedOptions[0].label) {
    return groupedOptions[0].options || [];
  }

  return groupedOptions;
}

function sortByLabel(a, b) {
  return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
}