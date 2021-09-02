"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * This QueryBar component is forked from the QueryBar implemented in kibana/ui/public/query_bar
 * with simplifications to fulfill Code's feature request.
 *
 * The styles has been migrated to styled-components instead of css for any new components brought
 * by Code. For shared components/styles, you can find the classes in the scss files in
 * kibana/ui/public/query_bar
 */
tslib_1.__exportStar(require("./components"), exports);
tslib_1.__exportStar(require("./suggestions"), exports);
