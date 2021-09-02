"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtimeContext = {
    setup: {
        core: null,
        plugins: {},
    },
    start: {
        core: null,
        plugins: {},
    },
};
/**
 * Only used by unit tests
 * @internal
 */
function __reset__() {
    runtimeContext.setup.core = null;
    runtimeContext.start.core = null;
}
exports.__reset__ = __reset__;
async function __newPlatformSetup__(core) {
    if (runtimeContext.setup.core) {
        throw new Error('New platform core api was already set up');
    }
    runtimeContext.setup.core = core;
    // Process any pending onSetup callbacks
    while (onSetupCallbacks.length) {
        const cb = onSetupCallbacks.shift();
        await cb(runtimeContext.setup);
    }
}
exports.__newPlatformSetup__ = __newPlatformSetup__;
async function __newPlatformStart__(core) {
    if (runtimeContext.start.core) {
        throw new Error('New platform core api was already started');
    }
    runtimeContext.start.core = core;
    // Process any pending onStart callbacks
    while (onStartCallbacks.length) {
        const cb = onStartCallbacks.shift();
        await cb(runtimeContext.start);
    }
}
exports.__newPlatformStart__ = __newPlatformStart__;
function getNewPlatform() {
    if (runtimeContext.setup.core === null || runtimeContext.start.core === null) {
        throw new Error('runtimeContext is not initialized yet');
    }
    return runtimeContext;
}
exports.getNewPlatform = getNewPlatform;
const onSetupCallbacks = [];
const onStartCallbacks = [];
/**
 * Register a callback to be called once the new platform is in the
 * `setup` lifecycle event. Resolves to the return value of the callback.
 */
async function onSetup(callback) {
    if (runtimeContext.setup.core !== null) {
        return callback(runtimeContext.setup);
    }
    return new Promise((resolve, reject) => {
        onSetupCallbacks.push(async (setupContext) => {
            try {
                resolve(await callback(setupContext));
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
exports.onSetup = onSetup;
/**
 * Register a callback to be called once the new platform is in the
 * `start` lifecycle event. Resolves to the return value of the callback.
 */
async function onStart(callback) {
    if (runtimeContext.start.core !== null) {
        return callback(runtimeContext.start);
    }
    return new Promise((resolve, reject) => {
        onStartCallbacks.push(async (startContext) => {
            try {
                resolve(await callback(startContext));
            }
            catch (e) {
                reject(e);
            }
        });
    });
}
exports.onStart = onStart;
