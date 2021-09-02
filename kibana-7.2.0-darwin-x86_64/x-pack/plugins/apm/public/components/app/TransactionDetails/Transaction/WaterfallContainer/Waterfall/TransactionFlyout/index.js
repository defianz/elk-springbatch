"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importDefault(require("react"));
const TransactionActionMenu_1 = require("../../../../../../shared/TransactionActionMenu/TransactionActionMenu");
const StickyTransactionProperties_1 = require("../../../StickyTransactionProperties");
const FlyoutTopLevelProperties_1 = require("../FlyoutTopLevelProperties");
const ResponsiveFlyout_1 = require("../ResponsiveFlyout");
const TransactionMetadata_1 = require("../../../../../../shared/MetadataTable/TransactionMetadata");
const DroppedSpansWarning_1 = require("./DroppedSpansWarning");
function TransactionPropertiesTable({ transaction }) {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
            react_1.default.createElement("h4", null, "Metadata")),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(TransactionMetadata_1.TransactionMetadata, { transaction: transaction })));
}
function TransactionFlyout({ transaction: transactionDoc, onClose, errorCount, traceRootDuration }) {
    if (!transactionDoc) {
        return null;
    }
    return (react_1.default.createElement(eui_1.EuiPortal, null,
        react_1.default.createElement(ResponsiveFlyout_1.ResponsiveFlyout, { onClose: onClose, ownFocus: true, maxWidth: false },
            react_1.default.createElement(eui_1.EuiFlyoutHeader, { hasBorder: true },
                react_1.default.createElement(eui_1.EuiFlexGroup, null,
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiTitle, null,
                            react_1.default.createElement("h4", null, i18n_1.i18n.translate('xpack.apm.transactionDetails.transFlyout.transactionDetailsTitle', {
                                defaultMessage: 'Transaction details'
                            })))),
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(TransactionActionMenu_1.TransactionActionMenu, { transaction: transactionDoc })))),
            react_1.default.createElement(eui_1.EuiFlyoutBody, null,
                react_1.default.createElement(FlyoutTopLevelProperties_1.FlyoutTopLevelProperties, { transaction: transactionDoc }),
                react_1.default.createElement(eui_1.EuiHorizontalRule, null),
                react_1.default.createElement(StickyTransactionProperties_1.StickyTransactionProperties, { errorCount: errorCount, transaction: transactionDoc, totalDuration: traceRootDuration }),
                react_1.default.createElement(eui_1.EuiHorizontalRule, null),
                react_1.default.createElement(DroppedSpansWarning_1.DroppedSpansWarning, { transactionDoc: transactionDoc }),
                react_1.default.createElement(TransactionPropertiesTable, { transaction: transactionDoc })))));
}
exports.TransactionFlyout = TransactionFlyout;
