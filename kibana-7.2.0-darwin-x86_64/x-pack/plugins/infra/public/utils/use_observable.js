"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useObservable(observable$, initialValue) {
    const [value, update] = react_1.useState(initialValue);
    react_1.useEffect(() => {
        const s = observable$.subscribe(update);
        return () => s.unsubscribe();
    }, [observable$]);
    return value;
}
exports.useObservable = useObservable;
