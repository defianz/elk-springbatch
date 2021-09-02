"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const all_1 = require("./all");
const alterColumn_1 = require("./alterColumn");
const any_1 = require("./any");
const as_1 = require("./as");
const axisConfig_1 = require("./axisConfig");
const browser_1 = require("./browser");
const case_1 = require("./case");
const clear_1 = require("./clear");
const columns_1 = require("./columns");
const compare_1 = require("./compare");
const containerStyle_1 = require("./containerStyle");
const context_1 = require("./context");
const csv_1 = require("./csv");
const date_1 = require("./date");
const demodata_1 = require("./demodata");
const do_1 = require("./do");
const dropdownControl_1 = require("./dropdownControl");
const eq_1 = require("./eq");
const escount_1 = require("./escount");
const esdocs_1 = require("./esdocs");
const essql_1 = require("./essql");
const exactly_1 = require("./exactly");
const filterrows_1 = require("./filterrows");
const font_1 = require("./font");
const formatdate_1 = require("./formatdate");
const formatnumber_1 = require("./formatnumber");
const getCell_1 = require("./getCell");
const gt_1 = require("./gt");
const gte_1 = require("./gte");
const head_1 = require("./head");
const if_1 = require("./if");
const image_1 = require("./image");
const location_1 = require("./location");
const lt_1 = require("./lt");
const lte_1 = require("./lte");
const mapColumn_1 = require("./mapColumn");
const markdown_1 = require("./markdown");
const math_1 = require("./math");
const metric_1 = require("./metric");
const neq_1 = require("./neq");
const palette_1 = require("./palette");
const pie_1 = require("./pie");
const plot_1 = require("./plot");
const ply_1 = require("./ply");
const pointseries_1 = require("./pointseries");
const progress_1 = require("./progress");
const render_1 = require("./render");
const repeatImage_1 = require("./repeatImage");
const replace_1 = require("./replace");
const revealImage_1 = require("./revealImage");
const rounddate_1 = require("./rounddate");
const rowCount_1 = require("./rowCount");
const seriesStyle_1 = require("./seriesStyle");
const server_1 = require("./server");
const shape_1 = require("./shape");
const sort_1 = require("./sort");
const staticColumn_1 = require("./staticColumn");
const string_1 = require("./string");
const switch_1 = require("./switch");
const table_1 = require("./table");
const tail_1 = require("./tail");
const timefilter_1 = require("./timefilter");
const timefilterControl_1 = require("./timefilterControl");
const urlparam_1 = require("./urlparam");
/**
 * Help text for Canvas Functions should be properly localized. This function will
 * return a dictionary of help strings, organized by Canvas Function specification
 * and then by available arguments.
 *
 * This a function, rather than an object, to future-proof string initialization,
 * if ever necessary.
 */
exports.getFunctionHelp = () => ({
    all: all_1.help,
    alterColumn: alterColumn_1.help,
    any: any_1.help,
    as: as_1.help,
    axisConfig: axisConfig_1.help,
    browser: browser_1.help,
    case: case_1.help,
    clear: clear_1.help,
    columns: columns_1.help,
    compare: compare_1.help,
    containerStyle: containerStyle_1.help,
    context: context_1.help,
    csv: csv_1.help,
    date: date_1.help,
    demodata: demodata_1.help,
    do: do_1.help,
    dropdownControl: dropdownControl_1.help,
    eq: eq_1.help,
    escount: escount_1.help,
    esdocs: esdocs_1.help,
    essql: essql_1.help,
    exactly: exactly_1.help,
    filterrows: filterrows_1.help,
    font: font_1.help,
    formatdate: formatdate_1.help,
    formatnumber: formatnumber_1.help,
    getCell: getCell_1.help,
    gt: gt_1.help,
    gte: gte_1.help,
    head: head_1.help,
    if: if_1.help,
    image: image_1.help,
    location: location_1.help,
    lt: lt_1.help,
    lte: lte_1.help,
    mapColumn: mapColumn_1.help,
    markdown: markdown_1.help,
    math: math_1.help,
    metric: metric_1.help,
    neq: neq_1.help,
    palette: palette_1.help,
    pie: pie_1.help,
    plot: plot_1.help,
    ply: ply_1.help,
    pointseries: pointseries_1.help,
    progress: progress_1.help,
    render: render_1.help,
    repeatImage: repeatImage_1.help,
    replace: replace_1.help,
    revealImage: revealImage_1.help,
    rounddate: rounddate_1.help,
    rowCount: rowCount_1.help,
    seriesStyle: seriesStyle_1.help,
    server: server_1.help,
    shape: shape_1.help,
    sort: sort_1.help,
    staticColumn: staticColumn_1.help,
    string: string_1.help,
    switch: switch_1.help,
    table: table_1.help,
    tail: tail_1.help,
    timefilter: timefilter_1.help,
    timefilterControl: timefilterControl_1.help,
    urlparam: urlparam_1.help,
});
