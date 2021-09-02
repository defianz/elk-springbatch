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
const notify_1 = require("ui/notify");
const eui_1 = require("@elastic/eui");
const common_1 = require("../../../../common/types/common");
const dropdown_1 = require("../../components/aggregation_dropdown/dropdown");
const aggregation_list_1 = require("../../components/aggregation_list");
const group_by_list_1 = require("../../components/group_by_list");
const source_index_preview_1 = require("../../components/source_index_preview");
const pivot_preview_1 = require("./pivot_preview");
const common_2 = require("../../common");
const common_3 = require("./common");
const defaultSearch = '*';
const emptySearch = '';
function getDefaultPivotState(kibanaContext) {
    return {
        aggList: {},
        groupByList: {},
        search: kibanaContext.currentSavedSearch.id !== undefined
            ? kibanaContext.combinedQuery
            : defaultSearch,
        valid: false,
    };
}
exports.getDefaultPivotState = getDefaultPivotState;
function isAggNameConflict(aggName, aggList, groupByList) {
    if (aggList[aggName] !== undefined) {
        notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.definePivot.aggExistsErrorMessage', {
            defaultMessage: `An aggregation configuration with the name '{aggName}' already exists.`,
            values: { aggName },
        }));
        return true;
    }
    if (groupByList[aggName] !== undefined) {
        notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.definePivot.groupByExistsErrorMessage', {
            defaultMessage: `A group by configuration with the name '{aggName}' already exists.`,
            values: { aggName },
        }));
        return true;
    }
    let conflict = false;
    // check the new aggName against existing aggs and groupbys
    const aggNameSplit = aggName.split('.');
    let aggNameCheck;
    aggNameSplit.forEach(aggNamePart => {
        aggNameCheck = aggNameCheck === undefined ? aggNamePart : `${aggNameCheck}.${aggNamePart}`;
        if (aggList[aggNameCheck] !== undefined || groupByList[aggNameCheck] !== undefined) {
            notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.definePivot.nestedConflictErrorMessage', {
                defaultMessage: `Couldn't add configuration '{aggName}' because of a nesting conflict with '{aggNameCheck}'.`,
                values: { aggName, aggNameCheck },
            }));
            conflict = true;
        }
    });
    if (conflict) {
        return true;
    }
    // check all aggs against new aggName
    conflict = Object.keys(aggList).some(aggListName => {
        const aggListNameSplit = aggListName.split('.');
        let aggListNameCheck;
        return aggListNameSplit.some(aggListNamePart => {
            aggListNameCheck =
                aggListNameCheck === undefined ? aggListNamePart : `${aggListNameCheck}.${aggListNamePart}`;
            if (aggListNameCheck === aggName) {
                notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.definePivot.nestedAggListConflictErrorMessage', {
                    defaultMessage: `Couldn't add configuration '{aggName}' because of a nesting conflict with '{aggListName}'.`,
                    values: { aggName, aggListName },
                }));
                return true;
            }
            return false;
        });
    });
    if (conflict) {
        return true;
    }
    // check all group-bys against new aggName
    conflict = Object.keys(groupByList).some(groupByListName => {
        const groupByListNameSplit = groupByListName.split('.');
        let groupByListNameCheck;
        return groupByListNameSplit.some(groupByListNamePart => {
            groupByListNameCheck =
                groupByListNameCheck === undefined
                    ? groupByListNamePart
                    : `${groupByListNameCheck}.${groupByListNamePart}`;
            if (groupByListNameCheck === aggName) {
                notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.definePivot.nestedGroupByListConflictErrorMessage', {
                    defaultMessage: `Couldn't add configuration '{aggName}' because of a nesting conflict with '{groupByListName}'.`,
                    values: { aggName, groupByListName },
                }));
                return true;
            }
            return false;
        });
    });
    return conflict;
}
exports.isAggNameConflict = isAggNameConflict;
exports.DefinePivotForm = react_1.default.memo(({ overrides = {}, onChange }) => {
    const kibanaContext = react_1.useContext(common_2.KibanaContext);
    if (!common_2.isKibanaContext(kibanaContext)) {
        return null;
    }
    const indexPattern = kibanaContext.currentIndexPattern;
    const defaults = { ...getDefaultPivotState(kibanaContext), ...overrides };
    // The search filter
    const [search, setSearch] = react_1.useState(defaults.search);
    const addToSearch = (newSearch) => {
        const currentDisplaySearch = search === defaultSearch ? emptySearch : search;
        setSearch(`${currentDisplaySearch} ${newSearch}`.trim());
    };
    const searchHandler = (d) => {
        const newSearch = d.currentTarget.value === emptySearch ? defaultSearch : d.currentTarget.value;
        setSearch(newSearch);
    };
    // The list of selected group by fields
    const [groupByList, setGroupByList] = react_1.useState(defaults.groupByList);
    const { groupByOptions, groupByOptionsData, aggOptions, aggOptionsData, } = common_3.getPivotDropdownOptions(indexPattern);
    const addGroupBy = (d) => {
        const label = d[0].label;
        const config = groupByOptionsData[label];
        const aggName = config.aggName;
        if (isAggNameConflict(aggName, aggList, groupByList)) {
            return;
        }
        groupByList[aggName] = config;
        setGroupByList({ ...groupByList });
    };
    const updateGroupBy = (previousAggName, item) => {
        const groupByListWithoutPrevious = { ...groupByList };
        delete groupByListWithoutPrevious[previousAggName];
        if (isAggNameConflict(item.aggName, aggList, groupByListWithoutPrevious)) {
            return;
        }
        groupByListWithoutPrevious[item.aggName] = item;
        setGroupByList({ ...groupByListWithoutPrevious });
    };
    const deleteGroupBy = (aggName) => {
        delete groupByList[aggName];
        setGroupByList({ ...groupByList });
    };
    // The list of selected aggregations
    const [aggList, setAggList] = react_1.useState(defaults.aggList);
    const addAggregation = (d) => {
        const label = d[0].label;
        const config = aggOptionsData[label];
        const aggName = config.aggName;
        if (isAggNameConflict(aggName, aggList, groupByList)) {
            return;
        }
        aggList[aggName] = config;
        setAggList({ ...aggList });
    };
    const updateAggregation = (previousAggName, item) => {
        const aggListWithoutPrevious = { ...aggList };
        delete aggListWithoutPrevious[previousAggName];
        if (isAggNameConflict(item.aggName, aggListWithoutPrevious, groupByList)) {
            return;
        }
        aggListWithoutPrevious[item.aggName] = item;
        setAggList({ ...aggListWithoutPrevious });
    };
    const deleteAggregation = (aggName) => {
        delete aggList[aggName];
        setAggList({ ...aggList });
    };
    const pivotAggsArr = common_1.dictionaryToArray(aggList);
    const pivotGroupByArr = common_1.dictionaryToArray(groupByList);
    const pivotQuery = common_2.getPivotQuery(search);
    const valid = pivotGroupByArr.length > 0 && pivotAggsArr.length > 0;
    react_1.useEffect(() => {
        onChange({ aggList, groupByList, search, valid });
    }, [
        pivotAggsArr.map(d => `${d.agg} ${d.field} ${d.aggName}`).join(' '),
        pivotGroupByArr
            .map(d => `${d.agg} ${d.field} ${common_2.isGroupByHistogram(d) ? d.interval : ''} ${common_2.isGroupByDateHistogram(d) ? d.calendar_interval : ''} ${d.aggName}`)
            .join(' '),
        search,
        valid,
    ]);
    // TODO This should use the actual value of `indices.query.bool.max_clause_count`
    const maxIndexFields = 1024;
    const numIndexFields = indexPattern.fields.length;
    const disabledQuery = numIndexFields > maxIndexFields;
    return (react_1.default.createElement(eui_1.EuiFlexGroup, null,
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, style: { minWidth: '420px' } },
            react_1.default.createElement(eui_1.EuiForm, null,
                kibanaContext.currentSavedSearch.id === undefined && typeof search === 'string' && (react_1.default.createElement(react_1.Fragment, null,
                    react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotForm.indexPatternLabel', {
                            defaultMessage: 'Index pattern',
                        }), helpText: disabledQuery
                            ? i18n_1.i18n.translate('xpack.ml.dataframe.definePivotForm.indexPatternHelpText', {
                                defaultMessage: 'An optional query for this index pattern is not supported. The number of supported index fields is {maxIndexFields} whereas this index has {numIndexFields} fields.',
                                values: {
                                    maxIndexFields,
                                    numIndexFields,
                                },
                            })
                            : '' },
                        react_1.default.createElement("span", null, kibanaContext.currentIndexPattern.title)),
                    !disabledQuery && (react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotForm.queryLabel', {
                            defaultMessage: 'Query',
                        }), helpText: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotForm.queryHelpText', {
                            defaultMessage: 'Use a query string to filter the source data (optional).',
                        }) },
                        react_1.default.createElement(eui_1.EuiFieldSearch, { placeholder: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotForm.queryPlaceholder', {
                                defaultMessage: 'Search...',
                            }), onChange: searchHandler, value: search === defaultSearch ? emptySearch : search }))))),
                kibanaContext.currentSavedSearch.id !== undefined && (react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotForm.savedSearchLabel', {
                        defaultMessage: 'Saved search',
                    }) },
                    react_1.default.createElement("span", null, kibanaContext.currentSavedSearch.title))),
                react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotForm.groupByLabel', {
                        defaultMessage: 'Group by',
                    }) },
                    react_1.default.createElement(react_1.Fragment, null,
                        react_1.default.createElement(group_by_list_1.GroupByListForm, { list: groupByList, options: groupByOptionsData, onChange: updateGroupBy, deleteHandler: deleteGroupBy }),
                        react_1.default.createElement(dropdown_1.DropDown, { changeHandler: addGroupBy, options: groupByOptions, placeholder: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotForm.groupByPlaceholder', {
                                defaultMessage: 'Add a group by field ...',
                            }) }))),
                react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotForm.aggregationsLabel', {
                        defaultMessage: 'Aggregations',
                    }) },
                    react_1.default.createElement(react_1.Fragment, null,
                        react_1.default.createElement(aggregation_list_1.AggListForm, { list: aggList, options: aggOptionsData, onChange: updateAggregation, deleteHandler: deleteAggregation }),
                        react_1.default.createElement(dropdown_1.DropDown, { changeHandler: addAggregation, options: aggOptions, placeholder: i18n_1.i18n.translate('xpack.ml.dataframe.definePivotForm.aggregationsPlaceholder', {
                                defaultMessage: 'Add an aggregation ...',
                            }) }))),
                !valid && (react_1.default.createElement(eui_1.EuiFormHelpText, { style: { maxWidth: '320px' } }, i18n_1.i18n.translate('xpack.ml.dataframe.definePivotForm.formHelp', {
                    defaultMessage: 'Data frame transforms are scalable and automated processes for pivoting. Choose at least one group-by and aggregation to get started.',
                }))))),
        react_1.default.createElement(eui_1.EuiFlexItem, null,
            react_1.default.createElement(source_index_preview_1.SourceIndexPreview, { cellClick: addToSearch, query: pivotQuery }),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }),
            react_1.default.createElement(pivot_preview_1.PivotPreview, { aggs: aggList, groupBy: groupByList, query: pivotQuery }))));
});
