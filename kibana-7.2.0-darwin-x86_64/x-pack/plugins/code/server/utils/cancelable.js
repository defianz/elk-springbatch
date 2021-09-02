"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cancelable {
    constructor(fn) {
        this.fn = fn;
        this.resolve = undefined;
        this.reject = undefined;
        this._cancel = undefined;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        fn(this.resolve, this.reject, (cancel) => {
            this._cancel = cancel;
        });
    }
    cancel(error = 'canceled') {
        if (this._cancel) {
            this._cancel(error);
        }
        else if (this.reject) {
            this.reject(error);
        }
    }
    error(error) {
        if (this.reject) {
            this.reject(error);
        }
    }
}
exports.Cancelable = Cancelable;
