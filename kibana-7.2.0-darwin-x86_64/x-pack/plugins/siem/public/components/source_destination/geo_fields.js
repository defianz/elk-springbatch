"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const fp_2 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const draggables_1 = require("../draggables");
const country_flag_1 = require("./country_flag");
exports.SOURCE_GEO_CONTINENT_NAME_FIELD_NAME = 'source.geo.continent_name';
exports.SOURCE_GEO_COUNTRY_NAME_FIELD_NAME = 'source.geo.country_name';
exports.SOURCE_GEO_COUNTRY_ISO_CODE_FIELD_NAME = 'source.geo.country_iso_code';
exports.SOURCE_GEO_REGION_NAME_FIELD_NAME = 'source.geo.region_name';
exports.SOURCE_GEO_CITY_NAME_FIELD_NAME = 'source.geo.city_name';
exports.DESTINATION_GEO_CONTINENT_NAME_FIELD_NAME = 'destination.geo.continent_name';
exports.DESTINATION_GEO_COUNTRY_NAME_FIELD_NAME = 'destination.geo.country_name';
exports.DESTINATION_GEO_COUNTRY_ISO_CODE_FIELD_NAME = 'destination.geo.country_iso_code';
exports.DESTINATION_GEO_REGION_NAME_FIELD_NAME = 'destination.geo.region_name';
exports.DESTINATION_GEO_CITY_NAME_FIELD_NAME = 'destination.geo.city_name';
const geoPropNameToFieldNameSuffix = [
    {
        prop: 'GeoContinentName',
        fieldName: 'geo.continent_name',
    },
    {
        prop: 'GeoCountryName',
        fieldName: 'geo.country_name',
    },
    {
        prop: 'GeoCountryIsoCode',
        fieldName: 'geo.country_iso_code',
    },
    {
        prop: 'GeoRegionName',
        fieldName: 'geo.region_name',
    },
    {
        prop: 'GeoCityName',
        fieldName: 'geo.city_name',
    },
];
exports.getGeoFieldPropNameToFieldNameMap = (type) => geoPropNameToFieldNameSuffix.map(({ prop, fieldName }) => ({
    prop: `${type}${prop}`,
    fieldName: `${type}.${fieldName}`,
}));
const GeoFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-right: 5px;
`;
const GeoFieldValues = recompose_1.pure(({ contextId, eventId, fieldName, values }) => values != null ? (React.createElement(React.Fragment, null, fp_2.uniq(values).map(value => (React.createElement(GeoFlexItem, { grow: false, key: `${contextId}-${eventId}-${fieldName}-${value}` },
    React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none" },
        fieldName === exports.SOURCE_GEO_COUNTRY_ISO_CODE_FIELD_NAME ||
            fieldName === exports.DESTINATION_GEO_COUNTRY_ISO_CODE_FIELD_NAME ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(country_flag_1.CountryFlag, { countryCode: value }))) : null,
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(draggables_1.DefaultDraggable, { "data-test-subj": fieldName, field: fieldName, id: `${contextId}-${eventId}-${fieldName}-${value}`, tooltipContent: fieldName, value: value })))))))) : null);
/**
 * Renders a row of draggable text containing geographic fields, such as:
 * - `source|destination.geo.continent_name`
 * - `source|destination.geo.country_name`
 * - `source|destination.geo.country_iso_code`
 * - `source|destination.geo.region_iso_code`
 * - `source|destination.geo.city_name`
 */
exports.GeoFields = recompose_1.pure(props => {
    const { contextId, eventId, type } = props;
    const propNameToFieldName = exports.getGeoFieldPropNameToFieldNameMap(type);
    return (React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none" }, fp_2.uniq(propNameToFieldName).map(geo => (React.createElement(GeoFieldValues, { contextId: contextId, eventId: eventId, fieldName: geo.fieldName, key: geo.fieldName, values: fp_1.get(geo.prop, props) })))));
});
