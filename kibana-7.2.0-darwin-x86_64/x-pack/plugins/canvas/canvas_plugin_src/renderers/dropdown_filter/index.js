"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore - Interpreter not typed yet
const common_1 = require("@kbn/interpreter/common");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importDefault(require("react"));
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
const sync_filter_expression_1 = require("../../../public/lib/sync_filter_expression");
const component_1 = require("./component");
const MATCH_ALL = '%%CANVAS_MATCH_ALL%%';
const getFilterValue = (filterExpression) => {
    if (filterExpression === '') {
        return MATCH_ALL;
    }
    const filterAST = common_1.fromExpression(filterExpression);
    return lodash_1.get(filterAST, 'chain[0].arguments.value[0]', MATCH_ALL);
};
exports.dropdownFilter = () => ({
    name: 'dropdown_filter',
    displayName: 'Dropdown filter',
    help: 'A dropdown from which you can select values for an "exactly" filter',
    reuseDomNode: true,
    height: 50,
    render(domNode, config, handlers) {
        const filterExpression = handlers.getFilter();
        if (filterExpression !== '') {
            // NOTE: setFilter() will cause a data refresh, avoid calling unless required
            // compare expression and filter, update filter if needed
            const { changed, newAst } = sync_filter_expression_1.syncFilterExpression(config, filterExpression, ['filterGroup']);
            if (changed) {
                handlers.setFilter(common_1.toExpression(newAst));
            }
        }
        const commit = (commitValue) => {
            if (commitValue === '%%CANVAS_MATCH_ALL%%') {
                handlers.setFilter('');
            }
            else {
                const newFilterAST = {
                    type: 'expression',
                    chain: [
                        {
                            type: 'function',
                            function: 'exactly',
                            arguments: {
                                value: [commitValue],
                                column: [config.column],
                                filterGroup: [config.filterGroup],
                            },
                        },
                    ],
                };
                const newFilter = common_1.toExpression(newFilterAST);
                handlers.setFilter(newFilter);
            }
        };
        react_dom_1.default.render(react_1.default.createElement(component_1.DropdownFilter, { commit: commit, choices: config.choices || [], value: getFilterValue(filterExpression) }), domNode, () => handlers.done());
        handlers.onDestroy(() => {
            react_dom_1.default.unmountComponentAtNode(domNode);
        });
    },
});
