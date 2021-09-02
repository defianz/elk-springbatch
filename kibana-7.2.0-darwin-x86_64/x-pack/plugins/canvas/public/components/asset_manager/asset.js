"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const clipboard_1 = require("../clipboard");
const download_1 = require("../download");
exports.Asset = props => {
    const { asset, onCreate, onCopy, onDelete } = props;
    const createImage = (react_1.default.createElement(eui_1.EuiFlexItem, { className: "asset-create-image", grow: false },
        react_1.default.createElement(eui_1.EuiToolTip, { content: "Create image element" },
            react_1.default.createElement(eui_1.EuiButtonIcon, { iconType: "vector", "aria-label": "Create image element", onClick: () => onCreate(asset) }))));
    const downloadAsset = (react_1.default.createElement(eui_1.EuiFlexItem, { className: "asset-download", grow: false },
        react_1.default.createElement(eui_1.EuiToolTip, { content: "Download" },
            react_1.default.createElement(download_1.Download, { fileName: asset.id, content: asset.value },
                react_1.default.createElement(eui_1.EuiButtonIcon, { iconType: "sortDown", "aria-label": "Download" })))));
    const copyAsset = (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
        react_1.default.createElement(eui_1.EuiToolTip, { content: "Copy id to clipboard" },
            react_1.default.createElement(clipboard_1.Clipboard, { content: asset.id, onCopy: (result) => result && onCopy(asset) },
                react_1.default.createElement(eui_1.EuiButtonIcon, { iconType: "copyClipboard", "aria-label": "Copy id to clipboard" })))));
    const deleteAsset = (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
        react_1.default.createElement(eui_1.EuiToolTip, { content: "Delete" },
            react_1.default.createElement(eui_1.EuiButtonIcon, { color: "danger", iconType: "trash", "aria-label": "Delete", onClick: () => onDelete(asset) }))));
    const thumbnail = (react_1.default.createElement("div", { className: "canvasAsset__thumb canvasCheckered" },
        react_1.default.createElement(eui_1.EuiImage, { className: "canvasAsset__img", size: "original", url: props.asset.value, fullScreenIconColor: "dark", alt: "Asset thumbnail", style: { backgroundImage: `url(${props.asset.value})` } })));
    const assetLabel = (react_1.default.createElement(eui_1.EuiText, { size: "xs", className: "eui-textBreakAll" },
        react_1.default.createElement("p", { className: "eui-textBreakAll" },
            react_1.default.createElement("strong", null, asset.id),
            react_1.default.createElement("br", null),
            react_1.default.createElement(eui_1.EuiTextColor, { color: "subdued" },
                react_1.default.createElement("small", null,
                    "(",
                    Math.round(asset.value.length / 1024),
                    " kb)")))));
    return (react_1.default.createElement(eui_1.EuiFlexItem, { key: props.asset.id },
        react_1.default.createElement(eui_1.EuiPanel, { className: "canvasAsset", paddingSize: "s" },
            thumbnail,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            assetLabel,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "baseline", justifyContent: "center", responsive: false },
                createImage,
                downloadAsset,
                copyAsset,
                deleteAsset))));
};
