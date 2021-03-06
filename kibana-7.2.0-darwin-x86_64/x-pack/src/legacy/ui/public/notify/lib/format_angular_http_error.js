"use strict";
/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
function isAngularHttpError(error) {
    return (error &&
        typeof error.status === 'number' &&
        typeof error.statusText === 'string' &&
        error.data &&
        typeof error.data.message === 'string');
}
exports.isAngularHttpError = isAngularHttpError;
function formatAngularHttpError(error) {
    // is an Angular $http "error object"
    if (error.status === -1) {
        // status = -1 indicates that the request was failed to reach the server
        return i18n_1.i18n.translate('common.ui.notify.fatalError.unavailableServerErrorMessage', {
            defaultMessage: 'An HTTP request has failed to connect. ' +
                'Please check if the Kibana server is running and that your browser has a working connection, ' +
                'or contact your system administrator.',
        });
    }
    return i18n_1.i18n.translate('common.ui.notify.fatalError.errorStatusMessage', {
        defaultMessage: 'Error {errStatus} {errStatusText}: {errMessage}',
        values: {
            errStatus: error.status,
            errStatusText: error.statusText,
            errMessage: error.data.message,
        },
    });
}
exports.formatAngularHttpError = formatAngularHttpError;
