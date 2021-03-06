"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importStar(require("react"));
const elastic_idx_1 = require("@kbn/elastic-idx");
class ManagedTable extends react_1.Component {
    constructor(props) {
        super(props);
        this.onTableChange = ({ page, sort }) => {
            this.setState({ page, sort });
        };
        const defaultSort = {
            field: elastic_idx_1.idx(props, _ => _.columns[0].field) || '',
            direction: 'asc'
        };
        const { initialPageIndex = 0, initialPageSize = 10, initialSort = defaultSort } = props;
        this.state = {
            page: { index: initialPageIndex, size: initialPageSize },
            sort: initialSort
        };
    }
    getCurrentItems() {
        const { items } = this.props;
        const { sort, page } = this.state;
        // TODO: Use _.orderBy once we upgrade to lodash 4+
        const sorted = lodash_1.sortByOrder(items, sort.field, sort.direction);
        return sorted.slice(page.index * page.size, (page.index + 1) * page.size);
    }
    render() {
        const { columns, noItemsMessage, items, hidePerPageOptions = true } = this.props;
        const { page, sort } = this.state;
        return (react_1.default.createElement(eui_1.EuiBasicTable, { noItemsMessage: noItemsMessage, items: this.getCurrentItems(), columns: columns, pagination: {
                hidePerPageOptions,
                totalItemCount: items.length,
                pageIndex: page.index,
                pageSize: page.size
            }, sorting: { sort }, onChange: this.onTableChange }));
    }
}
exports.ManagedTable = ManagedTable;
