"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const lib_1 = require("../../../../common/lib");
const validation_1 = require("../../services/validation");
const step_one_1 = require("./step_one");
const step_two_1 = require("./step_two");
exports.RepositoryForm = ({ repository: originalRepository, isManagedRepository, isEditing, isSaving, saveError, clearSaveError, onSave, }) => {
    const [currentStep, setCurrentStep] = react_1.useState(isEditing ? 2 : 1);
    // Repository state
    const [repository, setRepository] = react_1.useState({
        ...originalRepository,
        settings: {
            ...originalRepository.settings,
        },
    });
    // Repository validation state
    const [validation, setValidation] = react_1.useState({
        isValid: true,
        errors: {},
    });
    const updateRepository = (updatedFields) => {
        const newRepository = { ...repository, ...updatedFields };
        setRepository(newRepository);
    };
    const saveRepository = () => {
        const newValidation = validation_1.validateRepository(repository, true);
        const { isValid } = newValidation;
        setValidation(newValidation);
        if (isValid) {
            onSave(repository);
        }
    };
    const goToNextStep = () => {
        const newValidation = validation_1.validateRepository(repository, false);
        const { isValid } = newValidation;
        setValidation(newValidation);
        if (isValid) {
            setCurrentStep(2);
        }
    };
    const goToPreviousStep = () => {
        if (isEditing) {
            return;
        }
        setValidation({
            isValid: true,
            errors: {},
        });
        setCurrentStep(1);
        clearSaveError();
    };
    const hasValidationErrors = !validation.isValid;
    const validationErrors = Object.entries(lib_1.flatten(validation.errors)).reduce((acc, [key, value]) => {
        return [...acc, value];
    }, []);
    const renderStepOne = () => (react_1.default.createElement(step_one_1.RepositoryFormStepOne, { repository: repository, onNext: () => goToNextStep(), updateRepository: updateRepository, validation: validation }));
    const renderStepTwo = () => (react_1.default.createElement(step_two_1.RepositoryFormStepTwo, { repository: repository, isManagedRepository: isManagedRepository, isEditing: isEditing, isSaving: isSaving, onSave: saveRepository, updateRepository: updateRepository, validation: validation, saveError: saveError, onBack: () => goToPreviousStep() }));
    return (react_1.default.createElement(eui_1.EuiForm, { isInvalid: hasValidationErrors, error: validationErrors }, currentStep === 1 && !isEditing ? renderStepOne() : renderStepTwo()));
};
exports.RepositoryForm.defaultProps = {
    isEditing: false,
    isSaving: false,
};
