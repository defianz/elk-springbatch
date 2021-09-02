"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_dom_1 = tslib_1.__importDefault(require("react-dom"));
const component_1 = require("./component");
exports.advancedFilter = () => ({
    name: 'advanced_filter',
    displayName: 'Advanced filter',
    help: 'Render a Canvas filter expression',
    reuseDomNode: true,
    height: 50,
    render(domNode, _, handlers) {
        react_dom_1.default.render(react_1.default.createElement(component_1.AdvancedFilter, { commit: handlers.setFilter, value: handlers.getFilter() }), domNode, () => handlers.done());
        handlers.onDestroy(() => {
            react_dom_1.default.unmountComponentAtNode(domNode);
        });
    },
});
