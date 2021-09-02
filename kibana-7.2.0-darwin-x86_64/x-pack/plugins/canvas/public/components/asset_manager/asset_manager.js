"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_1 = tslib_1.__importStar(require("react"));
const confirm_modal_1 = require("../confirm_modal");
const asset_modal_1 = require("./asset_modal");
class AssetManager extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            deleteId: null,
            isLoading: false,
            isModalVisible: false,
        };
        this.showModal = () => this.setState({ isModalVisible: true });
        this.resetDelete = () => this.setState({ deleteId: null });
        this.doDelete = () => {
            this.resetDelete();
            this.props.onAssetDelete(this.state.deleteId);
        };
        this.handleFileUpload = (files) => {
            this.setState({ isLoading: true });
            Promise.all(Array.from(files).map(file => this.props.onAssetAdd(file))).finally(() => {
                this.setState({ isLoading: false });
            });
        };
    }
    render() {
        const { isModalVisible, isLoading } = this.state;
        const { assetValues, onAssetCopy, onAddImageElement } = this.props;
        const assetModal = (react_1.default.createElement(asset_modal_1.AssetModal, { assetValues: assetValues, isLoading: isLoading, onAssetCopy: onAssetCopy, onAssetCreate: (createdAsset) => {
                onAddImageElement(createdAsset.id);
                this.setState({ isModalVisible: false });
            }, onAssetDelete: (asset) => this.setState({ deleteId: asset.id }), onClose: () => this.setState({ isModalVisible: false }), onFileUpload: this.handleFileUpload }));
        const confirmModal = (react_1.default.createElement(confirm_modal_1.ConfirmModal, { isOpen: this.state.deleteId !== null, title: "Remove Asset", message: "Are you sure you want to remove this asset?", confirmButtonText: "Remove", onConfirm: this.doDelete, onCancel: this.resetDelete }));
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiButtonEmpty, { onClick: this.showModal }, "Manage assets"),
            isModalVisible ? assetModal : null,
            confirmModal));
    }
}
AssetManager.propTypes = {
    assetValues: prop_types_1.default.array,
    onAddImageElement: prop_types_1.default.func.isRequired,
    onAssetAdd: prop_types_1.default.func.isRequired,
    onAssetCopy: prop_types_1.default.func.isRequired,
    onAssetDelete: prop_types_1.default.func.isRequired,
};
AssetManager.defaultProps = {
    assetValues: [],
};
exports.AssetManager = AssetManager;
