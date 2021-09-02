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
const i18n = tslib_1.__importStar(require("../translations"));
const note_created_1 = require("./note_created");
const Action = styled_components_1.default.span `
  margin-right: 5px;
`;
const Avatar = styled_components_1.default(eui_1.EuiAvatar) `
  margin-right: 5px;
`;
const HeaderContainer = styled_components_1.default.div `
  align-items: center;
  display: flex;
  user-select: none;
`;
const User = styled_components_1.default.span `
  font-weight: 700;
  margin: 5px;
`;
exports.NoteCardHeader = recompose_1.pure(({ created, user }) => (React.createElement(eui_1.EuiPanel, { "data-test-subj": "note-card-header", hasShadow: false, paddingSize: "s" },
    React.createElement(HeaderContainer, null,
        React.createElement(Avatar, { "data-test-subj": "avatar", size: "s", name: user }),
        React.createElement(User, { "data-test-subj": "user" }, user),
        React.createElement(Action, { "data-test-subj": "action" }, i18n.ADDED_A_NOTE),
        React.createElement(note_created_1.NoteCreated, { "data-test-subj": "created", created: created })))));
