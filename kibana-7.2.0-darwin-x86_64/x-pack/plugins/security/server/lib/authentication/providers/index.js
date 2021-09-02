"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
exports.BaseAuthenticationProvider = base_1.BaseAuthenticationProvider;
var basic_1 = require("./basic");
exports.BasicAuthenticationProvider = basic_1.BasicAuthenticationProvider;
exports.BasicCredentials = basic_1.BasicCredentials;
var saml_1 = require("./saml");
exports.SAMLAuthenticationProvider = saml_1.SAMLAuthenticationProvider;
var token_1 = require("./token");
exports.TokenAuthenticationProvider = token_1.TokenAuthenticationProvider;
var oidc_1 = require("./oidc");
exports.OIDCAuthenticationProvider = oidc_1.OIDCAuthenticationProvider;
