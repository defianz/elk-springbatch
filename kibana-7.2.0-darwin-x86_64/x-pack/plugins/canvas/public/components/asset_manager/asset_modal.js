"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_1 = tslib_1.__importDefault(require("react"));
// @ts-ignore
const constants_1 = require("../../../common/lib/constants");
const loading_1 = require("../loading");
const asset_1 = require("./asset");
exports.AssetModal = props => {
    const { assetValues, isLoading, onAssetCopy, onAssetCreate, onAssetDelete, onClose, onFileUpload, } = props;
    const assetsTotal = Math.round(assetValues.reduce((total, { value }) => total + value.length, 0) / 1024);
    const percentageUsed = Math.round((assetsTotal / constants_1.ASSET_MAX_SIZE) * 100);
    const emptyAssets = (react_1.default.createElement(eui_1.EuiPanel, { className: "canvasAssetManager__emptyPanel" },
        react_1.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "importAction", title: react_1.default.createElement("h2", null, "Import your assets to get started"), titleSize: "xs" })));
    return (react_1.default.createElement(eui_1.EuiOverlayMask, null,
        react_1.default.createElement(eui_1.EuiModal, { onClose: onClose, className: "canvasAssetManager canvasModal--fixedSize", maxWidth: "1000px" },
            react_1.default.createElement(eui_1.EuiModalHeader, { className: "canvasAssetManager__modalHeader" },
                react_1.default.createElement(eui_1.EuiModalHeaderTitle, { className: "canvasAssetManager__modalHeaderTitle" }, "Manage workpad assets"),
                react_1.default.createElement(eui_1.EuiFlexGroup, { className: "canvasAssetManager__fileUploadWrapper" },
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false }, isLoading ? (react_1.default.createElement(loading_1.Loading, { animated: true, text: "Uploading images" })) : (react_1.default.createElement(eui_1.EuiFilePicker, { initialPromptText: "Select or drag and drop images", compressed: true, multiple: true, onChange: onFileUpload, accept: "image/*" }))))),
            react_1.default.createElement(eui_1.EuiModalBody, null,
                react_1.default.createElement(eui_1.EuiText, { size: "s", color: "subdued" },
                    react_1.default.createElement("p", null, "Below are the image assets in this workpad. Any assets that are currently in use cannot be determined at this time. To reclaim space, delete assets.")),
                react_1.default.createElement(eui_1.EuiSpacer, null),
                assetValues.length ? (react_1.default.createElement(eui_1.EuiFlexGrid, { columns: 4 }, assetValues.map(asset => (react_1.default.createElement(asset_1.Asset, { asset: asset, key: asset.id, onCopy: onAssetCopy, onCreate: onAssetCreate, onDelete: onAssetDelete }))))) : (emptyAssets)),
            react_1.default.createElement(eui_1.EuiModalFooter, { className: "canvasAssetManager__modalFooter" },
                react_1.default.createElement(eui_1.EuiFlexGroup, { className: "canvasAssetManager__meterWrapper", responsive: false },
                    react_1.default.createElement(eui_1.EuiFlexItem, null,
                        react_1.default.createElement(eui_1.EuiProgress, { value: assetsTotal, max: constants_1.ASSET_MAX_SIZE, color: percentageUsed < 90 ? 'secondary' : 'danger', size: "s", "aria-labelledby": "CanvasAssetManagerLabel" })),
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, className: "eui-textNoWrap" },
                        react_1.default.createElement(eui_1.EuiText, { id: "CanvasAssetManagerLabel" },
                            percentageUsed,
                            "% space used"))),
                react_1.default.createElement(eui_1.EuiButton, { size: "s", onClick: onClose }, "Close")))));
};
exports.AssetModal.propTypes = {
    assetValues: prop_types_1.default.array,
    isLoading: prop_types_1.default.bool,
    onClose: prop_types_1.default.func.isRequired,
    onFileUpload: prop_types_1.default.func.isRequired,
    onAssetCopy: prop_types_1.default.func.isRequired,
    onAssetCreate: prop_types_1.default.func.isRequired,
    onAssetDelete: prop_types_1.default.func.isRequired,
};
