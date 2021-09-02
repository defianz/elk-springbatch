"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = require("@kbn/i18n/react");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const localized_date_tooltip_1 = require("../../localized_date_tooltip");
const NoteCreatedContainer = styled_components_1.default.span `
  user-select: none;
`;
exports.NoteCreated = recompose_1.pure(({ created }) => (React.createElement(NoteCreatedContainer, { "data-test-subj": "note-created" },
    React.createElement(localized_date_tooltip_1.LocalizedDateTooltip, { date: created },
        React.createElement(react_1.FormattedRelative, { value: created })))));
