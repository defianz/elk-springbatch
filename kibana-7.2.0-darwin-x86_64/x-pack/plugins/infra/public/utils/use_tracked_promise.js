"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-classes-per-file */
const react_1 = require("react");
/**
 * This hook manages a Promise factory and can create new Promises from it. The
 * state of these Promises is tracked and they can be canceled when superseded
 * to avoid race conditions.
 *
 * ```
 * const [requestState, performRequest] = useTrackedPromise(
 *   {
 *     cancelPreviousOn: 'resolution',
 *     createPromise: async (url: string) => {
 *       return await fetchSomething(url)
 *     },
 *     onResolve: response => {
 *       setSomeState(response.data);
 *     },
 *     onReject: response => {
 *       setSomeError(response);
 *     },
 *   },
 *   [fetchSomething]
 * );
 * ```
 *
 * The `onResolve` and `onReject` handlers are registered separately, because
 * the hook will inject a rejection when in case of a canellation. The
 * `cancelPreviousOn` attribute can be used to indicate when the preceding
 * pending promises should be canceled:
 *
 * 'never': No preceding promises will be canceled.
 *
 * 'creation': Any preceding promises will be canceled as soon as a new one is
 * created.
 *
 * 'settlement': Any preceding promise will be canceled when a newer promise is
 * resolved or rejected.
 *
 * 'resolution': Any preceding promise will be canceled when a newer promise is
 * resolved.
 *
 * 'rejection': Any preceding promise will be canceled when a newer promise is
 * rejected.
 *
 * Any pending promises will be canceled when the component using the hook is
 * unmounted, but their status will not be tracked to avoid React warnings
 * about memory leaks.
 *
 * The last argument is a normal React hook dependency list that indicates
 * under which conditions a new reference to the configuration object should be
 * used.
 */
exports.useTrackedPromise = ({ createPromise, onResolve = noOp, onReject = noOp, cancelPreviousOn = 'never', }, dependencies) => {
    /**
     * If a promise is currently pending, this holds a reference to it and its
     * cancellation function.
     */
    const pendingPromises = react_1.useRef([]);
    /**
     * The state of the promise most recently created by the `createPromise`
     * factory. It could be uninitialized, pending, resolved or rejected.
     */
    const [promiseState, setPromiseState] = react_1.useState({
        state: 'uninitialized',
    });
    const execute = react_1.useMemo(() => (...args) => {
        let rejectCancellationPromise;
        const cancellationPromise = new Promise((_, reject) => {
            rejectCancellationPromise = reject;
        });
        // remember the list of prior pending promises for cancellation
        const previousPendingPromises = pendingPromises.current;
        const cancelPreviousPendingPromises = () => {
            previousPendingPromises.forEach(promise => promise.cancel());
        };
        const newPromise = createPromise(...args);
        const newCancelablePromise = Promise.race([newPromise, cancellationPromise]);
        // track this new state
        setPromiseState({
            state: 'pending',
            promise: newCancelablePromise,
        });
        if (cancelPreviousOn === 'creation') {
            cancelPreviousPendingPromises();
        }
        const newPendingPromise = {
            cancel: () => {
                rejectCancellationPromise(new CanceledPromiseError());
            },
            cancelSilently: () => {
                rejectCancellationPromise(new SilentCanceledPromiseError());
            },
            promise: newCancelablePromise.then(value => {
                setPromiseState(previousPromiseState => previousPromiseState.state === 'pending' &&
                    previousPromiseState.promise === newCancelablePromise
                    ? {
                        state: 'resolved',
                        promise: newPendingPromise.promise,
                        value,
                    }
                    : previousPromiseState);
                if (['settlement', 'resolution'].includes(cancelPreviousOn)) {
                    cancelPreviousPendingPromises();
                }
                // remove itself from the list of pending promises
                pendingPromises.current = pendingPromises.current.filter(pendingPromise => pendingPromise.promise !== newPendingPromise.promise);
                if (onResolve) {
                    onResolve(value);
                }
                return value;
            }, value => {
                if (!(value instanceof SilentCanceledPromiseError)) {
                    setPromiseState(previousPromiseState => previousPromiseState.state === 'pending' &&
                        previousPromiseState.promise === newCancelablePromise
                        ? {
                            state: 'rejected',
                            promise: newCancelablePromise,
                            value,
                        }
                        : previousPromiseState);
                }
                if (['settlement', 'rejection'].includes(cancelPreviousOn)) {
                    cancelPreviousPendingPromises();
                }
                // remove itself from the list of pending promises
                pendingPromises.current = pendingPromises.current.filter(pendingPromise => pendingPromise.promise !== newPendingPromise.promise);
                if (onReject) {
                    onReject(value);
                }
                throw value;
            }),
        };
        // add the new promise to the list of pending promises
        pendingPromises.current = [...pendingPromises.current, newPendingPromise];
        // silence "unhandled rejection" warnings
        newPendingPromise.promise.catch(noOp);
        return newPendingPromise.promise;
    }, dependencies);
    /**
     * Cancel any pending promises silently to avoid memory leaks and race
     * conditions.
     */
    react_1.useEffect(() => () => {
        pendingPromises.current.forEach(promise => promise.cancelSilently());
    }, []);
    return [promiseState, execute];
};
class CanceledPromiseError extends Error {
    constructor(message) {
        super(message);
        this.isCanceled = true;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
class SilentCanceledPromiseError extends CanceledPromiseError {
}
const noOp = () => undefined;
