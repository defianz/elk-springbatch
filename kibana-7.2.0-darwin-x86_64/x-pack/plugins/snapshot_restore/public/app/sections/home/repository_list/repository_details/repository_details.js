"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const eui_1 = require("@elastic/eui");
require("brace/theme/textmate");
const index_1 = require("../../../../index");
const documentation_1 = require("../../../../services/documentation");
const http_1 = require("../../../../services/http");
const text_1 = require("../../../../services/text");
const navigation_1 = require("../../../../services/navigation");
const constants_1 = require("../../../../../../common/constants");
const components_1 = require("../../../../components");
const constants_2 = require("../../../../constants");
const type_details_1 = require("./type_details");
const RepositoryDetailsUi = ({ repositoryName, onClose, onRepositoryDeleted, history, }) => {
    const { core: { i18n }, } = index_1.useAppDependencies();
    const { FormattedMessage } = i18n;
    const { error, data: repositoryDetails } = http_1.loadRepository(repositoryName);
    const [verification, setVerification] = react_1.useState(undefined);
    const [isLoadingVerification, setIsLoadingVerification] = react_1.useState(false);
    const verifyRepository = async () => {
        setIsLoadingVerification(true);
        const { data } = await http_1.verifyRepository(repositoryName);
        setVerification(data.verification);
        setIsLoadingVerification(false);
    };
    // Reset verification state when repository name changes, either from adjust URL or clicking
    // into a different repository in table list.
    react_1.useEffect(() => {
        setVerification(undefined);
        setIsLoadingVerification(false);
    }, [repositoryName]);
    const renderBody = () => {
        if (repositoryDetails) {
            return renderRepository();
        }
        if (error) {
            return renderError();
        }
        return renderLoading();
    };
    const renderLoading = () => {
        return (react_1.default.createElement(components_1.SectionLoading, null,
            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.loadingRepositoryDescription", defaultMessage: "Loading repository\u2026" })));
    };
    const renderError = () => {
        const notFound = error.status === 404;
        const errorObject = notFound
            ? {
                data: {
                    error: i18n.translate('xpack.snapshotRestore.repositoryDetails.repositoryNotFoundErrorMessage', {
                        defaultMessage: `The repository '{name}' does not exist.`,
                        values: {
                            name: repositoryName,
                        },
                    }),
                },
            }
            : error;
        return (react_1.default.createElement(components_1.SectionError, { title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.loadingRepositoryErrorTitle", defaultMessage: "Error loading repository" }), error: errorObject }));
    };
    const renderSnapshotCount = () => {
        const { snapshots } = repositoryDetails;
        if (!Number.isInteger(snapshots.count)) {
            return (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.noSnapshotInformationDescription", defaultMessage: "No snapshot information" }));
        }
        if (snapshots.count === 0) {
            return (react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.zeroSnapshotsDescription", defaultMessage: "Repository has no snapshots" }));
        }
        return (react_1.default.createElement(eui_1.EuiLink, { href: navigation_1.linkToSnapshots(repositoryName) },
            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.snapshotsDescription", defaultMessage: "{count} {count, plural, one {snapshot} other {snapshots}} found", values: { count: snapshots.count } })));
    };
    const renderRepository = () => {
        const { repository, isManagedRepository } = repositoryDetails;
        if (!repository) {
            return null;
        }
        const { type } = repository;
        return (react_1.default.createElement(react_1.Fragment, null,
            isManagedRepository ? (react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(eui_1.EuiCallOut, { size: "s", color: "warning", iconType: "iInCircle", title: react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.managedRepositoryWarningTitle", defaultMessage: "This is a managed repository used by other systems. Any changes you make might affect how these systems operate." }) }),
                react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }))) : null,
            react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween", alignItems: "flexStart" },
                react_1.default.createElement(eui_1.EuiFlexItem, null,
                    react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                        react_1.default.createElement("h3", null,
                            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.typeTitle", defaultMessage: "Repository type" }))),
                    react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
                    type === constants_1.REPOSITORY_TYPES.source
                        ? text_1.textService.getRepositoryTypeName(type, repository.settings.delegateType)
                        : text_1.textService.getRepositoryTypeName(type)),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiButtonEmpty, { size: "s", flush: "right", href: documentation_1.documentationLinksService.getRepositoryTypeDocUrl(type), target: "_blank", iconType: "help" },
                        react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.repositoryTypeDocLink", defaultMessage: "Repository docs" })))),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }),
            react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.snapshotsTitle", defaultMessage: "Snapshots" }))),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            renderSnapshotCount(),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }),
            react_1.default.createElement(type_details_1.TypeDetails, { repository: repository }),
            react_1.default.createElement(eui_1.EuiHorizontalRule, null),
            renderVerification()));
    };
    const renderVerification = () => (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
            react_1.default.createElement("h3", null,
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.verificationTitle", defaultMessage: "Verification status" }))),
        verification ? (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(components_1.RepositoryVerificationBadge, { verificationResults: verification }),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                react_1.default.createElement("h4", null,
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.verificationDetailsTitle", defaultMessage: "Details" }))),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            verification ? (react_1.default.createElement(eui_1.EuiCodeEditor, { mode: "json", theme: "textmate", width: "100%", isReadOnly: true, value: JSON.stringify(verification.valid ? verification.response : verification.error, null, 2), setOptions: {
                    showLineNumbers: false,
                    tabSize: 2,
                    maxLines: Infinity,
                }, editorProps: {
                    $blockScrolling: Infinity,
                }, showGutter: false, minLines: 6, "aria-label": react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.verificationDetails", defaultMessage: "Verification details repository '{name}'", values: {
                        name,
                    } }) })) : null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
            react_1.default.createElement(eui_1.EuiButton, { onClick: verifyRepository, color: "primary", isLoading: isLoadingVerification },
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.reverifyButtonLabel", defaultMessage: "Re-verify repository" })))) : (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
            react_1.default.createElement(eui_1.EuiButton, { onClick: verifyRepository, color: "primary", isLoading: isLoadingVerification },
                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.verifyButtonLabel", defaultMessage: "Verify repository" }))))));
    const renderFooter = () => {
        return (react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween", alignItems: "center" },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(eui_1.EuiButtonEmpty, { iconType: "cross", flush: "left", onClick: onClose, "data-test-subj": "srRepositoryDetailsFlyoutCloseButton" },
                    react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.closeButtonLabel", defaultMessage: "Close" }))),
            repositoryDetails ? (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center" },
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(components_1.RepositoryDeleteProvider, null, deleteRepositoryPrompt => {
                            return (react_1.default.createElement(eui_1.EuiButtonEmpty, { color: "danger", "data-test-subj": "srRepositoryDetailsDeleteActionButton", onClick: () => deleteRepositoryPrompt([repositoryName], onRepositoryDeleted), isDisabled: repositoryDetails.isManagedRepository, title: repositoryDetails.isManagedRepository
                                    ? i18n.translate('xpack.snapshotRestore.repositoryDetails.removeManagedRepositoryButtonTitle', {
                                        defaultMessage: 'You cannot delete a managed repository.',
                                    })
                                    : null },
                                react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.removeButtonLabel", defaultMessage: "Remove" })));
                        })),
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiButton, { href: history.createHref({
                                pathname: `${constants_2.BASE_PATH}/edit_repository/${repositoryName}`,
                            }), fill: true, color: "primary" },
                            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryDetails.editButtonLabel", defaultMessage: "Edit" })))))) : null));
    };
    return (react_1.default.createElement(eui_1.EuiFlyout, { onClose: onClose, "data-test-subj": "srRepositoryDetailsFlyout", "aria-labelledby": "srRepositoryDetailsFlyoutTitle", size: "m", maxWidth: 400 },
        react_1.default.createElement(eui_1.EuiFlyoutHeader, null,
            react_1.default.createElement(eui_1.EuiTitle, { size: "m" },
                react_1.default.createElement("h2", { id: "srRepositoryDetailsFlyoutTitle", "data-test-subj": "srRepositoryDetailsFlyoutTitle" }, repositoryName))),
        react_1.default.createElement(eui_1.EuiFlyoutBody, { "data-test-subj": "srRepositoryDetailsContent" }, renderBody()),
        react_1.default.createElement(eui_1.EuiFlyoutFooter, null, renderFooter())));
};
exports.RepositoryDetails = react_router_dom_1.withRouter(RepositoryDetailsUi);
