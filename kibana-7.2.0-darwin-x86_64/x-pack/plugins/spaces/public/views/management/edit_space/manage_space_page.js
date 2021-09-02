"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const react_2 = tslib_1.__importStar(require("react"));
const capabilities_1 = require("ui/capabilities");
const kfetch_1 = require("ui/kfetch");
const notify_1 = require("ui/notify");
const common_1 = require("../../../../common");
const secure_space_message_1 = require("../components/secure_space_message");
const unauthorized_prompt_1 = require("../components/unauthorized_prompt");
const lib_1 = require("../lib");
const validate_space_1 = require("../lib/validate_space");
const confirm_alter_active_space_modal_1 = require("./confirm_alter_active_space_modal");
const customize_space_1 = require("./customize_space");
const delete_spaces_button_1 = require("./delete_spaces_button");
const enabled_features_1 = require("./enabled_features");
const reserved_space_badge_1 = require("./reserved_space_badge");
class ManageSpacePageUI extends react_2.Component {
    constructor(props) {
        super(props);
        this.getLoadingIndicator = () => (react_2.default.createElement("div", null,
            react_2.default.createElement(eui_1.EuiLoadingSpinner, { size: 'xl' }),
            ' ',
            react_2.default.createElement(eui_1.EuiTitle, null,
                react_2.default.createElement("h1", null, "Loading..."))));
        this.getForm = () => {
            if (!capabilities_1.capabilities.get().spaces.manage) {
                return react_2.default.createElement(unauthorized_prompt_1.UnauthorizedPrompt, null);
            }
            const { showAlteringActiveSpaceDialog } = this.state;
            return (react_2.default.createElement(react_2.Fragment, null,
                this.getFormHeading(),
                react_2.default.createElement(eui_1.EuiSpacer, { size: 's' }),
                react_2.default.createElement(eui_1.EuiText, { size: "s" },
                    react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.manageSpacePage.manageDescription", defaultMessage: "Organize your saved objects into meaningful categories." })),
                react_2.default.createElement(eui_1.EuiSpacer, null),
                react_2.default.createElement(customize_space_1.CustomizeSpace, { space: this.state.space, onChange: this.onSpaceChange, editingExistingSpace: this.editingExistingSpace(), validator: this.validator, intl: this.props.intl }),
                react_2.default.createElement(eui_1.EuiSpacer, null),
                react_2.default.createElement(enabled_features_1.EnabledFeatures, { space: this.state.space, features: this.state.features, uiCapabilities: capabilities_1.capabilities.get(), onChange: this.onSpaceChange, intl: this.props.intl }),
                react_2.default.createElement(eui_1.EuiSpacer, null),
                this.getFormButtons(),
                showAlteringActiveSpaceDialog && (react_2.default.createElement(confirm_alter_active_space_modal_1.ConfirmAlterActiveSpaceModal, { onConfirm: () => this.performSave(true), onCancel: () => {
                        this.setState({ showAlteringActiveSpaceDialog: false });
                    } }))));
        };
        this.getFormHeading = () => (react_2.default.createElement(eui_1.EuiTitle, { size: "m" },
            react_2.default.createElement("h1", null,
                this.getTitle(),
                " ",
                react_2.default.createElement(reserved_space_badge_1.ReservedSpaceBadge, { space: this.state.space }))));
        this.getTitle = () => {
            if (this.editingExistingSpace()) {
                return `Edit space`;
            }
            return (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.spaces.management.manageSpacePage.createSpaceTitle", defaultMessage: "Create a space" }));
        };
        this.maybeGetSecureSpacesMessage = () => {
            if (this.editingExistingSpace()) {
                return react_2.default.createElement(secure_space_message_1.SecureSpaceMessage, null);
            }
            return null;
        };
        this.getFormButtons = () => {
            const createSpaceText = this.props.intl.formatMessage({
                id: 'xpack.spaces.management.manageSpacePage.createSpaceButton',
                defaultMessage: 'Create space',
            });
            const updateSpaceText = this.props.intl.formatMessage({
                id: 'xpack.spaces.management.manageSpacePage.updateSpaceButton',
                defaultMessage: 'Update space',
            });
            const cancelButtonText = this.props.intl.formatMessage({
                id: 'xpack.spaces.management.manageSpacePage.cancelSpaceButton',
                defaultMessage: 'Cancel',
            });
            const saveText = this.editingExistingSpace() ? updateSpaceText : createSpaceText;
            return (react_2.default.createElement(eui_1.EuiFlexGroup, { responsive: false },
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiButton, { fill: true, onClick: this.saveSpace, "data-test-subj": "save-space-button" }, saveText)),
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiButtonEmpty, { onClick: this.backToSpacesList, "data-test-subj": "cancel-space-button" }, cancelButtonText)),
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: true }),
                this.getActionButton()));
        };
        this.getActionButton = () => {
            if (this.state.space && this.editingExistingSpace() && !common_1.isReservedSpace(this.state.space)) {
                return (react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(delete_spaces_button_1.DeleteSpacesButton, { "data-test-subj": "delete-space-button", space: this.state.space, spacesManager: this.props.spacesManager, spacesNavState: this.props.spacesNavState, onDelete: this.backToSpacesList })));
            }
            return null;
        };
        this.onSpaceChange = (updatedSpace) => {
            this.setState({
                space: updatedSpace,
            });
        };
        this.saveSpace = () => {
            this.validator.enableValidation();
            const result = this.validator.validateForSave(this.state.space);
            if (result.isInvalid) {
                this.setState({
                    formError: result,
                });
                return;
            }
            if (this.editingExistingSpace()) {
                const { spacesNavState } = this.props;
                const originalSpace = this.state.originalSpace;
                const space = this.state.space;
                const editingActiveSpace = spacesNavState.getActiveSpace().id === originalSpace.id;
                const haveDisabledFeaturesChanged = space.disabledFeatures.length !== originalSpace.disabledFeatures.length ||
                    lodash_1.default.difference(space.disabledFeatures, originalSpace.disabledFeatures).length > 0;
                if (editingActiveSpace && haveDisabledFeaturesChanged) {
                    this.setState({
                        showAlteringActiveSpaceDialog: true,
                    });
                    return;
                }
            }
            this.performSave();
        };
        this.performSave = (requireRefresh = false) => {
            const { intl } = this.props;
            if (!this.state.space) {
                return;
            }
            const name = this.state.space.name || '';
            const { id = lib_1.toSpaceIdentifier(name), description, initials, color, disabledFeatures = [], } = this.state.space;
            const params = {
                name,
                id,
                description,
                initials,
                color,
                disabledFeatures,
            };
            let action;
            if (this.editingExistingSpace()) {
                action = this.props.spacesManager.updateSpace(params);
            }
            else {
                action = this.props.spacesManager.createSpace(params);
            }
            action
                .then(() => {
                this.props.spacesNavState.refreshSpacesList();
                notify_1.toastNotifications.addSuccess(intl.formatMessage({
                    id: 'xpack.spaces.management.manageSpacePage.spaceSuccessfullySavedNotificationMessage',
                    defaultMessage: `Space {name} was saved.`,
                }, {
                    name: `'${name}'`,
                }));
                window.location.hash = `#/management/spaces/list`;
                if (requireRefresh) {
                    setTimeout(() => {
                        window.location.reload();
                    });
                }
            })
                .catch(error => {
                const { message = '' } = error.data || {};
                notify_1.toastNotifications.addDanger(intl.formatMessage({
                    id: 'xpack.spaces.management.manageSpacePage.errorSavingSpaceTitle',
                    defaultMessage: 'Error saving space: {message}',
                }, {
                    message,
                }));
            });
        };
        this.backToSpacesList = () => {
            window.location.hash = `#/management/spaces/list`;
        };
        this.editingExistingSpace = () => !!this.props.spaceId;
        this.validator = new validate_space_1.SpaceValidator({ shouldValidate: false });
        this.state = {
            isLoading: true,
            showAlteringActiveSpaceDialog: false,
            space: {},
            features: [],
        };
    }
    async componentDidMount() {
        if (!capabilities_1.capabilities.get().spaces.manage) {
            return;
        }
        const { spaceId, spacesManager, intl, setBreadcrumbs } = this.props;
        const getFeatures = kfetch_1.kfetch({ method: 'get', pathname: '/api/features/v1' });
        if (spaceId) {
            try {
                const [space, features] = await Promise.all([spacesManager.getSpace(spaceId), getFeatures]);
                if (space) {
                    if (setBreadcrumbs) {
                        setBreadcrumbs(lib_1.getEditBreadcrumbs(space));
                    }
                    this.setState({
                        space,
                        features: await features,
                        originalSpace: space,
                        isLoading: false,
                    });
                }
            }
            catch (error) {
                const { message = '' } = error.data || {};
                notify_1.toastNotifications.addDanger(intl.formatMessage({
                    id: 'xpack.spaces.management.manageSpacePage.errorLoadingSpaceTitle',
                    defaultMessage: 'Error loading space: {message}',
                }, {
                    message,
                }));
                this.backToSpacesList();
            }
        }
        else {
            const features = await getFeatures;
            this.setState({ isLoading: false, features });
        }
    }
    render() {
        const content = this.state.isLoading ? this.getLoadingIndicator() : this.getForm();
        return (react_2.default.createElement(react_2.Fragment, null,
            react_2.default.createElement(eui_1.EuiPageContentBody, null, content),
            this.maybeGetSecureSpacesMessage()));
    }
}
exports.ManageSpacePage = react_1.injectI18n(ManageSpacePageUI);
