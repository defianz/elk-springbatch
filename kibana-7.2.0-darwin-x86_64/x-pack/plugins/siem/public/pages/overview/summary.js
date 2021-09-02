"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const documentation_links_1 = require("ui/documentation_links");
exports.Summary = recompose_1.pure(() => (react_2.default.createElement(eui_1.EuiFlexItem, null,
    react_2.default.createElement(eui_1.EuiText, null,
        react_2.default.createElement("h2", null,
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.startedTitle", defaultMessage: "Getting Started" })),
        react_2.default.createElement("p", null,
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.startedText", defaultMessage: "Welcome to Security Information & Event Management (SIEM). Get started by reviewing our {docs} or {data}. For information about upcoming features and tutorials, be sure to check out our {siemSolution} page.", values: {
                    docs: (react_2.default.createElement(eui_1.EuiLink, { href: documentation_links_1.documentationLinks.siem, target: "blank" },
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.startedText.docsLinkText", defaultMessage: "documentation" }))),
                    data: (react_2.default.createElement(eui_1.EuiLink, { href: "kibana#home/tutorial_directory/security" },
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.startedText.dataLinkText", defaultMessage: "ingesting data" }))),
                    siemSolution: (react_2.default.createElement(eui_1.EuiLink, { href: "https://www.elastic.co/solutions/siem", target: "blank" },
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.startedText.siemSolutionLinkText", defaultMessage: "SIEM Solution" }))),
                } })),
        react_2.default.createElement("h2", null,
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.feedbackTitle", defaultMessage: "Feedback" })),
        react_2.default.createElement("p", null,
            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.feedbackText", defaultMessage: "If you have input or suggestions regarding your experience with Elastic SIEM, please feel free to {feedback}.", values: {
                    feedback: (react_2.default.createElement(eui_1.EuiLink, { href: "https://discuss.elastic.co/c/siem", target: "blank" },
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.siem.overview.feedbackText.feedbackLinkText", defaultMessage: "submit feedback online" }))),
                } }))))));
