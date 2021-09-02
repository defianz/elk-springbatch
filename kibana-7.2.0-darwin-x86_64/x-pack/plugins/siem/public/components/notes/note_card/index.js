"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const note_card_body_1 = require("./note_card_body");
const note_card_header_1 = require("./note_card_header");
const NoteCardContainer = styled_components_1.default(eui_1.EuiPanel) `
  width: 100%;
`;
exports.NoteCard = recompose_1.pure(({ created, rawNote, user }) => (React.createElement(NoteCardContainer, { "data-test-subj": "note-card", hasShadow: false, paddingSize: "none" },
    React.createElement(note_card_header_1.NoteCardHeader, { created: created, user: user }),
    React.createElement(note_card_body_1.NoteCardBody, { rawNote: rawNote }))));
