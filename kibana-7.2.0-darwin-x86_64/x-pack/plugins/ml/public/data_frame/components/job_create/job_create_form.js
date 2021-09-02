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
const jobs_list_1 = require("../../../../common/constants/jobs_list");
const common_1 = require("../../common");
const common_2 = require("../../common");
function getDefaultJobCreateState() {
    return {
        created: false,
        started: false,
        indexPatternId: undefined,
    };
}
exports.getDefaultJobCreateState = getDefaultJobCreateState;
exports.JobCreateForm = react_1.default.memo(({ createIndexPattern, jobConfig, jobId, onChange, overrides }) => {
    const defaults = { ...getDefaultJobCreateState(), ...overrides };
    const [created, setCreated] = react_1.useState(defaults.created);
    const [started, setStarted] = react_1.useState(defaults.started);
    const [indexPatternId, setIndexPatternId] = react_1.useState(defaults.indexPatternId);
    const [progressPercentComplete, setProgressPercentComplete] = react_1.useState(undefined);
    const kibanaContext = react_1.useContext(common_2.KibanaContext);
    if (!common_2.isKibanaContext(kibanaContext)) {
        return null;
    }
    react_1.useEffect(() => {
        onChange({ created, started, indexPatternId });
    }, [created, started, indexPatternId]);
    async function createDataFrame() {
        setCreated(true);
        try {
            await ml_api_service_1.ml.dataFrame.createDataFrameTransformsJob(jobId, jobConfig);
            notify_1.toastNotifications.addSuccess(i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.createJobSuccessMessage', {
                defaultMessage: 'Data frame job {jobId} created successfully.',
                values: { jobId },
            }));
        }
        catch (e) {
            setCreated(false);
            notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.createJobErrorMessage', {
                defaultMessage: 'An error occurred creating the data frame job {jobId}: {error}',
                values: { jobId, error: JSON.stringify(e) },
            }));
            return false;
        }
        if (createIndexPattern) {
            createKibanaIndexPattern();
        }
        return true;
    }
    async function startDataFrame() {
        setStarted(true);
        try {
            await ml_api_service_1.ml.dataFrame.startDataFrameTransformsJob(jobId);
            notify_1.toastNotifications.addSuccess(i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.startJobSuccessMessage', {
                defaultMessage: 'Data frame job {jobId} started successfully.',
                values: { jobId },
            }));
        }
        catch (e) {
            setStarted(false);
            notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.startJobErrorMessage', {
                defaultMessage: 'An error occurred starting the data frame job {jobId}: {error}',
                values: { jobId, error: JSON.stringify(e) },
            }));
        }
    }
    async function createAndStartDataFrame() {
        const success = await createDataFrame();
        if (success) {
            await startDataFrame();
        }
    }
    const createKibanaIndexPattern = async () => {
        const indexPatternName = jobConfig.dest.index;
        try {
            const newIndexPattern = await kibanaContext.indexPatterns.get();
            Object.assign(newIndexPattern, {
                id: '',
                title: indexPatternName,
            });
            const id = await newIndexPattern.create();
            // check if there's a default index pattern, if not,
            // set the newly created one as the default index pattern.
            if (!kibanaContext.kibanaConfig.get('defaultIndex')) {
                await kibanaContext.kibanaConfig.set('defaultIndex', id);
            }
            notify_1.toastNotifications.addSuccess(i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.reateIndexPatternSuccessMessage', {
                defaultMessage: 'Kibana index pattern {indexPatternName} created successfully.',
                values: { indexPatternName },
            }));
            setIndexPatternId(id);
            return true;
        }
        catch (e) {
            notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.createIndexPatternErrorMessage', {
                defaultMessage: 'An error occurred creating the Kibana index pattern {indexPatternName}: {error}',
                values: { indexPatternName, error: JSON.stringify(e) },
            }));
            return false;
        }
    };
    if (started === true && progressPercentComplete === undefined) {
        // wrapping in function so we can keep the interval id in local scope
        function startProgressBar() {
            const interval = setInterval(async () => {
                try {
                    const stats = await ml_api_service_1.ml.dataFrame.getDataFrameTransformsStats(jobId);
                    const percent = Math.round(stats.transforms[0].state.progress.percent_complete);
                    setProgressPercentComplete(percent);
                    if (percent >= 100) {
                        clearInterval(interval);
                    }
                }
                catch (e) {
                    notify_1.toastNotifications.addDanger(i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.progressErrorMessage', {
                        defaultMessage: 'An error occurred getting the progress percentage: {error}',
                        values: { error: JSON.stringify(e) },
                    }));
                    clearInterval(interval);
                }
            }, jobs_list_1.PROGRESS_JOBS_REFRESH_INTERVAL_MS);
            setProgressPercentComplete(0);
        }
        startProgressBar();
    }
    function getJobConfigDevConsoleStatement() {
        return `PUT _data_frame/transforms/${jobId}\n${JSON.stringify(jobConfig, null, 2)}\n\n`;
    }
    // TODO move this to SASS
    const FLEX_GROUP_STYLE = { height: '90px', maxWidth: '800px' };
    const FLEX_ITEM_STYLE = { width: '200px' };
    const PANEL_ITEM_STYLE = { width: '300px' };
    return (react_1.default.createElement(eui_1.EuiForm, null,
        !created && (react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", style: FLEX_GROUP_STYLE },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, style: FLEX_ITEM_STYLE },
                react_1.default.createElement(eui_1.EuiButton, { fill: true, isDisabled: created && started, onClick: createAndStartDataFrame }, i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.createAndStartDataFrameButton', {
                    defaultMessage: 'Create and start',
                }))),
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(eui_1.EuiText, { color: "subdued", size: "s" }, i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.createAndStartDataFrameDescription', {
                    defaultMessage: 'Creates and starts the data frame job. A data frame job will increase search and indexing load in your cluster. Please stop the job if excessive load is experienced. After the job is started, you will be offered options to continue exploring the data frame job.',
                }))))),
        created && (react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", style: FLEX_GROUP_STYLE },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, style: FLEX_ITEM_STYLE },
                react_1.default.createElement(eui_1.EuiButton, { fill: true, isDisabled: created && started, onClick: startDataFrame }, i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.startDataFrameButton', {
                    defaultMessage: 'Start',
                }))),
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(eui_1.EuiText, { color: "subdued", size: "s" }, i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.startDataFrameDescription', {
                    defaultMessage: 'Starts the data frame job. A data frame job will increase search and indexing load in your cluster. Please stop the job if excessive load is experienced. After the job is started, you will be offered options to continue exploring the data frame job.',
                }))))),
        react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", style: FLEX_GROUP_STYLE },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, style: FLEX_ITEM_STYLE },
                react_1.default.createElement(eui_1.EuiButton, { isDisabled: created, onClick: createDataFrame }, i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.createDataFrameButton', {
                    defaultMessage: 'Create',
                }))),
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(eui_1.EuiText, { color: "subdued", size: "s" }, i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.createDataFrameDescription', {
                    defaultMessage: 'Create the data frame job without starting it. You will be able to start the job later by returning to the data frame jobs list.',
                })))),
        react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", style: FLEX_GROUP_STYLE },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, style: FLEX_ITEM_STYLE },
                react_1.default.createElement(eui_1.EuiCopy, { textToCopy: getJobConfigDevConsoleStatement() }, (copy) => (react_1.default.createElement(eui_1.EuiButton, { onClick: copy, style: { width: '100%' } }, i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.copyJobConfigToClipBoardButton', {
                    defaultMessage: 'Copy to clipboard',
                }))))),
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(eui_1.EuiText, { color: "subdued", size: "s" }, i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.copyJobConfigToClipBoardDescription', {
                    defaultMessage: 'Copies to the clipboard the Kibana Dev Console command for creating the job.',
                })))),
        progressPercentComplete !== undefined && (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
            react_1.default.createElement(eui_1.EuiText, { size: "xs" },
                react_1.default.createElement("strong", null, i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.progressTitle', {
                    defaultMessage: 'Progress',
                }))),
            react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "xs" },
                react_1.default.createElement(eui_1.EuiFlexItem, { style: { width: '400px' }, grow: false },
                    react_1.default.createElement(eui_1.EuiProgress, { size: "l", color: "primary", value: progressPercentComplete, max: 100 })),
                react_1.default.createElement(eui_1.EuiFlexItem, null,
                    react_1.default.createElement(eui_1.EuiText, { size: "xs" },
                        progressPercentComplete,
                        "%"))))),
        created && (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiHorizontalRule, null),
            react_1.default.createElement(eui_1.EuiFlexGrid, { gutterSize: "l" },
                react_1.default.createElement(eui_1.EuiFlexItem, { style: PANEL_ITEM_STYLE },
                    react_1.default.createElement(eui_1.EuiCard, { icon: react_1.default.createElement(eui_1.EuiIcon, { size: "xxl", type: "list" }), title: i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.jobsListCardTitle', {
                            defaultMessage: 'Data frame jobs',
                        }), description: i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.jobManagementCardDescription', {
                            defaultMessage: 'Return to the data frame job management page.',
                        }), onClick: common_1.moveToDataFrameJobsList })),
                started === true && createIndexPattern === true && indexPatternId === undefined && (react_1.default.createElement(eui_1.EuiFlexItem, { style: PANEL_ITEM_STYLE },
                    react_1.default.createElement(eui_1.EuiPanel, { style: { position: 'relative' } },
                        react_1.default.createElement(eui_1.EuiProgress, { size: "xs", color: "primary", position: "absolute" }),
                        react_1.default.createElement(eui_1.EuiText, { color: "subdued", size: "s" },
                            react_1.default.createElement("p", null, i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.creatingIndexPatternMessage', {
                                defaultMessage: 'Creating Kibana index pattern ...',
                            })))))),
                started === true && indexPatternId !== undefined && (react_1.default.createElement(eui_1.EuiFlexItem, { style: PANEL_ITEM_STYLE },
                    react_1.default.createElement(eui_1.EuiCard, { icon: react_1.default.createElement(eui_1.EuiIcon, { size: "xxl", type: "discoverApp" }), title: i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.discoverCardTitle', {
                            defaultMessage: 'Discover',
                        }), description: i18n_1.i18n.translate('xpack.ml.dataframe.jobCreateForm.discoverCardDescription', {
                            defaultMessage: 'Use Discover to explore the data frame pivot.',
                        }), onClick: () => common_1.moveToDiscover(indexPatternId, kibanaContext.kbnBaseUrl) }))))))));
});
