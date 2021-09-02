"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class CancellationSerivce {
    constructor() {
        this.cloneCancellationMap = new Map();
        this.updateCancellationMap = new Map();
        this.indexCancellationMap = new Map();
    }
    cancelCloneJob(repoUri) {
        const token = this.cloneCancellationMap.get(repoUri);
        if (token) {
            token.cancel();
            this.cloneCancellationMap.delete(repoUri);
        }
    }
    cancelUpdateJob(repoUri) {
        const token = this.updateCancellationMap.get(repoUri);
        if (token) {
            token.cancel();
            this.updateCancellationMap.delete(repoUri);
        }
    }
    cancelIndexJob(repoUri) {
        const token = this.indexCancellationMap.get(repoUri);
        if (token) {
            token.cancel();
            this.indexCancellationMap.delete(repoUri);
        }
    }
    registerCloneJobToken(repoUri, cancellationToken) {
        const token = this.cloneCancellationMap.get(repoUri);
        if (token) {
            token.cancel();
        }
        this.cloneCancellationMap.set(repoUri, cancellationToken);
    }
    registerUpdateJobToken(repoUri, cancellationToken) {
        const token = this.updateCancellationMap.get(repoUri);
        if (token) {
            token.cancel();
        }
        this.updateCancellationMap.set(repoUri, cancellationToken);
    }
    registerIndexJobToken(repoUri, cancellationToken) {
        const token = this.indexCancellationMap.get(repoUri);
        if (token) {
            token.cancel();
        }
        this.indexCancellationMap.set(repoUri, cancellationToken);
    }
}
exports.CancellationSerivce = CancellationSerivce;
