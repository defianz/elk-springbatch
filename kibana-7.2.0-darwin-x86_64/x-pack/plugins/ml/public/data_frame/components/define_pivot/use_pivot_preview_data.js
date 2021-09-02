"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const common_1 = require("../../../../common/types/common");
const ml_api_service_1 = require("../../../services/ml_api_service");
const common_2 = require("../../common");
var PIVOT_PREVIEW_STATUS;
(function (PIVOT_PREVIEW_STATUS) {
    PIVOT_PREVIEW_STATUS[PIVOT_PREVIEW_STATUS["UNUSED"] = 0] = "UNUSED";
    PIVOT_PREVIEW_STATUS[PIVOT_PREVIEW_STATUS["LOADING"] = 1] = "LOADING";
    PIVOT_PREVIEW_STATUS[PIVOT_PREVIEW_STATUS["LOADED"] = 2] = "LOADED";
    PIVOT_PREVIEW_STATUS[PIVOT_PREVIEW_STATUS["ERROR"] = 3] = "ERROR";
})(PIVOT_PREVIEW_STATUS = exports.PIVOT_PREVIEW_STATUS || (exports.PIVOT_PREVIEW_STATUS = {}));
exports.usePivotPreviewData = (indexPattern, query, aggs, groupBy) => {
    const [errorMessage, setErrorMessage] = react_1.useState('');
    const [status, setStatus] = react_1.useState(PIVOT_PREVIEW_STATUS.UNUSED);
    const [dataFramePreviewData, setDataFramePreviewData] = react_1.useState([]);
    const aggsArr = common_1.dictionaryToArray(aggs);
    const groupByArr = common_1.dictionaryToArray(groupBy);
    const previewRequest = common_2.getDataFramePreviewRequest(indexPattern.title, query, groupByArr, aggsArr);
    const getDataFramePreviewData = async () => {
        if (aggsArr.length === 0 || groupByArr.length === 0) {
            setDataFramePreviewData([]);
            return;
        }
        setErrorMessage('');
        setStatus(PIVOT_PREVIEW_STATUS.LOADING);
        try {
            const resp = await ml_api_service_1.ml.dataFrame.getDataFrameTransformsPreview(previewRequest);
            setDataFramePreviewData(resp.preview);
            setStatus(PIVOT_PREVIEW_STATUS.LOADED);
        }
        catch (e) {
            setErrorMessage(JSON.stringify(e));
            setDataFramePreviewData([]);
            setStatus(PIVOT_PREVIEW_STATUS.ERROR);
        }
    };
    react_1.useEffect(() => {
        getDataFramePreviewData();
    }, [
        indexPattern.title,
        aggsArr.map(a => `${a.agg} ${a.field} ${a.aggName}`).join(' '),
        groupByArr
            .map(g => `${g.agg} ${g.field} ${g.aggName} ${common_2.isGroupByDateHistogram(g) ? g.calendar_interval : ''} ${common_2.isGroupByHistogram(g) ? g.interval : ''}`)
            .join(' '),
        JSON.stringify(query),
    ]);
    return { errorMessage, status, dataFramePreviewData, previewRequest };
};
