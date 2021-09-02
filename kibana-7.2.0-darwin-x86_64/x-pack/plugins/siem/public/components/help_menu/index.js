"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_dom_1 = require("react-dom");
const react_1 = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const help_menu_1 = require("./help_menu");
exports.HelpMenu = recompose_1.pure(() => {
    react_1.useEffect(() => {
        chrome_1.default.helpExtension.set(domNode => {
            react_dom_1.render(react_1.default.createElement(help_menu_1.HelpMenuComponent, null), domNode);
            return () => {
                react_dom_1.unmountComponentAtNode(domNode);
            };
        });
    }, []);
    return null;
});
