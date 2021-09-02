"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const react_1 = require("react");
const ml_api_service_1 = require("../../../services/ml_api_service");
const common_1 = require("../../common");
const common_2 = require("./common");
const SEARCH_SIZE = 1000;
var SOURCE_INDEX_STATUS;
(function (SOURCE_INDEX_STATUS) {
    SOURCE_INDEX_STATUS[SOURCE_INDEX_STATUS["UNUSED"] = 0] = "UNUSED";
    SOURCE_INDEX_STATUS[SOURCE_INDEX_STATUS["LOADING"] = 1] = "LOADING";
    SOURCE_INDEX_STATUS[SOURCE_INDEX_STATUS["LOADED"] = 2] = "LOADED";
    SOURCE_INDEX_STATUS[SOURCE_INDEX_STATUS["ERROR"] = 3] = "ERROR";
})(SOURCE_INDEX_STATUS = exports.SOURCE_INDEX_STATUS || (exports.SOURCE_INDEX_STATUS = {}));
exports.useSourceIndexData = (indexPattern, query, selectedFields, setSelectedFields) => {
    const [errorMessage, setErrorMessage] = react_1.useState('');
    const [status, setStatus] = react_1.useState(SOURCE_INDEX_STATUS.UNUSED);
    const [tableItems, setTableItems] = react_1.useState([]);
    const getSourceIndexData = async function () {
        setErrorMessage('');
        setStatus(SOURCE_INDEX_STATUS.LOADING);
        try {
            const resp = await ml_api_service_1.ml.esSearch({
                index: indexPattern.title,
                size: SEARCH_SIZE,
                // Instead of using the default query (`*`), fall back to a more efficient `match_all` query.
                body: { query: common_1.isDefaultQuery(query) ? { match_all: {} } : query },
            });
            const docs = resp.hits.hits;
            if (selectedFields.length === 0) {
                const newSelectedFields = common_2.getDefaultSelectableFields(docs);
                setSelectedFields(newSelectedFields);
            }
            // Create a version of the doc's source with flattened field names.
            // This avoids confusion later on if a field name has dots in its name
            // or is a nested fields when displaying it via EuiInMemoryTable.
            const flattenedFields = common_2.getFlattenedFields(docs[0]._source);
            const transformedTableItems = docs.map(doc => {
                const item = {};
                flattenedFields.forEach(ff => {
                    item[ff] = lodash_1.get(doc._source, ff);
                    if (item[ff] === undefined) {
                        item[ff] = doc._source[`"${ff}"`];
                    }
                });
                return {
                    ...doc,
                    _source: item,
                };
            });
            setTableItems(transformedTableItems);
            setStatus(SOURCE_INDEX_STATUS.LOADED);
        }
        catch (e) {
            setErrorMessage(JSON.stringify(e));
            setTableItems([]);
            setStatus(SOURCE_INDEX_STATUS.ERROR);
        }
    };
    react_1.useEffect(() => {
        getSourceIndexData();
    }, [indexPattern.title, JSON.stringify(query)]);
    return { errorMessage, status, tableItems };
};
