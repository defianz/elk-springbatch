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
const index_1 = require("../index");
const http_1 = require("../services/http");
exports.RepositoryDeleteProvider = ({ children }) => {
    const { core: { i18n, notification: { toastNotifications }, }, } = index_1.useAppDependencies();
    const { FormattedMessage } = i18n;
    const [repositoryNames, setRepositoryNames] = react_1.useState([]);
    const [isModalOpen, setIsModalOpen] = react_1.useState(false);
    const onSuccessCallback = react_1.useRef(null);
    const deleteRepositoryPrompt = (names, onSuccess = () => undefined) => {
        if (!names || !names.length) {
            throw new Error('No repository names specified for deletion');
        }
        setIsModalOpen(true);
        setRepositoryNames(names);
        onSuccessCallback.current = onSuccess;
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setRepositoryNames([]);
    };
    const deleteRepository = () => {
        const repositoriesToDelete = [...repositoryNames];
        http_1.deleteRepositories(repositoriesToDelete).then(({ data: { itemsDeleted, errors }, error }) => {
            // Surface success notifications
            if (itemsDeleted && itemsDeleted.length) {
                const hasMultipleSuccesses = itemsDeleted.length > 1;
                const successMessage = hasMultipleSuccesses
                    ? i18n.translate('xpack.snapshotRestore.deleteRepository.successMultipleNotificationTitle', {
                        defaultMessage: 'Removed {count} repositories',
                        values: { count: itemsDeleted.length },
                    })
                    : i18n.translate('xpack.snapshotRestore.deleteRepository.successSingleNotificationTitle', {
                        defaultMessage: "Removed repository '{name}'",
                        values: { name: itemsDeleted[0] },
                    });
                toastNotifications.addSuccess(successMessage);
                if (onSuccessCallback.current) {
                    onSuccessCallback.current([...itemsDeleted]);
                }
            }
            // Surface error notifications
            // `error` is generic server error
            // `data.errors` are specific errors with removing particular repository(ies)
            if (error || (errors && errors.length)) {
                const hasMultipleErrors = (errors && errors.length > 1) || (error && repositoriesToDelete.length > 1);
                const errorMessage = hasMultipleErrors
                    ? i18n.translate('xpack.snapshotRestore.deleteRepository.errorMultipleNotificationTitle', {
                        defaultMessage: 'Error removing {count} repositories',
                        values: {
                            count: (errors && errors.length) || repositoriesToDelete.length,
                        },
                    })
                    : i18n.translate('xpack.snapshotRestore.deleteRepository.errorSingleNotificationTitle', {
                        defaultMessage: "Error removing repository '{name}'",
                        values: { name: (errors && errors[0].name) || repositoriesToDelete[0] },
                    });
                toastNotifications.addDanger(errorMessage);
            }
        });
        closeModal();
    };
    const renderModal = () => {
        if (!isModalOpen) {
            return null;
        }
        const isSingle = repositoryNames.length === 1;
        return (react_1.default.createElement(eui_1.EuiOverlayMask, null,
            react_1.default.createElement(eui_1.EuiConfirmModal, { title: isSingle ? (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.deleteRepository.confirmModal.deleteSingleTitle", defaultMessage: "Remove repository '{name}'?", values: { name: repositoryNames[0] } })) : (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.deleteRepository.confirmModal.deleteMultipleTitle", defaultMessage: "Remove {count} repositories?", values: { count: repositoryNames.length } })), onCancel: closeModal, onConfirm: deleteRepository, cancelButtonText: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.deleteRepository.confirmModal.cancelButtonLabel", defaultMessage: "Cancel" }), confirmButtonText: isSingle ? (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.deleteRepository.confirmModal.confirmSingleButtonLabel", defaultMessage: "Remove repository" })) : (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.deleteRepository.confirmModal.confirmMultipleButtonLabel", defaultMessage: "Remove repositories" })), buttonColor: "danger", "data-test-subj": "srDeleteRepositoryConfirmationModal" }, isSingle ? (react_1.default.createElement("p", null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.deleteRepository.confirmModal.deleteSingleDescription", defaultMessage: "The snapshots in this repository will still exist, but Elasticsearch won\u2019t have access to them." }))) : (react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement("p", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.deleteRepository.confirmModal.deleteMultipleListDescription", defaultMessage: "You are about to remove these repositories:" })),
                react_1.default.createElement("ul", null, repositoryNames.map(name => (react_1.default.createElement("li", { key: name }, name)))),
                react_1.default.createElement("p", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.deleteRepository.confirmModal.deleteMultipleDescription", defaultMessage: "The snapshots in these repositories will still exist, but Elasticsearch won't have access to them." })))))));
    };
    return (react_1.default.createElement(react_1.Fragment, null,
        children(deleteRepositoryPrompt),
        renderModal()));
};
