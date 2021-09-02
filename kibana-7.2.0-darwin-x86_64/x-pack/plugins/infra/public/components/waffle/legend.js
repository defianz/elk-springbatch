"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = tslib_1.__importDefault(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
const with_waffle_options_1 = require("../../containers/waffle/with_waffle_options");
const gradient_legend_1 = require("./gradient_legend");
const legend_controls_1 = require("./legend_controls");
const type_guards_1 = require("./lib/type_guards");
const steps_legend_1 = require("./steps_legend");
exports.Legend = ({ dataBounds, legend, bounds, formatter }) => {
    return (react_1.default.createElement(LegendContainer, null,
        react_1.default.createElement(with_waffle_options_1.WithWaffleOptions, null, ({ changeBoundsOverride, changeAutoBounds, autoBounds, boundsOverride }) => (react_1.default.createElement(legend_controls_1.LegendControls, { dataBounds: dataBounds, bounds: bounds, autoBounds: autoBounds, boundsOverride: boundsOverride, onChange: (options) => {
                changeBoundsOverride(options.bounds);
                changeAutoBounds(options.auto);
            } }))),
        type_guards_1.isInfraWaffleMapGradientLegend(legend) && (react_1.default.createElement(gradient_legend_1.GradientLegend, { formatter: formatter, legend: legend, bounds: bounds })),
        type_guards_1.isInfraWaffleMapStepLegend(legend) && react_1.default.createElement(steps_legend_1.StepLegend, { formatter: formatter, legend: legend })));
};
const LegendContainer = eui_styled_components_1.default.div `
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
`;
