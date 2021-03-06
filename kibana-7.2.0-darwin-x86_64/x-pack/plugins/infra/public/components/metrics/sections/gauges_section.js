"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
const lib_1 = require("../../../lib/lib");
const formatters_1 = require("../../../utils/formatters");
const getFormatter = (section, seriesId) => (val) => {
    if (val == null) {
        return '';
    }
    const defaultFormatter = lodash_1.get(section, ['visConfig', 'formatter'], lib_1.InfraFormatterType.number);
    const defaultFormatterTemplate = lodash_1.get(section, ['visConfig', 'formatterTemplate'], '{{value}}');
    const formatter = lodash_1.get(section, ['visConfig', 'seriesOverrides', seriesId, 'formatter'], defaultFormatter);
    const formatterTemplate = lodash_1.get(section, ['visConfig', 'seriesOverrides', seriesId, 'formatterTemplate'], defaultFormatterTemplate);
    return formatters_1.createFormatter(formatter, formatterTemplate)(val);
};
class GaugesSection extends react_1.default.PureComponent {
    render() {
        const { metric, section } = this.props;
        return (react_1.default.createElement(eui_1.EuiPageContentBody, null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
            react_1.default.createElement(GroupBox, null, metric.series.map(series => {
                const lastDataPoint = lodash_1.last(series.data);
                if (!lastDataPoint) {
                    return null;
                }
                const formatter = getFormatter(section, series.id);
                const value = formatter(lastDataPoint.value || 0);
                const name = lodash_1.get(section, ['visConfig', 'seriesOverrides', series.id, 'name'], series.id);
                const dataMax = lodash_1.max(series.data.map(d => d.value || 0));
                const gaugeMax = lodash_1.get(section, ['visConfig', 'seriesOverrides', series.id, 'gaugeMax'], dataMax);
                return (react_1.default.createElement(eui_1.EuiFlexItem, { key: `${section.id}-${series.id}`, style: { margin: '0.4rem' } },
                    react_1.default.createElement(eui_1.EuiPanel, { style: { minWidth: '160px' } },
                        react_1.default.createElement(eui_1.EuiText, { style: { textAlign: 'right' }, size: "s" }, name),
                        react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                            react_1.default.createElement("h1", { style: { textAlign: 'right', whiteSpace: 'nowrap' } }, value)),
                        react_1.default.createElement(eui_1.EuiProgress, { value: lastDataPoint.value || 0, max: gaugeMax, size: "s", color: "primary" }))));
            })),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" })));
    }
}
exports.GaugesSection = GaugesSection;
const GroupBox = eui_styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;
