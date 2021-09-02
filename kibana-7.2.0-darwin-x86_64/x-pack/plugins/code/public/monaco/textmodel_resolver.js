"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const immortal_reference_1 = require("./immortal_reference");
class TextModelResolverService {
    constructor(monaco) {
        this.monaco = monaco;
    }
    async createModelReference(resource) {
        let model = this.monaco.editor.getModel(resource);
        if (!model) {
            const result = await this.fetchText(resource);
            if (!result) {
                return new immortal_reference_1.ImmortalReference(null);
            }
            else {
                model = this.monaco.editor.createModel(result.text, result.lang, resource);
            }
        }
        return new immortal_reference_1.ImmortalReference({ textEditorModel: model });
    }
    registerTextModelContentProvider(scheme, provider) {
        return {
            dispose() {
                /* no op */
            },
        };
    }
    async fetchText(resource) {
        const repo = `${resource.authority}${resource.path}`;
        const revision = resource.query;
        const file = resource.fragment;
        const response = await fetch(chrome_1.default.addBasePath(`/api/code/repo/${repo}/blob/${revision}/${file}`));
        if (response.status === 200) {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.startsWith('text/')) {
                const lang = contentType.split(';')[0].substring('text/'.length);
                const text = await response.text();
                return { text, lang };
            }
        }
        else {
            return null;
        }
    }
}
exports.TextModelResolverService = TextModelResolverService;
