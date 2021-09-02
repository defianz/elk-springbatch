"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const documentation_links_1 = require("../../lib/documentation_links");
const steps = [
    {
        title: 'Check if multiple Kibana instances are used as a cluster',
        children: (react_1.default.createElement(eui_1.EuiText, null,
            react_1.default.createElement("p", null, "If you are using single Kibana instance, you can skip this step."),
            react_1.default.createElement("p", null, "If you are using multiple Kibana nodes, you will need to configure at least one node as a Code instance. Please add the following line of code into your kibana.yml file for every instance you wish to run Code on:"),
            react_1.default.createElement("pre", null,
                react_1.default.createElement("code", null, "xpack.code.codeNodeUrl: 'http://$YourCodeNodeAddress'")),
            react_1.default.createElement("p", null, "Where `$YourCodeNoteAddress` is the URL of your assigned Code node accessible by other Kibana instances."))),
    },
    {
        title: 'Install extra language support optionally',
        children: (react_1.default.createElement(eui_1.EuiText, null,
            react_1.default.createElement("p", null,
                "Look",
                ' ',
                react_1.default.createElement(eui_1.EuiLink, { href: documentation_links_1.documentationLinks.codeInstallLangServer, target: "_blank" }, "here"),
                ' ',
                "to learn more about supported languages and language server installation."),
            react_1.default.createElement("p", null,
                "If you need Java language support, you can manage language server installation",
                ' ',
                react_1.default.createElement(react_router_dom_1.Link, { to: "/admin?tab=LanguageServers" }, "here")))),
    },
    {
        title: 'Add a repository to Code',
        children: (react_1.default.createElement(eui_1.EuiText, null,
            react_1.default.createElement("p", null,
                "Import",
                ' ',
                react_1.default.createElement(eui_1.EuiLink, { href: documentation_links_1.documentationLinks.codeGettingStarted, target: "_blank" },
                    ' ',
                    "a sample repo"),
                ' ',
                "or",
                ' ',
                react_1.default.createElement(eui_1.EuiLink, { href: documentation_links_1.documentationLinks.codeRepoManagement, target: "_blank" }, "your own repo"),
                ". Simply paste your git clone URLs into Code."))),
    },
    {
        title: 'Verify the repo is successfully imported',
        children: (react_1.default.createElement(eui_1.EuiText, null,
            react_1.default.createElement("p", null,
                "You can verify your repo is successfully imported by",
                ' ',
                react_1.default.createElement(eui_1.EuiLink, { href: documentation_links_1.documentationLinks.codeSearch, target: "_blank" }, "searching"),
                ' ',
                "and",
                ' ',
                react_1.default.createElement(eui_1.EuiLink, { href: documentation_links_1.documentationLinks.codeOtherFeatures, target: "_blank" }, "navigating"),
                ' ',
                "the repo. If language support is available to the repo, make sure",
                ' ',
                react_1.default.createElement(eui_1.EuiLink, { href: documentation_links_1.documentationLinks.semanticNavigation, target: "_blank" }, "semantic navigation"),
                ' ',
                "is available as well."))),
    },
];
const toastMessage = (react_1.default.createElement("div", null,
    react_1.default.createElement("p", null,
        "We\u2019ve made some changes to roles and permissions in Kibana. Read more about what these changes mean for you below.",
        ' '),
    react_1.default.createElement(eui_1.EuiButton, { size: "s", href: documentation_links_1.documentationLinks.kibanaRoleManagement }, "Learn more")));
class SetupGuidePage extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hideToast: false,
        };
    }
    render() {
        let setup = null;
        if (this.props.setupOk !== undefined) {
            setup = (react_1.default.createElement("div", null,
                !this.state.hideToast && (react_1.default.createElement(eui_1.EuiGlobalToastList, { toasts: [
                        {
                            title: 'Permission Changes',
                            color: 'primary',
                            iconType: 'iInCircle',
                            text: toastMessage,
                            id: '',
                        },
                    ], dismissToast: () => {
                        this.setState({ hideToast: true });
                    }, toastLifeTimeMs: 10000 })),
                react_1.default.createElement(react_1.default.Fragment, null,
                    this.props.setupOk === false && (react_1.default.createElement(eui_1.EuiCallOut, { title: "Code instance not found.", color: "danger", iconType: "cross" },
                        react_1.default.createElement("p", null, "Please follow the guide below to configure your Kibana instance. Once configured, refresh this page."))),
                    this.props.setupOk === true && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
                        react_1.default.createElement(eui_1.EuiButton, { iconType: "sortLeft" },
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/admin" }, "Back To project dashboard")),
                        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }))),
                    react_1.default.createElement(eui_1.EuiPanel, null,
                        react_1.default.createElement(eui_1.EuiTitle, null,
                            react_1.default.createElement("h3", null, "Getting started in Elastic Code")),
                        react_1.default.createElement(eui_1.EuiSpacer, null),
                        react_1.default.createElement(eui_1.EuiSteps, { steps: steps })))));
        }
        return react_1.default.createElement("div", { className: "codeContainer__setup" }, setup);
    }
}
const mapStateToProps = (state) => ({
    setupOk: state.setup.ok,
});
exports.SetupGuide = react_redux_1.connect(mapStateToProps)(SetupGuidePage);
