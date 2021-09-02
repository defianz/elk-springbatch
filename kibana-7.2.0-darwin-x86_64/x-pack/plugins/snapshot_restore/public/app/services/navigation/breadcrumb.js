"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const text_1 = require("../text");
class BreadcrumbService {
    constructor() {
        this.breadcrumbs = {
            management: {},
            home: {},
            repositoryAdd: {},
            repositoryEdit: {},
        };
    }
    init(chrome, managementBreadcrumb) {
        this.chrome = chrome;
        this.breadcrumbs.management = managementBreadcrumb;
        this.breadcrumbs.home = {
            text: text_1.textService.breadcrumbs.home,
            href: `#${constants_1.BASE_PATH}`,
        };
        this.breadcrumbs.repositoryAdd = {
            text: text_1.textService.breadcrumbs.repositoryAdd,
            href: `#${constants_1.BASE_PATH}/add_repository`,
        };
        this.breadcrumbs.repositoryEdit = {
            text: text_1.textService.breadcrumbs.repositoryEdit,
        };
    }
    setBreadcrumbs(type) {
        if (!this.breadcrumbs[type]) {
            return;
        }
        if (type === 'home') {
            this.chrome.breadcrumbs.set([this.breadcrumbs.management, this.breadcrumbs.home]);
        }
        else {
            this.chrome.breadcrumbs.set([
                this.breadcrumbs.management,
                this.breadcrumbs.home,
                this.breadcrumbs[type],
            ]);
        }
    }
}
exports.breadcrumbService = new BreadcrumbService();
