"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBackgroundInverted = exports.isBackgroundDark = exports.isThemeDark = void 0;

var _color = _interopRequireDefault(require("color"));

var _chrome = _interopRequireDefault(require("../../../ui/public/chrome"));

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
const IS_DARK_THEME = _chrome.default.getUiSettingsClient().get('theme:darkMode');
/**
 * Returns true if the color that is passed has low luminosity
 */


const isColorDark = c => {
  return (0, _color.default)(c).luminosity() < 0.45;
};
/**
 * Checks to see if the `currentTheme` is dark in luminosity.
 * Defaults to checking `theme:darkMode`.
 */


const isThemeDark = currentTheme => {
  let themeIsDark = currentTheme || IS_DARK_THEME; // If passing a string, check the luminosity

  if (typeof currentTheme === 'string') {
    themeIsDark = isColorDark(currentTheme);
  }

  return themeIsDark;
};
/**
 * Checks to find if the ultimate `backgroundColor` is dark.
 * Defaults to returning if the `currentTheme` is dark.
 */


exports.isThemeDark = isThemeDark;

const isBackgroundDark = (backgroundColor, currentTheme) => {
  const themeIsDark = isThemeDark(currentTheme); // If a background color doesn't exist or it inherits, pass back if it's a darktheme

  if (backgroundColor === undefined || backgroundColor === 'inherit') {
    return themeIsDark;
  } // Otherwise return if the background color has low luminosity


  return isColorDark(backgroundColor);
};
/**
 * Checks to see if `backgroundColor` is the the same lightness spectrum as `currentTheme`.
 */


exports.isBackgroundDark = isBackgroundDark;

const isBackgroundInverted = (backgroundColor, currentTheme) => {
  const backgroundIsDark = isBackgroundDark(backgroundColor, currentTheme);
  const themeIsDark = isThemeDark(currentTheme);
  return backgroundIsDark !== themeIsDark;
};

exports.isBackgroundInverted = isBackgroundInverted;