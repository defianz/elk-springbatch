"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = require("react");
const use_kibana_ui_setting_1 = require("../utils/use_kibana_ui_setting");
const getFormattedTime = (time, userFormat, fallbackFormat = 'Y-MM-DD HH:mm:ss.SSS') => {
    return userFormat ? moment_1.default(time).format(userFormat) : moment_1.default(time).format(fallbackFormat);
};
exports.useFormattedTime = (time, fallbackFormat) => {
    const [dateFormat] = use_kibana_ui_setting_1.useKibanaUiSetting('dateFormat');
    const formattedTime = react_1.useMemo(() => getFormattedTime(time, dateFormat, fallbackFormat), [
        getFormattedTime,
        time,
        dateFormat,
        fallbackFormat,
    ]);
    return formattedTime;
};
