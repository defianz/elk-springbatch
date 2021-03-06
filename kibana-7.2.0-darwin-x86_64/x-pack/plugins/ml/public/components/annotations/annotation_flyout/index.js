"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const react_2 = require("@kbn/i18n/react");
const notify_1 = require("ui/notify");
const annotations_1 = require("../../../../common/constants/annotations");
const annotations_service_1 = require("../../../services/annotations_service");
const observable_utils_1 = require("../../../util/observable_utils");
const annotation_description_list_1 = require("../annotation_description_list");
const delete_annotation_modal_1 = require("../delete_annotation_modal");
const ml_api_service_1 = require("../../../services/ml_api_service");
class AnnotationFlyoutIntl extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isDeleteModalVisible: false,
        };
        this.annotationSub = null;
        this.annotationTextChangeHandler = (e) => {
            if (this.props.annotation === null) {
                return;
            }
            annotations_service_1.annotation$.next({
                ...this.props.annotation,
                annotation: e.target.value,
            });
        };
        this.cancelEditingHandler = () => {
            annotations_service_1.annotation$.next(null);
        };
        this.deleteConfirmHandler = () => {
            this.setState({ isDeleteModalVisible: true });
        };
        this.deleteHandler = async () => {
            const { annotation, intl } = this.props;
            if (annotation === null) {
                return;
            }
            try {
                await ml_api_service_1.ml.annotations.deleteAnnotation(annotation._id);
                notify_1.toastNotifications.addSuccess(intl.formatMessage({
                    id: 'xpack.ml.timeSeriesExplorer.timeSeriesChart.deletedAnnotationNotificationMessage',
                    defaultMessage: 'Deleted annotation for job with ID {jobId}.',
                }, { jobId: annotation.job_id }));
            }
            catch (err) {
                notify_1.toastNotifications.addDanger(intl.formatMessage({
                    id: 'xpack.ml.timeSeriesExplorer.timeSeriesChart.errorWithDeletingAnnotationNotificationErrorMessage',
                    defaultMessage: 'An error occurred deleting the annotation for job with ID {jobId}: {error}',
                }, { jobId: annotation.job_id, error: JSON.stringify(err) }));
            }
            this.closeDeleteModal();
            annotations_service_1.annotation$.next(null);
            annotations_service_1.annotationsRefresh$.next(true);
        };
        this.closeDeleteModal = () => {
            this.setState({ isDeleteModalVisible: false });
        };
        this.validateAnnotationText = () => {
            // Validates the entered text, returning an array of error messages
            // for display in the form. An empty array is returned if the text is valid.
            const { annotation, intl } = this.props;
            const errors = [];
            if (annotation === null) {
                return errors;
            }
            if (annotation.annotation.trim().length === 0) {
                errors.push(intl.formatMessage({
                    id: 'xpack.ml.timeSeriesExplorer.annotationFlyout.noAnnotationTextError',
                    defaultMessage: 'Enter annotation text',
                }));
            }
            const textLength = annotation.annotation.length;
            if (textLength > annotations_1.ANNOTATION_MAX_LENGTH_CHARS) {
                const charsOver = textLength - annotations_1.ANNOTATION_MAX_LENGTH_CHARS;
                errors.push(intl.formatMessage({
                    id: 'xpack.ml.timeSeriesExplorer.annotationFlyout.maxLengthError',
                    defaultMessage: '{charsOver, number} {charsOver, plural, one {character} other {characters}} above maximum length of {maxChars}',
                }, {
                    maxChars: annotations_1.ANNOTATION_MAX_LENGTH_CHARS,
                    charsOver,
                }));
            }
            return errors;
        };
        this.saveOrUpdateAnnotation = () => {
            const { annotation, intl } = this.props;
            if (annotation === null) {
                return;
            }
            annotations_service_1.annotation$.next(null);
            ml_api_service_1.ml.annotations
                .indexAnnotation(annotation)
                .then(() => {
                annotations_service_1.annotationsRefresh$.next(true);
                if (typeof annotation._id === 'undefined') {
                    notify_1.toastNotifications.addSuccess(intl.formatMessage({
                        id: 'xpack.ml.timeSeriesExplorer.timeSeriesChart.addedAnnotationNotificationMessage',
                        defaultMessage: 'Added an annotation for job with ID {jobId}.',
                    }, { jobId: annotation.job_id }));
                }
                else {
                    notify_1.toastNotifications.addSuccess(intl.formatMessage({
                        id: 'xpack.ml.timeSeriesExplorer.timeSeriesChart.updatedAnnotationNotificationMessage',
                        defaultMessage: 'Updated annotation for job with ID {jobId}.',
                    }, { jobId: annotation.job_id }));
                }
            })
                .catch(resp => {
                if (typeof annotation._id === 'undefined') {
                    notify_1.toastNotifications.addDanger(intl.formatMessage({
                        id: 'xpack.ml.timeSeriesExplorer.timeSeriesChart.errorWithCreatingAnnotationNotificationErrorMessage',
                        defaultMessage: 'An error occurred creating the annotation for job with ID {jobId}: {error}',
                    }, { jobId: annotation.job_id, error: JSON.stringify(resp) }));
                }
                else {
                    notify_1.toastNotifications.addDanger(intl.formatMessage({
                        id: 'xpack.ml.timeSeriesExplorer.timeSeriesChart.errorWithUpdatingAnnotationNotificationErrorMessage',
                        defaultMessage: 'An error occurred updating the annotation for job with ID {jobId}: {error}',
                    }, { jobId: annotation.job_id, error: JSON.stringify(resp) }));
                }
            });
        };
    }
    render() {
        const { annotation, intl } = this.props;
        const { isDeleteModalVisible } = this.state;
        if (annotation === null) {
            return null;
        }
        const isExistingAnnotation = typeof annotation._id !== 'undefined';
        // Check the length of the text is within the max length limit,
        // and warn if the length is approaching the limit.
        const validationErrors = this.validateAnnotationText();
        const isInvalid = validationErrors.length > 0;
        const lengthRatioToShowWarning = 0.95;
        let helpText = null;
        if (isInvalid === false &&
            annotation.annotation.length > annotations_1.ANNOTATION_MAX_LENGTH_CHARS * lengthRatioToShowWarning) {
            helpText = intl.formatMessage({
                id: 'xpack.ml.timeSeriesExplorer.annotationFlyout.approachingMaxLengthWarning',
                defaultMessage: '{charsRemaining, number} {charsRemaining, plural, one {character} other {characters}} remaining',
            }, { charsRemaining: annotations_1.ANNOTATION_MAX_LENGTH_CHARS - annotation.annotation.length });
        }
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiFlyout, { onClose: this.cancelEditingHandler, size: "s", "aria-labelledby": "Add annotation" },
                react_1.default.createElement(eui_1.EuiFlyoutHeader, { hasBorder: true },
                    react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                        react_1.default.createElement("h2", { id: "mlAnnotationFlyoutTitle" }, isExistingAnnotation ? (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.timeSeriesExplorer.annotationFlyout.editAnnotationTitle", defaultMessage: "Edit annotation" })) : (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.timeSeriesExplorer.annotationFlyout.addAnnotationTitle", defaultMessage: "Add annotation" }))))),
                react_1.default.createElement(eui_1.EuiFlyoutBody, null,
                    react_1.default.createElement(annotation_description_list_1.AnnotationDescriptionList, { annotation: annotation }),
                    react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
                    react_1.default.createElement(eui_1.EuiFormRow, { label: react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.timeSeriesExplorer.annotationFlyout.annotationTextLabel", defaultMessage: "Annotation text" }), fullWidth: true, helpText: helpText, isInvalid: isInvalid, error: validationErrors },
                        react_1.default.createElement(eui_1.EuiTextArea, { fullWidth: true, isInvalid: isInvalid, onChange: this.annotationTextChangeHandler, placeholder: "...", value: annotation.annotation }))),
                react_1.default.createElement(eui_1.EuiFlyoutFooter, null,
                    react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween" },
                        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_1.default.createElement(eui_1.EuiButtonEmpty, { iconType: "cross", onClick: this.cancelEditingHandler, flush: "left" },
                                react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.timeSeriesExplorer.annotationFlyout.cancelButtonLabel", defaultMessage: "Cancel" }))),
                        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false }, isExistingAnnotation && (react_1.default.createElement(eui_1.EuiButtonEmpty, { color: "danger", onClick: this.deleteConfirmHandler },
                            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.timeSeriesExplorer.annotationFlyout.deleteButtonLabel", defaultMessage: "Delete" })))),
                        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_1.default.createElement(eui_1.EuiButton, { fill: true, isDisabled: isInvalid === true, onClick: this.saveOrUpdateAnnotation }, isExistingAnnotation ? (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.timeSeriesExplorer.annotationFlyout.updateButtonLabel", defaultMessage: "Update" })) : (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.ml.timeSeriesExplorer.annotationFlyout.createButtonLabel", defaultMessage: "Create" }))))))),
            react_1.default.createElement(delete_annotation_modal_1.DeleteAnnotationModal, { cancelAction: this.closeDeleteModal, deleteAction: this.deleteHandler, isVisible: isDeleteModalVisible })));
    }
}
exports.AnnotationFlyout = observable_utils_1.injectObservablesAsProps({ annotation: annotations_service_1.annotation$ }, react_2.injectI18n(AnnotationFlyoutIntl));
