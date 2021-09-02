"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const empty_value_1 = require("../../../empty_value");
const i18n = tslib_1.__importStar(require("./translations"));
const helpers_1 = require("../../../tables/helpers");
exports.getUsersColumns = (flowTarget, tableId) => [
    {
        field: 'node.user.name',
        name: i18n.USER_NAME,
        truncateText: false,
        hideForMobile: false,
        sortable: true,
        render: userName => helpers_1.getRowItemDraggable({
            rowItem: userName,
            attrName: 'user.name',
            idPrefix: `${tableId}-table-${flowTarget}-user`,
        }),
    },
    {
        field: 'node.user.id',
        name: i18n.USER_ID,
        truncateText: false,
        hideForMobile: false,
        sortable: false,
        render: userIds => helpers_1.getRowItemDraggables({
            rowItems: userIds,
            attrName: 'user.id',
            idPrefix: `${tableId}-table-${flowTarget}`,
        }),
    },
    {
        field: 'node.user.groupName',
        name: i18n.GROUP_NAME,
        truncateText: false,
        hideForMobile: false,
        sortable: false,
        render: groupNames => helpers_1.getRowItemDraggables({
            rowItems: groupNames,
            attrName: 'user.group.name',
            idPrefix: `${tableId}-table-${flowTarget}`,
        }),
    },
    {
        field: 'node.user.groupId',
        name: i18n.GROUP_ID,
        truncateText: false,
        hideForMobile: false,
        sortable: false,
        render: groupId => helpers_1.getRowItemDraggables({
            rowItems: groupId,
            attrName: 'user.group.id',
            idPrefix: `${tableId}-table-${flowTarget}`,
        }),
    },
    {
        field: 'node.user.count',
        name: i18n.DOCUMENT_COUNT,
        truncateText: false,
        hideForMobile: false,
        sortable: true,
        render: docCount => empty_value_1.defaultToEmptyTag(docCount),
    },
];
