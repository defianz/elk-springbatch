"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
// @ts-ignore: Local Untyped
const ui_metric_1 = require("../../../lib/ui_metric");
// @ts-ignore: Local Untyped
const workpad_1 = require("../../../state/selectors/workpad");
// @ts-ignore: Local Untyped
const resolved_args_1 = require("../../../state/selectors/resolved_args");
const WorkpadLoadedMetric = 'workpad-loaded';
exports.WorkpadLoadedMetric = WorkpadLoadedMetric;
const WorkpadLoadedWithErrorsMetric = 'workpad-loaded-with-errors';
exports.WorkpadLoadedWithErrorsMetric = WorkpadLoadedWithErrorsMetric;
const mapStateToProps = (state) => ({
    telemetryElementCounts: workpad_1.getElementCounts(state),
    telemetryResolvedArgs: resolved_args_1.getArgs(state),
});
function areAllElementsInResolvedArgs(workpad, resolvedArgs) {
    const resolvedArgsElements = Object.keys(resolvedArgs);
    const workpadElements = workpad.pages.reduce((reduction, page) => {
        return [...reduction, ...page.elements.map(element => element.id)];
    }, []);
    return workpadElements.every(element => resolvedArgsElements.includes(element));
}
exports.withUnconnectedElementsLoadedTelemetry = function (Component, trackMetric = ui_metric_1.trackCanvasUiMetric) {
    return function ElementsLoadedTelemetry(props) {
        const { telemetryElementCounts, workpad, telemetryResolvedArgs, ...other } = props;
        const [currentWorkpadId, setWorkpadId] = react_1.useState(undefined);
        const [hasReported, setHasReported] = react_1.useState(false);
        react_1.useEffect(() => {
            const resolvedArgsAreForWorkpad = areAllElementsInResolvedArgs(workpad, telemetryResolvedArgs);
            if (workpad.id !== currentWorkpadId) {
                setWorkpadId(workpad.id);
                const workpadElementCount = workpad.pages.reduce((reduction, page) => reduction + page.elements.length, 0);
                if (workpadElementCount === 0 ||
                    (resolvedArgsAreForWorkpad && telemetryElementCounts.pending === 0)) {
                    setHasReported(true);
                }
                else {
                    setHasReported(false);
                }
            }
            else if (!hasReported &&
                telemetryElementCounts.pending === 0 &&
                resolvedArgsAreForWorkpad) {
                if (telemetryElementCounts.error > 0) {
                    trackMetric([WorkpadLoadedMetric, WorkpadLoadedWithErrorsMetric]);
                }
                else {
                    trackMetric(WorkpadLoadedMetric);
                }
                setHasReported(true);
            }
        });
        return react_1.default.createElement(Component, Object.assign({}, other, { workpad: workpad }));
    };
};
exports.withElementsLoadedTelemetry = (Component) => {
    const telemetry = exports.withUnconnectedElementsLoadedTelemetry(Component);
    return react_redux_1.connect(mapStateToProps)(telemetry);
};
