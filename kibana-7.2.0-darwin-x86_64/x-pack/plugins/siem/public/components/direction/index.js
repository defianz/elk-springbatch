"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const types_1 = require("../../graphql/types");
const draggables_1 = require("../draggables");
const field_names_1 = require("../source_destination/field_names");
exports.INBOUND = 'inbound';
exports.OUTBOUND = 'outbound';
exports.EXTERNAL = 'external';
exports.INTERNAL = 'internal';
exports.INCOMING = 'incoming';
exports.OUTGOING = 'outgoing';
exports.LISTENING = 'listening';
exports.UNKNOWN = 'unknown';
exports.DEFAULT_ICON = 'questionInCircle';
/** Returns an icon representing the value of `network.direction` */
exports.getDirectionIcon = (networkDirection) => {
    if (networkDirection == null) {
        return exports.DEFAULT_ICON;
    }
    const direction = `${networkDirection}`.toLowerCase();
    switch (direction) {
        case types_1.NetworkDirectionEcs.outbound:
        case types_1.NetworkDirectionEcs.outgoing:
            return 'arrowUp';
        case types_1.NetworkDirectionEcs.inbound:
        case types_1.NetworkDirectionEcs.incoming:
        case types_1.NetworkDirectionEcs.listening:
            return 'arrowDown';
        case types_1.NetworkDirectionEcs.external:
            return 'globe';
        case types_1.NetworkDirectionEcs.internal:
            return 'bullseye';
        case types_1.NetworkDirectionEcs.unknown:
        default:
            return exports.DEFAULT_ICON;
    }
};
/**
 * Renders a badge containing the value of `network.direction`
 */
exports.DirectionBadge = recompose_1.pure(({ contextId, eventId, direction }) => (React.createElement(draggables_1.DraggableBadge, { contextId: contextId, "data-test-subj": "network-direction", eventId: eventId, field: field_names_1.NETWORK_DIRECTION_FIELD_NAME, iconType: exports.getDirectionIcon(direction), value: direction })));
