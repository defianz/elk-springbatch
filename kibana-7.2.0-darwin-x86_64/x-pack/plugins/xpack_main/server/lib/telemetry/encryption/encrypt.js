"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const request_crypto_1 = require("@elastic/request-crypto");
const telemetry_jwks_1 = require("./telemetry_jwks");
function getKID(isProd = false) {
    return isProd ? 'kibana' : 'kibana_dev';
}
exports.getKID = getKID;
async function encryptTelemetry(payload, isProd = false) {
    const kid = getKID(isProd);
    const encryptor = await request_crypto_1.createRequestEncryptor(telemetry_jwks_1.telemetryJWKS);
    const clusters = [].concat(payload);
    return Promise.all(clusters.map((cluster) => encryptor.encrypt(kid, cluster)));
}
exports.encryptTelemetry = encryptTelemetry;
