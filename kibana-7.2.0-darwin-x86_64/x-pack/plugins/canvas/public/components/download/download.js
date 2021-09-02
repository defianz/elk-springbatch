"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base64_js_1 = require("base64-js");
const file_saver_1 = tslib_1.__importDefault(require("file-saver"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const react_1 = tslib_1.__importDefault(require("react"));
const dataurl_1 = require("../../../common/lib/dataurl");
class Download extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            const { fileName, content } = this.props;
            const asset = dataurl_1.parseDataUrl(content, true);
            if (asset && asset.data) {
                const assetBlob = new Blob([base64_js_1.toByteArray(asset.data)], { type: asset.mimetype });
                const ext = asset.extension ? `.${asset.extension}` : '';
                file_saver_1.default.saveAs(assetBlob, `canvas-${fileName}${ext}`);
            }
        };
    }
    render() {
        return (react_1.default.createElement("div", { className: "canvasDownload", onClick: this.onClick, onKeyPress: this.onClick, tabIndex: 0, role: "button" }, this.props.children));
    }
}
Download.propTypes = {
    children: prop_types_1.default.element.isRequired,
    fileName: prop_types_1.default.string.isRequired,
    content: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.number]).isRequired,
};
exports.Download = Download;
