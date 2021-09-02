"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const kibana_privilege_calculator_1 = require("../../../../../../lib/kibana_privilege_calculator");
const collapsible_panel_1 = require("../../collapsible_panel");
const simple_privilege_section_1 = require("./simple_privilege_section");
const space_aware_privilege_section_1 = require("./space_aware_privilege_section");
const transform_error_section_1 = require("./transform_error_section");
class KibanaPrivilegesRegion extends react_1.Component {
    constructor() {
        super(...arguments);
        this.getForm = () => {
            const { kibanaPrivileges, role, spacesEnabled, spaces = [], uiCapabilities, onChange, editable, validator, features, } = this.props;
            if (role._transform_error && role._transform_error.includes('kibana')) {
                return react_1.default.createElement(transform_error_section_1.TransformErrorSection, null);
            }
            const privilegeCalculatorFactory = new kibana_privilege_calculator_1.KibanaPrivilegeCalculatorFactory(kibanaPrivileges);
            if (spacesEnabled) {
                return (react_1.default.createElement(space_aware_privilege_section_1.SpaceAwarePrivilegeSection, { kibanaPrivileges: kibanaPrivileges, role: role, privilegeCalculatorFactory: privilegeCalculatorFactory, spaces: spaces, uiCapabilities: uiCapabilities, features: features, onChange: onChange, editable: editable, validator: validator }));
            }
            else {
                return (react_1.default.createElement(simple_privilege_section_1.SimplePrivilegeSection, { kibanaPrivileges: kibanaPrivileges, features: features, role: role, privilegeCalculatorFactory: privilegeCalculatorFactory, onChange: onChange, editable: editable, intl: this.props.intl }));
            }
        };
    }
    render() {
        return (react_1.default.createElement(collapsible_panel_1.CollapsiblePanel, { iconType: 'logoKibana', title: 'Kibana' }, this.getForm()));
    }
}
exports.KibanaPrivilegesRegion = KibanaPrivilegesRegion;
