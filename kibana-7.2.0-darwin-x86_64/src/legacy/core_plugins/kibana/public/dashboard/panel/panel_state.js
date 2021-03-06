"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPanelState = createPanelState;

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _dashboard_constants = require("../dashboard_constants");

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

/**
 * Represents a panel on a grid. Keeps track of position in the grid and what visualization it
 * contains.
 *
 * @typedef {Object} PanelState
 * @property {number} id - Id of the visualization contained in the panel.
 * @property {string} version - Version of Kibana this panel was created in.
 * @property {string} type - Type of the visualization in the panel.
 * @property {number} panelIndex - Unique id to represent this panel in the grid. Note that this is
 * NOT the index in the panels array. While it may initially represent that, it is not
 * updated with changes in a dashboard, and is simply used as a unique identifier.  The name
 * remains as panelIndex for backward compatibility reasons - changing it can break reporting.
 * @property {Object} gridData
 * @property {number} gridData.w - Width of the panel.
 * @property {number} gridData.h - Height of the panel.
 * @property {number} gridData.x - Column position of the panel.
 * @property {number} gridData.y - Row position of the panel.
 */
// Look for the smallest y and x value where the default panel will fit.
function findTopLeftMostOpenSpace(width, height, currentPanels) {
  var maxY = -1;
  currentPanels.forEach(function (panel) {
    maxY = Math.max(panel.gridData.y + panel.gridData.h, maxY);
  }); // Handle case of empty grid.

  if (maxY < 0) {
    return {
      x: 0,
      y: 0
    };
  }

  var grid = new Array(maxY);

  for (var y = 0; y < maxY; y++) {
    grid[y] = new Array(_dashboard_constants.DASHBOARD_GRID_COLUMN_COUNT).fill(0);
  }

  currentPanels.forEach(function (panel) {
    for (var x = panel.gridData.x; x < panel.gridData.x + panel.gridData.w; x++) {
      for (var _y = panel.gridData.y; _y < panel.gridData.y + panel.gridData.h; _y++) {
        grid[_y][x] = 1;
      }
    }
  });

  for (var _y2 = 0; _y2 < maxY; _y2++) {
    for (var x = 0; x < _dashboard_constants.DASHBOARD_GRID_COLUMN_COUNT; x++) {
      if (grid[_y2][x] === 1) {
        // Space is filled
        continue;
      } else {
        for (var h = _y2; h < Math.min(_y2 + height, maxY); h++) {
          for (var w = x; w < Math.min(x + width, _dashboard_constants.DASHBOARD_GRID_COLUMN_COUNT); w++) {
            var spaceIsEmpty = grid[h][w] === 0;
            var fitsPanelWidth = w === x + width - 1; // If the panel is taller than any other panel in the current grid, it can still fit in the space, hence
            // we check the minimum of maxY and the panel height.

            var fitsPanelHeight = h === Math.min(_y2 + height - 1, maxY - 1);

            if (spaceIsEmpty && fitsPanelWidth && fitsPanelHeight) {
              // Found space
              return {
                x: x,
                y: _y2
              };
            } else if (grid[h][w] === 1) {
              // x, y spot doesn't work, break.
              break;
            }
          }
        }
      }
    }
  }

  return {
    x: 0,
    y: Infinity
  };
}
/**
 * Creates and initializes a basic panel state.
 * @param {number} id
 * @param {string} type
 * @param {number} panelIndex
 * @param {Array} currentPanels
 * @return {PanelState}
 */


function createPanelState(id, type, panelIndex, currentPanels) {
  var _findTopLeftMostOpenS = findTopLeftMostOpenSpace(_dashboard_constants.DEFAULT_PANEL_WIDTH, _dashboard_constants.DEFAULT_PANEL_HEIGHT, currentPanels),
      x = _findTopLeftMostOpenS.x,
      y = _findTopLeftMostOpenS.y;

  return {
    gridData: {
      w: _dashboard_constants.DEFAULT_PANEL_WIDTH,
      h: _dashboard_constants.DEFAULT_PANEL_HEIGHT,
      x: x,
      y: y,
      i: panelIndex.toString()
    },
    version: _chrome.default.getKibanaVersion(),
    panelIndex: panelIndex.toString(),
    type: type,
    id: id,
    embeddableConfig: {}
  };
}