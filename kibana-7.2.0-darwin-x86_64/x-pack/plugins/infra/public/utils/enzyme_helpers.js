"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * intl context around them.
 */
const react_1 = require("@kbn/i18n/react");
const enzyme_1 = require("enzyme");
const react_2 = tslib_1.__importDefault(require("react"));
const test_utils_1 = require("react-dom/test-utils");
// Use fake component to extract `intl` property to use in tests.
const { intl } = enzyme_1.mount(react_2.default.createElement(react_1.I18nProvider, null,
    react_2.default.createElement("br", null))).find('IntlProvider')
    .instance()
    .getChildContext();
function getOptions(context = {}, childContextTypes = {}, props = {}) {
    return {
        context: {
            ...context,
            intl,
        },
        childContextTypes: {
            ...childContextTypes,
            intl: react_1.intlShape,
        },
        ...props,
    };
}
/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
    return react_2.default.cloneElement(node, { intl });
}
/**
 *  Creates the wrapper instance using shallow with provided intl object into context
 *
 *  @param node The React element or cheerio wrapper
 *  @param options properties to pass into shallow wrapper
 *  @return The wrapper instance around the rendered output with intl object in context
 */
function shallowWithIntl(node, { context, childContextTypes, ...props } = {}) {
    const options = getOptions(context, childContextTypes, props);
    return enzyme_1.shallow(nodeWithIntlProp(node), options);
}
exports.shallowWithIntl = shallowWithIntl;
/**
 *  Creates the wrapper instance using mount with provided intl object into context
 *
 *  @param node The React element or cheerio wrapper
 *  @param options properties to pass into mount wrapper
 *  @return The wrapper instance around the rendered output with intl object in context
 */
function mountWithIntl(node, { context, childContextTypes, ...props } = {}) {
    const options = getOptions(context, childContextTypes, props);
    return enzyme_1.mount(nodeWithIntlProp(node), options);
}
exports.mountWithIntl = mountWithIntl;
/**
 *  Creates the wrapper instance using render with provided intl object into context
 *
 *  @param node The React element or cheerio wrapper
 *  @param options properties to pass into render wrapper
 *  @return The wrapper instance around the rendered output with intl object in context
 */
function renderWithIntl(node, { context, childContextTypes, ...props } = {}) {
    const options = getOptions(context, childContextTypes, props);
    return enzyme_1.render(nodeWithIntlProp(node), options);
}
exports.renderWithIntl = renderWithIntl;
/**
 * Allows for execution of hooks inside of a test component which records the
 * returned values.
 *
 * @param body A function that calls the hook and returns data derived from it
 * @param WrapperComponent A component that, if provided, will be wrapped
 * around the test component. This can be useful to provide context values.
 * @return {ReactHookWrapper} An object providing access to the hook state and
 * functions to interact with it.
 */
exports.mountHook = (body, WrapperComponent, initialArgs = {}) => {
    const hookValueCallback = jest.fn();
    let component;
    const act = actor => {
        test_utils_1.act(() => {
            actor(getLastHookValue(), (args) => component.setProps(args));
            component.update();
        });
    };
    const getLastHookValue = () => {
        const calls = hookValueCallback.mock.calls;
        if (calls.length <= 0) {
            throw Error('No recent hook value present.');
        }
        return calls[calls.length - 1][0];
    };
    const HookComponent = (props) => {
        hookValueCallback(body(props));
        return null;
    };
    const TestComponent = args => WrapperComponent ? (react_2.default.createElement(WrapperComponent, null,
        react_2.default.createElement(HookComponent, Object.assign({}, args)))) : (react_2.default.createElement(HookComponent, Object.assign({}, args)));
    test_utils_1.act(() => {
        component = enzyme_1.mount(react_2.default.createElement(TestComponent, Object.assign({}, initialArgs)));
    });
    return {
        act,
        component,
        getLastHookValue,
        hookValueCallback,
    };
};
