"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strings_1 = require("../strings");
const area_chart_1 = require("./area_chart");
const bubble_chart_1 = require("./bubble_chart");
const debug_1 = require("./debug");
const donut_1 = require("./donut");
const dropdown_filter_1 = require("./dropdown_filter");
const horizontal_bar_chart_1 = require("./horizontal_bar_chart");
const horizontal_progress_bar_1 = require("./horizontal_progress_bar");
const horizontal_progress_pill_1 = require("./horizontal_progress_pill");
const image_1 = require("./image");
const line_chart_1 = require("./line_chart");
const markdown_1 = require("./markdown");
const metric_1 = require("./metric");
const pie_1 = require("./pie");
const plot_1 = require("./plot");
const progress_gauge_1 = require("./progress_gauge");
const progress_semicircle_1 = require("./progress_semicircle");
const progress_wheel_1 = require("./progress_wheel");
const repeat_image_1 = require("./repeat_image");
const reveal_image_1 = require("./reveal_image");
const shape_1 = require("./shape");
const table_1 = require("./table");
const tilted_pie_1 = require("./tilted_pie");
const time_filter_1 = require("./time_filter");
const vert_bar_chart_1 = require("./vert_bar_chart");
const vertical_progress_bar_1 = require("./vertical_progress_bar");
const vertical_progress_pill_1 = require("./vertical_progress_pill");
exports.elementSpecs = strings_1.applyElementStrings([
    area_chart_1.areaChart,
    bubble_chart_1.bubbleChart,
    debug_1.debug,
    donut_1.donut,
    dropdown_filter_1.dropdownFilter,
    image_1.image,
    horizontal_bar_chart_1.horizontalBarChart,
    horizontal_progress_bar_1.horizontalProgressBar,
    horizontal_progress_pill_1.horizontalProgressPill,
    line_chart_1.lineChart,
    markdown_1.markdown,
    metric_1.metric,
    pie_1.pie,
    plot_1.plot,
    progress_gauge_1.progressGauge,
    progress_semicircle_1.progressSemicircle,
    progress_wheel_1.progressWheel,
    repeat_image_1.repeatImage,
    reveal_image_1.revealImage,
    shape_1.shape,
    table_1.table,
    tilted_pie_1.tiltedPie,
    time_filter_1.timeFilter,
    vert_bar_chart_1.verticalBarChart,
    vertical_progress_bar_1.verticalProgressBar,
    vertical_progress_pill_1.verticalProgressPill,
]);
