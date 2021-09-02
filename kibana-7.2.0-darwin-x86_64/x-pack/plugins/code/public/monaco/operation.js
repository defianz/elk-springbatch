"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OperationState;
(function (OperationState) {
    OperationState[OperationState["IDLE"] = 0] = "IDLE";
    OperationState[OperationState["DELAYED"] = 1] = "DELAYED";
    OperationState[OperationState["RUNNING"] = 2] = "RUNNING";
})(OperationState || (OperationState = {}));
class Operation {
    constructor(computer, successCallback, errorCallback, progressCallback) {
        this.computer = computer;
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
        this.progressCallback = progressCallback;
        this.task = null;
        this.state = OperationState.IDLE;
        this.delay = Operation.DEFAULT_DELAY_TIME;
    }
    setDelay(delay) {
        this.delay = delay;
    }
    start() {
        if (this.state === OperationState.IDLE) {
            this.task = this.computer.compute();
            this.triggerDelay();
        }
    }
    triggerDelay() {
        this.cancelDelay();
        this.timeout = setTimeout(this.triggerAsyncTask.bind(this), this.delay);
        this.state = OperationState.DELAYED;
    }
    cancel() {
        if (this.state === OperationState.RUNNING) {
            if (this.task) {
                this.task.cancel();
                this.task = null;
            }
        }
        else if (this.state === OperationState.DELAYED) {
            this.cancelDelay();
        }
        this.state = OperationState.IDLE;
    }
    cancelDelay() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    showLoading() {
        this.progressCallback(this.computer.loadingMessage());
    }
    triggerAsyncTask() {
        if (this.task) {
            this.state = OperationState.RUNNING;
            const loadingDelay = setTimeout(this.showLoading.bind(this), this.delay);
            const task = this.task;
            task.promise().then(result => {
                clearTimeout(loadingDelay);
                if (task === this.task) {
                    this.successCallback(result);
                }
            }, error => {
                clearTimeout(loadingDelay);
                if (task === this.task) {
                    this.errorCallback(error);
                }
            });
        }
    }
}
Operation.DEFAULT_DELAY_TIME = 300;
exports.Operation = Operation;
