"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const unhandledRowRenderer = () => {
    throw new Error('Unhandled Row Renderer');
};
exports.getRowRenderer = (ecs, rowRenderers) => {
    const renderer = rowRenderers.find(rowRenderer => rowRenderer.isInstance(ecs));
    if (renderer == null) {
        return unhandledRowRenderer();
    }
    else {
        return renderer;
    }
};
