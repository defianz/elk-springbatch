"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const actions_1 = require("../../actions");
const selectors_1 = require("../../selectors");
const code_symbol_tree_1 = require("./code_symbol_tree");
const mapStateToProps = (state) => ({
    structureTree: selectors_1.structureSelector(state),
    closedPaths: state.symbol.closedPaths,
});
const mapDispatchToProps = {
    openSymbolPath: actions_1.openSymbolPath,
    closeSymbolPath: actions_1.closeSymbolPath,
};
exports.SymbolTree = react_router_dom_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(code_symbol_tree_1.CodeSymbolTree));
