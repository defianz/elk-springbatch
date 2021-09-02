"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const columns_1 = require("./columns");
const helpers_1 = require("./helpers");
/** Renders a table view or JSON view of the `ECS` `data` */
exports.EventFieldsBrowser = recompose_1.pure(({ browserFields, data, eventId, isLoading, onUpdateColumns, timelineId }) => (React.createElement(eui_1.EuiInMemoryTable, { items: data.map(item => ({
        ...item,
        valuesConcatenated: item.values != null ? item.values.join() : '',
    })), columns: columns_1.getColumns({
        browserFields,
        eventId,
        isLoading,
        onUpdateColumns,
        timelineId,
    }), pagination: false, search: helpers_1.search, sorting: true })));
