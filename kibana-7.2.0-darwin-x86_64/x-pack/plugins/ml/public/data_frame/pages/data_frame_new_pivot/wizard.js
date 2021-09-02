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
const wizard_nav_1 = require("../../components/wizard_nav");
const define_pivot_1 = require("../../components/define_pivot");
const job_create_1 = require("../../components/job_create");
const common_1 = require("../../common");
const job_details_1 = require("../../components/job_details");
const common_2 = require("../../common");
var WIZARD_STEPS;
(function (WIZARD_STEPS) {
    WIZARD_STEPS[WIZARD_STEPS["DEFINE_PIVOT"] = 0] = "DEFINE_PIVOT";
    WIZARD_STEPS[WIZARD_STEPS["JOB_DETAILS"] = 1] = "JOB_DETAILS";
    WIZARD_STEPS[WIZARD_STEPS["JOB_CREATE"] = 2] = "JOB_CREATE";
})(WIZARD_STEPS || (WIZARD_STEPS = {}));
const DefinePivotStep = ({ isCurrentStep, pivotState, setCurrentStep, setPivot, }) => {
    const definePivotRef = react_1.useRef(null);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement("div", { ref: definePivotRef }),
        isCurrentStep && (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(define_pivot_1.DefinePivotForm, { onChange: setPivot, overrides: pivotState }),
            react_1.default.createElement(wizard_nav_1.WizardNav, { next: () => setCurrentStep(WIZARD_STEPS.JOB_DETAILS), nextActive: pivotState.valid }))),
        !isCurrentStep && react_1.default.createElement(define_pivot_1.DefinePivotSummary, Object.assign({}, pivotState))));
};
exports.Wizard = react_1.default.memo(() => {
    const kibanaContext = react_1.useContext(common_2.KibanaContext);
    if (!common_2.isKibanaContext(kibanaContext)) {
        return null;
    }
    const indexPattern = kibanaContext.currentIndexPattern;
    // The current WIZARD_STEP
    const [currentStep, setCurrentStep] = react_1.useState(WIZARD_STEPS.DEFINE_PIVOT);
    // The DEFINE_PIVOT state
    const [pivotState, setPivot] = react_1.useState(define_pivot_1.getDefaultPivotState(kibanaContext));
    // The JOB_DETAILS state
    const [jobDetailsState, setJobDetails] = react_1.useState(job_details_1.getDefaultJobDetailsState());
    const jobDetails = currentStep === WIZARD_STEPS.JOB_DETAILS ? (react_1.default.createElement(job_details_1.JobDetailsForm, { onChange: setJobDetails, overrides: jobDetailsState })) : (react_1.default.createElement(job_details_1.JobDetailsSummary, Object.assign({}, jobDetailsState)));
    // The JOB_CREATE state
    const [jobCreateState, setJobCreate] = react_1.useState(job_create_1.getDefaultJobCreateState);
    const jobCreate = currentStep === WIZARD_STEPS.JOB_CREATE ? (react_1.default.createElement(job_create_1.JobCreateForm, { createIndexPattern: jobDetailsState.createIndexPattern, jobId: jobDetailsState.jobId, jobConfig: common_1.getDataFrameRequest(indexPattern.title, pivotState, jobDetailsState), onChange: setJobCreate, overrides: jobCreateState })) : (react_1.default.createElement(job_create_1.JobCreateSummary, null));
    // scroll to the currently selected wizard step
    /*
    function scrollToRef() {
      if (definePivotRef !== null && definePivotRef.current !== null) {
        // TODO Fix types
        const dummy = definePivotRef as any;
        const headerOffset = 70;
        window.scrollTo(0, dummy.current.offsetTop - headerOffset);
      }
    }
    */
    const stepsConfig = [
        {
            title: i18n_1.i18n.translate('xpack.ml.dataframe.transformsWizard.definePivotStepTitle', {
                defaultMessage: 'Define pivot',
            }),
            children: (react_1.default.createElement(DefinePivotStep, { isCurrentStep: currentStep === WIZARD_STEPS.DEFINE_PIVOT, pivotState: pivotState, setCurrentStep: setCurrentStep, setPivot: setPivot })),
        },
        {
            title: i18n_1.i18n.translate('xpack.ml.dataframe.transformsWizard.jobDetailsStepTitle', {
                defaultMessage: 'Job details',
            }),
            children: (react_1.default.createElement(react_1.Fragment, null,
                jobDetails,
                currentStep === WIZARD_STEPS.JOB_DETAILS && (react_1.default.createElement(wizard_nav_1.WizardNav, { previous: () => {
                        setCurrentStep(WIZARD_STEPS.DEFINE_PIVOT);
                        // scrollToRef();
                    }, next: () => setCurrentStep(WIZARD_STEPS.JOB_CREATE), nextActive: jobDetailsState.valid })))),
            status: currentStep >= WIZARD_STEPS.JOB_DETAILS ? undefined : 'incomplete',
        },
        {
            title: i18n_1.i18n.translate('xpack.ml.dataframe.transformsWizard.createStepTitle', {
                defaultMessage: 'Create',
            }),
            children: (react_1.default.createElement(react_1.Fragment, null,
                jobCreate,
                currentStep === WIZARD_STEPS.JOB_CREATE && !jobCreateState.created && (react_1.default.createElement(wizard_nav_1.WizardNav, { previous: () => setCurrentStep(WIZARD_STEPS.JOB_DETAILS) })))),
            status: currentStep >= WIZARD_STEPS.JOB_CREATE ? undefined : 'incomplete',
        },
    ];
    return react_1.default.createElement(eui_1.EuiSteps, { steps: stepsConfig });
});
