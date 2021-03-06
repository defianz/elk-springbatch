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
const capabilities_1 = require("ui/capabilities");
const kfetch_1 = require("ui/kfetch");
// @ts-ignore
const notify_1 = require("ui/notify");
const common_1 = require("../../../../common");
const constants_1 = require("../../../../common/constants");
const components_1 = require("../../../components");
const constants_2 = require("../../../lib/constants");
const confirm_delete_modal_1 = require("../components/confirm_delete_modal");
const secure_space_message_1 = require("../components/secure_space_message");
const unauthorized_prompt_1 = require("../components/unauthorized_prompt");
const feature_utils_1 = require("../lib/feature_utils");
class SpacesGridPageUI extends react_1.Component {
    constructor(props) {
        super(props);
        this.getConfirmDeleteModal = () => {
            if (!this.state.showConfirmDeleteModal || !this.state.selectedSpace) {
                return null;
            }
            const { spacesNavState, spacesManager } = this.props;
            return (react_1.default.createElement(confirm_delete_modal_1.ConfirmDeleteModal, { space: this.state.selectedSpace, spacesNavState: spacesNavState, spacesManager: spacesManager, onCancel: () => {
                    this.setState({
                        showConfirmDeleteModal: false,
                    });
                }, onConfirm: this.deleteSpace }));
        };
        this.deleteSpace = async () => {
            const { intl } = this.props;
            const { spacesManager, spacesNavState } = this.props;
            const space = this.state.selectedSpace;
            if (!space) {
                return;
            }
            try {
                await spacesManager.deleteSpace(space);
            }
            catch (error) {
                const { message: errorMessage = '' } = error.data || {};
                notify_1.toastNotifications.addDanger(intl.formatMessage({
                    id: 'xpack.spaces.management.spacesGridPage.errorDeletingSpaceErrorMessage',
                    defaultMessage: 'Error deleting space: {errorMessage}',
                }, {
                    errorMessage,
                }));
            }
            this.setState({
                showConfirmDeleteModal: false,
            });
            this.loadGrid();
            const message = intl.formatMessage({
                id: 'xpack.spaces.management.spacesGridPage.spaceSuccessfullyDeletedNotificationMessage',
                defaultMessage: 'Deleted "{spaceName}" space.',
            }, {
                spaceName: space.name,
            });
            notify_1.toastNotifications.addSuccess(message);
            spacesNavState.refreshSpacesList();
        };
        this.loadGrid = async () => {
            const { spacesManager } = this.props;
            this.setState({
                loading: true,
                spaces: [],
                features: [],
            });
            const getSpaces = spacesManager.getSpaces();
            const getFeatures = kfetch_1.kfetch({ method: 'get', pathname: '/api/features/v1' });
            try {
                const [spaces, features] = await Promise.all([getSpaces, getFeatures]);
                this.setState({
                    loading: false,
                    spaces,
                    features,
                });
            }
            catch (error) {
                this.setState({
                    loading: false,
                    error,
                });
            }
        };
        this.onEditSpaceClick = (space) => {
            window.location.hash = `#/management/spaces/edit/${encodeURIComponent(space.id)}`;
        };
        this.onDeleteSpaceClick = (space) => {
            this.setState({
                selectedSpace: space,
                showConfirmDeleteModal: true,
            });
        };
        this.state = {
            spaces: [],
            features: [],
            loading: true,
            showConfirmDeleteModal: false,
            selectedSpace: null,
            error: null,
        };
    }
    componentDidMount() {
        if (capabilities_1.capabilities.get().spaces.manage) {
            this.loadGrid();
        }
    }
    render() {
        return (react_1.default.createElement("div", { className: "spcGridPage" },
            react_1.default.createElement(eui_1.EuiPageContent, { horizontalPosition: "center" }, this.getPageContent()),
            react_1.default.createElement(secure_space_message_1.SecureSpaceMessage, null),
            this.getConfirmDeleteModal()));
    }
    getPageContent() {
        const { intl } = this.props;
        if (!capabilities_1.capabilities.get().spaces.manage) {
            return react_1.default.createElement(unauthorized_prompt_1.UnauthorizedPrompt, null);
        }
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: 'spaceBetween' },
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiTitle, { size: "m" },
                        react_1.default.createElement("h1", null,
                            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.spaces.management.spacesGridPage.spacesTitle", defaultMessage: "Spaces" }))),
                    react_1.default.createElement(eui_1.EuiText, { color: "subdued", size: "s" },
                        react_1.default.createElement("p", null, constants_2.getSpacesFeatureDescription()))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false }, this.getPrimaryActionButton())),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }),
            react_1.default.createElement(eui_1.EuiInMemoryTable, { itemId: 'id', items: this.state.spaces, columns: this.getColumnConfig(), hasActions: true, pagination: true, search: {
                    box: {
                        placeholder: intl.formatMessage({
                            id: 'xpack.spaces.management.spacesGridPage.searchPlaceholder',
                            defaultMessage: 'Search',
                        }),
                    },
                }, loading: this.state.loading, message: this.state.loading ? (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.spaces.management.spacesGridPage.loadingTitle", defaultMessage: "loading\u2026" })) : (undefined) })));
    }
    getPrimaryActionButton() {
        return (react_1.default.createElement(eui_1.EuiButton, { fill: true, onClick: () => {
                window.location.hash = `#/management/spaces/create`;
            } },
            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.spaces.management.spacesGridPage.createSpaceButtonLabel", defaultMessage: "Create a space" })));
    }
    getColumnConfig() {
        const { intl } = this.props;
        return [
            {
                field: 'name',
                name: '',
                width: '50px',
                sortable: true,
                render: (value, record) => (react_1.default.createElement(eui_1.EuiLink, { onClick: () => {
                        this.onEditSpaceClick(record);
                    } },
                    react_1.default.createElement(components_1.SpaceAvatar, { space: record, size: "s" }))),
            },
            {
                field: 'name',
                name: intl.formatMessage({
                    id: 'xpack.spaces.management.spacesGridPage.spaceColumnName',
                    defaultMessage: 'Space',
                }),
                sortable: true,
                render: (value, record) => (react_1.default.createElement(eui_1.EuiLink, { onClick: () => {
                        this.onEditSpaceClick(record);
                    } }, value)),
            },
            {
                field: 'description',
                name: intl.formatMessage({
                    id: 'xpack.spaces.management.spacesGridPage.descriptionColumnName',
                    defaultMessage: 'Description',
                }),
                sortable: true,
            },
            {
                field: 'disabledFeatures',
                name: intl.formatMessage({
                    id: 'xpack.spaces.management.spacesGridPage.featuresColumnName',
                    defaultMessage: 'Features',
                }),
                sortable: true,
                render: (disabledFeatures, record) => {
                    const enabledFeatureCount = feature_utils_1.getEnabledFeatures(this.state.features, record).length;
                    if (enabledFeatureCount === this.state.features.length) {
                        return (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.spaces.management.spacesGridPage.allFeaturesEnabled", defaultMessage: "All features visible" }));
                    }
                    if (enabledFeatureCount === 0) {
                        return (react_1.default.createElement(eui_1.EuiText, { color: 'danger' },
                            react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.spaces.management.spacesGridPage.noFeaturesEnabled", defaultMessage: "No features visible" })));
                    }
                    return (react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.spaces.management.spacesGridPage.someFeaturesEnabled", defaultMessage: "{enabledFeatureCount} / {totalFeatureCount} features visible", values: {
                            enabledFeatureCount,
                            totalFeatureCount: this.state.features.length,
                        } }));
                },
            },
            {
                field: 'id',
                name: intl.formatMessage({
                    id: 'xpack.spaces.management.spacesGridPage.identifierColumnName',
                    defaultMessage: 'Identifier',
                }),
                sortable: true,
                render(id) {
                    if (id === constants_1.DEFAULT_SPACE_ID) {
                        return '';
                    }
                    return id;
                },
            },
            {
                name: intl.formatMessage({
                    id: 'xpack.spaces.management.spacesGridPage.actionsColumnName',
                    defaultMessage: 'Actions',
                }),
                actions: [
                    {
                        render: (record) => (react_1.default.createElement(eui_1.EuiButtonIcon, { "aria-label": intl.formatMessage({
                                id: 'xpack.spaces.management.spacesGridPage.editSpaceActionName',
                                defaultMessage: `Edit {spaceName}.`,
                            }, {
                                spaceName: record.name,
                            }), color: 'primary', iconType: 'pencil', onClick: () => this.onEditSpaceClick(record) })),
                    },
                    {
                        available: (record) => !common_1.isReservedSpace(record),
                        render: (record) => (react_1.default.createElement(eui_1.EuiButtonIcon, { "aria-label": intl.formatMessage({
                                id: 'xpack.spaces.management.spacesGridPage.deleteActionName',
                                defaultMessage: `Delete {spaceName}.`,
                            }, {
                                spaceName: record.name,
                            }), color: 'danger', iconType: 'trash', onClick: () => this.onDeleteSpaceClick(record) })),
                    },
                ],
            },
        ];
    }
}
exports.SpacesGridPage = react_2.injectI18n(SpacesGridPageUI);
