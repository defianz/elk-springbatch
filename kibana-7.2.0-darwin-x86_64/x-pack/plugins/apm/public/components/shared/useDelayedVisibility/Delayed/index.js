"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Delayed {
    constructor({ minimumVisibleDuration = 1000, showDelayMs = 50, hideDelayMs = 50 } = {}) {
        this.displayedAt = 0;
        this.isVisible = false;
        this.onChangeCallback = () => null;
        this.minimumVisibleDuration = minimumVisibleDuration;
        this.hideDelayMs = hideDelayMs;
        this.showDelayMs = showDelayMs;
    }
    updateState(isVisible) {
        window.clearTimeout(this.timeoutId);
        const ms = !isVisible
            ? Math.max(this.displayedAt + this.minimumVisibleDuration - Date.now(), this.hideDelayMs)
            : this.showDelayMs;
        this.timeoutId = window.setTimeout(() => {
            if (this.isVisible !== isVisible) {
                this.isVisible = isVisible;
                this.onChangeCallback(isVisible);
                if (isVisible) {
                    this.displayedAt = Date.now();
                }
            }
        }, ms);
    }
    show() {
        this.updateState(true);
    }
    hide() {
        this.updateState(false);
    }
    onChange(onChangeCallback) {
        this.onChangeCallback = onChangeCallback;
    }
}
exports.Delayed = Delayed;
