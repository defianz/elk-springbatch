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
const react_2 = tslib_1.__importStar(require("react"));
const feature_utils_1 = require("../../lib/feature_utils");
const section_panel_1 = require("../section_panel");
const feature_table_1 = require("./feature_table");
class EnabledFeatures extends react_2.Component {
    constructor() {
        super(...arguments);
        this.getPanelTitle = () => {
            const featureCount = this.props.features.length;
            const enabledCount = feature_utils_1.getEnabledFeatures(this.props.features, this.props.space).length;
            let details = null;
            if (enabledCount === featureCount) {
                details = (react_2.default.createElement(eui_1.EuiText, { size: 's', style: { display: 'inline-block' } },
                    react_2.default.createElement("em", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.enabledSpaceFeatures.allFeaturesEnabledMessage", defaultMessage: "(all features visible)" }))));
            }
            else if (enabledCount === 0) {
                details = (react_2.default.createElement(eui_1.EuiText, { color: "danger", size: 's', style: { display: 'inline-block' } },
                    react_2.default.createElement("em", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.enabledSpaceFeatures.noFeaturesEnabledMessage", defaultMessage: "(no features visible)" }))));
            }
            else {
                details = (react_2.default.createElement(eui_1.EuiText, { size: 's', style: { display: 'inline-block' } },
                    react_2.default.createElement("em", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.enabledSpaceFeatures.someFeaturesEnabledMessage", defaultMessage: "({enabledCount} / {featureCount} features visible)", values: {
                                enabledCount,
                                featureCount,
                            } }))));
            }
            return (react_2.default.createElement("span", null,
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.enabledSpaceFeatures.enabledFeaturesSectionMessage", defaultMessage: "Customize feature display" }),
                ' ',
                details));
        };
        this.getDescription = () => {
            return (react_2.default.createElement(react_2.Fragment, null,
                react_2.default.createElement(eui_1.EuiText, { size: "s", color: "subdued" },
                    react_2.default.createElement("p", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.enabledSpaceFeatures.notASecurityMechanismMessage", defaultMessage: "The feature is hidden in the UI, but is not disabled." })),
                    this.props.uiCapabilities.spaces.manage && (react_2.default.createElement("p", null,
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.enabledSpaceFeatures.goToRolesLink", defaultMessage: "Want to secure access? Go to {rolesLink}.", values: {
                                rolesLink: (react_2.default.createElement(eui_1.EuiLink, { href: "#/management/security/roles" },
                                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.enabledSpaceFeatures.rolesLinkText", defaultMessage: "Roles" }))),
                            } }))))));
        };
    }
    render() {
        const description = this.props.intl.formatMessage({
            id: 'xpack.spaces.management.manageSpacePage.customizeVisibleFeatures',
            defaultMessage: 'Customize visible features',
        });
        return (react_2.default.createElement(section_panel_1.SectionPanel, { collapsible: true, initiallyCollapsed: true, title: this.getPanelTitle(), description: description, intl: this.props.intl, "data-test-subj": "enabled-features-panel" },
            react_2.default.createElement(eui_1.EuiFlexGroup, null,
                react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiTitle, { size: "xs" },
                        react_2.default.createElement("h3", null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.enabledSpaceFeatures.enableFeaturesInSpaceMessage", defaultMessage: "Control which features are visible in this space." }))),
                    react_2.default.createElement(eui_1.EuiSpacer, { size: "s" }),
                    this.getDescription()),
                react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(feature_table_1.FeatureTable, { features: this.props.features, space: this.props.space, onChange: this.props.onChange, intl: this.props.intl })))));
    }
}
exports.EnabledFeatures = EnabledFeatures;
