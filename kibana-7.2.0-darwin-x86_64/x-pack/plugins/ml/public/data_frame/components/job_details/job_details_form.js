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
const ml_api_service_1 = require("../../../services/ml_api_service");
const common_1 = require("../../common");
function getDefaultJobDetailsState() {
    return {
        createIndexPattern: true,
        jobId: '',
        targetIndex: '',
        touched: false,
        valid: false,
    };
}
exports.getDefaultJobDetailsState = getDefaultJobDetailsState;
exports.JobDetailsForm = react_1.default.memo(({ overrides = {}, onChange }) => {
    const kibanaContext = react_1.useContext(common_1.KibanaContext);
    if (!common_1.isKibanaContext(kibanaContext)) {
        return null;
    }
    const defaults = { ...getDefaultJobDetailsState(), ...overrides };
    const [jobId, setJobId] = react_1.useState(defaults.jobId);
    const [targetIndex, setTargetIndex] = react_1.useState(defaults.targetIndex);
    const [jobIds, setJobIds] = react_1.useState([]);
    const [indexNames, setIndexNames] = react_1.useState([]);
    const [indexPatternTitles, setIndexPatternTitles] = react_1.useState([]);
    const [createIndexPattern, setCreateIndexPattern] = react_1.useState(defaults.createIndexPattern);
    // fetch existing job IDs and indices once for form validation
    react_1.useEffect(() => {
        // use an IIFE to avoid returning a Promise to useEffect.
        (async function () {
            try {
                setJobIds((await ml_api_service_1.ml.dataFrame.getDataFrameTransforms()).transforms.map((job) => job.id));
            }
            catch (e) {
                notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsForm.errorGettingDataFrameJobsList', {
                    defaultMessage: 'An error occurred getting the existing data frame job Ids: {error}',
                    values: { error: JSON.stringify(e) },
                }));
            }
            try {
                setIndexNames((await ml_api_service_1.ml.getIndices()).map(index => index.name));
            }
            catch (e) {
                notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsForm.errorGettingDataFrameIndexNames', {
                    defaultMessage: 'An error occurred getting the existing index names: {error}',
                    values: { error: JSON.stringify(e) },
                }));
            }
            try {
                setIndexPatternTitles(await kibanaContext.indexPatterns.getTitles());
            }
            catch (e) {
                notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsForm.errorGettingIndexPatternTitles', {
                    defaultMessage: 'An error occurred getting the existing index pattern titles: {error}',
                    values: { error: JSON.stringify(e) },
                }));
            }
        })();
    }, []);
    const jobIdExists = jobIds.some(id => jobId === id);
    const indexNameExists = indexNames.some(name => targetIndex === name);
    const indexPatternTitleExists = indexPatternTitles.some(name => targetIndex === name);
    const valid = jobId !== '' &&
        targetIndex !== '' &&
        !jobIdExists &&
        !indexNameExists &&
        (!indexPatternTitleExists || !createIndexPattern);
    // expose state to wizard
    react_1.useEffect(() => {
        onChange({ createIndexPattern, jobId, targetIndex, touched: true, valid });
    }, [createIndexPattern, jobId, targetIndex, valid]);
    return (react_1.default.createElement(eui_1.EuiForm, null,
        react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsForm.jobIdLabel', {
                defaultMessage: 'Job id',
            }), isInvalid: jobIdExists, error: jobIdExists && [
                i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsForm.jobIdError', {
                    defaultMessage: 'A job with this id already exists.',
                }),
            ] },
            react_1.default.createElement(eui_1.EuiFieldText, { placeholder: "job id", value: jobId, onChange: e => setJobId(e.target.value), "aria-label": i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsForm.jobIdInputAriaLabel', {
                    defaultMessage: 'Choose a unique job id.',
                }), isInvalid: jobIdExists })),
        react_1.default.createElement(eui_1.EuiFormRow, { label: i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsForm.targetIndexLabel', {
                defaultMessage: 'Target index',
            }), isInvalid: indexNameExists, error: indexNameExists && [
                i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsForm.targetIndexError', {
                    defaultMessage: 'An index with this name already exists.',
                }),
            ] },
            react_1.default.createElement(eui_1.EuiFieldText, { placeholder: "target index", value: targetIndex, onChange: e => setTargetIndex(e.target.value), "aria-label": i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsForm.targetIndexInputAriaLabel', {
                    defaultMessage: 'Choose a unique target index name.',
                }), isInvalid: indexNameExists })),
        react_1.default.createElement(eui_1.EuiFormRow, { isInvalid: createIndexPattern && indexPatternTitleExists, error: createIndexPattern &&
                indexPatternTitleExists && [
                i18n_1.i18n.translate('xpack.ml.dataframe.jobDetailsForm.indexPatternTitleError', {
                    defaultMessage: 'An index pattern with this title already exists.',
                }),
            ] },
            react_1.default.createElement(eui_1.EuiSwitch, { name: "mlDataFrameCreateIndexPattern", label: i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.createIndexPatternLabel', {
                    defaultMessage: 'Create index pattern',
                }), checked: createIndexPattern === true, onChange: () => setCreateIndexPattern(!createIndexPattern) }))));
});
