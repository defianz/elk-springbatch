"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const react_2 = tslib_1.__importStar(require("react"));
const toggle_all_features_1 = require("./toggle_all_features");
class FeatureTable extends react_2.Component {
    constructor() {
        super(...arguments);
        this.onChange = (featureId) => (e) => {
            const updatedSpace = {
                ...this.props.space,
            };
            let disabledFeatures = updatedSpace.disabledFeatures || [];
            const isFeatureEnabled = e.target.checked;
            if (isFeatureEnabled) {
                disabledFeatures = disabledFeatures.filter(feature => feature !== featureId);
            }
            else {
                disabledFeatures = lodash_1.default.uniq([...disabledFeatures, featureId]);
            }
            updatedSpace.disabledFeatures = disabledFeatures;
            this.props.onChange(updatedSpace);
        };
        this.onChangeAll = (visible) => {
            const updatedSpace = {
                ...this.props.space,
            };
            if (visible) {
                updatedSpace.disabledFeatures = [];
            }
            else {
                updatedSpace.disabledFeatures = this.props.features.map(feature => feature.id);
            }
            this.props.onChange(updatedSpace);
        };
        this.getColumns = () => [
            {
                field: 'feature',
                name: this.props.intl.formatMessage({
                    id: 'xpack.spaces.management.enabledSpaceFeaturesFeatureColumnTitle',
                    defaultMessage: 'Feature',
                }),
                render: (feature) => {
                    return (react_2.default.createElement(eui_1.EuiText, null,
                        react_2.default.createElement(eui_1.EuiIcon, { size: "m", type: feature.icon }),
                        "\u2002 ",
                        feature.name));
                },
            },
            {
                field: 'space',
                width: '150',
                name: (react_2.default.createElement("span", null,
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.enabledSpaceFeaturesEnabledColumnTitle", defaultMessage: "Show?" }),
                    react_2.default.createElement(toggle_all_features_1.ToggleAllFeatures, { onChange: this.onChangeAll }))),
                render: (spaceEntry, record) => {
                    const checked = !(spaceEntry.disabledFeatures && spaceEntry.disabledFeatures.includes(record.feature.id));
                    return (react_2.default.createElement(eui_1.EuiSwitch, { id: record.feature.id, checked: checked, onChange: this.onChange(record.feature.id), "aria-label": checked ? `${record.feature.name} visible` : `${record.feature.name} disabled` }));
                },
            },
        ];
    }
    render() {
        const { space, features } = this.props;
        const items = features.map(feature => ({
            feature,
            space,
        }));
        return react_2.default.createElement(eui_1.EuiInMemoryTable, { columns: this.getColumns(), items: items });
    }
}
exports.FeatureTable = FeatureTable;
