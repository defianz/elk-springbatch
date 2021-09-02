"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Delayed_1 = require("./Delayed");
function useDelayedVisibility(visible, hideDelayMs, showDelayMs, minimumVisibleDuration) {
    const [isVisible, setIsVisible] = react_1.useState(false);
    const delayedRef = react_1.useRef(null);
    react_1.useEffect(() => {
        const delayed = new Delayed_1.Delayed({
            hideDelayMs,
            showDelayMs,
            minimumVisibleDuration
        });
        delayed.onChange(visibility => {
            setIsVisible(visibility);
        });
        delayedRef.current = delayed;
    }, [hideDelayMs, showDelayMs, minimumVisibleDuration]);
    react_1.useEffect(() => {
        if (!delayedRef.current) {
            return;
        }
        if (visible) {
            delayedRef.current.show();
        }
        else {
            delayedRef.current.hide();
        }
    }, [visible]);
    return isVisible;
}
exports.useDelayedVisibility = useDelayedVisibility;
