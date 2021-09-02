"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const i18n_1 = require("@kbn/i18n");
const eui_1 = require("@elastic/eui");
const common_1 = require("../../../../common/types/common");
const common_2 = require("../../common");
const common_3 = require("../source_index_preview/common");
const common_4 = require("./common");
const use_pivot_preview_data_1 = require("./use_pivot_preview_data");
const CompressedTable = eui_1.EuiInMemoryTable;
function sortColumns(groupByArr) {
    return (a, b) => {
        // make sure groupBy fields are always most left columns
        if (groupByArr.some(d => d.aggName === a) && groupByArr.some(d => d.aggName === b)) {
            return a.localeCompare(b);
        }
        if (groupByArr.some(d => d.aggName === a)) {
            return -1;
        }
        if (groupByArr.some(d => d.aggName === b)) {
            return 1;
        }
        return a.localeCompare(b);
    };
}
function usePrevious(value) {
    const ref = react_1.useRef(null);
    react_1.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
const PreviewTitle = ({ previewRequest }) => {
    const euiCopyText = i18n_1.i18n.translate('xpack.ml.dataframe.pivotPreview.copyClipboardTooltip', {
        defaultMessage: 'Copy Dev Console statement of the pivot preview to the clipboard.',
    });
    return (react_1.default.createElement(eui_1.EuiFlexGroup, null,
        react_1.default.createElement(eui_1.EuiFlexItem, null,
            react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                react_1.default.createElement("span", null, i18n_1.i18n.translate('xpack.ml.dataframe.pivotPreview.dataFramePivotPreviewTitle', {
                    defaultMessage: 'Data frame pivot preview',
                })))),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(eui_1.EuiCopy, { beforeMessage: euiCopyText, textToCopy: common_4.getPivotPreviewDevConsoleStatement(previewRequest) }, (copy) => (react_1.default.createElement(eui_1.EuiButtonIcon, { onClick: copy, iconType: "copyClipboard", "aria-label": euiCopyText }))))));
};
const ErrorMessage = ({ message }) => {
    const error = JSON.parse(message);
    const statusCodeLabel = i18n_1.i18n.translate('xpack.ml.dataframe.pivotPreview.statusCodeLabel', {
        defaultMessage: 'Status code',
    });
    return (react_1.default.createElement(eui_1.EuiText, { size: "xs" },
        react_1.default.createElement("pre", null, (error.message &&
            error.statusCode &&
            `${statusCodeLabel}: ${error.statusCode}\n${error.message}`) ||
            message)));
};
exports.PivotPreview = react_1.default.memo(({ aggs, groupBy, query }) => {
    const [clearTable, setClearTable] = react_1.useState(false);
    const kibanaContext = react_1.useContext(common_2.KibanaContext);
    if (!common_2.isKibanaContext(kibanaContext)) {
        return null;
    }
    const indexPattern = kibanaContext.currentIndexPattern;
    const { dataFramePreviewData, errorMessage, previewRequest, status } = use_pivot_preview_data_1.usePivotPreviewData(indexPattern, query, aggs, groupBy);
    const groupByArr = common_1.dictionaryToArray(groupBy);
    // EuiInMemoryTable has an issue with dynamic sortable columns
    // and will trigger a full page Kibana error in such a case.
    // The following is a workaround until this is solved upstream:
    // - If the sortable/columns config changes,
    //   the table will be unmounted/not rendered.
    //   This is what the useEffect() part does.
    // - After that the table gets re-enabled. To make sure React
    //   doesn't consolidate the state updates, setTimeout is used.
    const firstColumnName = dataFramePreviewData.length > 0
        ? Object.keys(dataFramePreviewData[0]).sort(sortColumns(groupByArr))[0]
        : undefined;
    const firstColumnNameChanged = usePrevious(firstColumnName) !== firstColumnName;
    react_1.useEffect(() => {
        if (firstColumnNameChanged) {
            setClearTable(true);
        }
        if (clearTable) {
            setTimeout(() => setClearTable(false), 0);
        }
    });
    if (firstColumnNameChanged) {
        return null;
    }
    if (status === use_pivot_preview_data_1.PIVOT_PREVIEW_STATUS.ERROR) {
        return (react_1.default.createElement(eui_1.EuiPanel, { grow: false },
            react_1.default.createElement(PreviewTitle, { previewRequest: previewRequest }),
            react_1.default.createElement(eui_1.EuiCallOut, { title: i18n_1.i18n.translate('xpack.ml.dataframe.pivotPreview.dataFramePivotPreviewError', {
                    defaultMessage: 'An error occurred loading the pivot preview.',
                }), color: "danger", iconType: "cross" },
                react_1.default.createElement(ErrorMessage, { message: errorMessage }))));
    }
    if (dataFramePreviewData.length === 0) {
        let noDataMessage = i18n_1.i18n.translate('xpack.ml.dataframe.pivotPreview.dataFramePivotPreviewNoDataCalloutBody', {
            defaultMessage: 'The preview request did not return any data. Please ensure the optional query returns data and that values exist for the field used by group-by and aggregation fields.',
        });
        const aggsArr = common_1.dictionaryToArray(aggs);
        if (aggsArr.length === 0 || groupByArr.length === 0) {
            noDataMessage = i18n_1.i18n.translate('xpack.ml.dataframe.pivotPreview.dataFramePivotPreviewIncompleteConfigCalloutBody', {
                defaultMessage: 'Please choose at least one group-by field and aggregation.',
            });
        }
        return (react_1.default.createElement(eui_1.EuiPanel, { grow: false },
            react_1.default.createElement(PreviewTitle, { previewRequest: previewRequest }),
            react_1.default.createElement(eui_1.EuiCallOut, { title: i18n_1.i18n.translate('xpack.ml.dataframe.pivotPreview.dataFramePivotPreviewNoDataCalloutTitle', {
                    defaultMessage: 'Pivot preview not available',
                }), color: "primary" },
                react_1.default.createElement("p", null, noDataMessage))));
    }
    const columnKeys = common_3.getFlattenedFields(dataFramePreviewData[0]);
    columnKeys.sort(sortColumns(groupByArr));
    const columns = columnKeys.map(k => {
        return {
            field: k,
            name: k,
            sortable: true,
            truncateText: true,
        };
    });
    const sorting = {
        sort: {
            field: columns[0].field,
            direction: eui_1.SortDirection.ASC,
        },
    };
    return (react_1.default.createElement(eui_1.EuiPanel, null,
        react_1.default.createElement(PreviewTitle, { previewRequest: previewRequest }),
        status === use_pivot_preview_data_1.PIVOT_PREVIEW_STATUS.LOADING && react_1.default.createElement(eui_1.EuiProgress, { size: "xs", color: "accent" }),
        status !== use_pivot_preview_data_1.PIVOT_PREVIEW_STATUS.LOADING && (react_1.default.createElement(eui_1.EuiProgress, { size: "xs", color: "accent", max: 1, value: 0 })),
        dataFramePreviewData.length > 0 && clearTable === false && (react_1.default.createElement(CompressedTable, { compressed: true, items: dataFramePreviewData, columns: columns, pagination: {
                initialPageSize: 5,
                pageSizeOptions: [5, 10, 25],
            }, sorting: sorting }))));
});
