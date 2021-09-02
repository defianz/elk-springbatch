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
const i18n_1 = require("@kbn/i18n");
const react_2 = tslib_1.__importStar(require("react"));
const capabilities_1 = require("ui/capabilities");
exports.SecureSpaceMessage = ({}) => {
    if (capabilities_1.capabilities.get().spaces.manage) {
        const rolesLinkTextAriaLabel = i18n_1.i18n.translate('xpack.spaces.management.secureSpaceMessage.rolesLinkTextAriaLabel', { defaultMessage: 'Roles management page' });
        return (react_2.default.createElement(react_2.Fragment, null,
            react_2.default.createElement(eui_1.EuiHorizontalRule, null),
            react_2.default.createElement(eui_1.EuiText, { className: "eui-textCenter" },
                react_2.default.createElement("p", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.secureSpaceMessage.howToAssignRoleToSpaceDescription", defaultMessage: "Want to assign a role to a space? Go to {rolesLink}.", values: {
                            rolesLink: (react_2.default.createElement(eui_1.EuiLink, { href: "#/management/security/roles", "aria-label": rolesLinkTextAriaLabel },
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.secureSpaceMessage.rolesLinkText", defaultMessage: "Roles" }))),
                        } })))));
    }
    return null;
};
