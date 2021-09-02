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
const note_card_1 = require("./note_card");
const i18n = tslib_1.__importStar(require("./translations"));
const Column = recompose_1.pure(({ text }) => React.createElement("span", null, text));
exports.columns = [
    {
        field: 'note',
        name: i18n.NOTE,
        sortable: true,
        truncateText: false,
        render: (_, { created, note, user }) => (React.createElement(note_card_1.NoteCard, { created: created, rawNote: note, user: user })),
    },
];
