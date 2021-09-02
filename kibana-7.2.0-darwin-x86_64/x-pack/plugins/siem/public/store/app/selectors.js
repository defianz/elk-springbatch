"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const memoize_one_1 = tslib_1.__importDefault(require("memoize-one"));
const reselect_1 = require("reselect");
const selectNotesById = (state) => state.app.notesById;
const getErrors = (state) => state.app.errors;
const getNotes = (notesById, noteIds) => fp_1.keys(notesById).reduce((acc, noteId) => {
    if (noteIds.includes(noteId)) {
        const note = notesById[noteId];
        return [...acc, note];
    }
    return acc;
}, []);
exports.selectNotesByIdSelector = reselect_1.createSelector(selectNotesById, (notesById) => notesById);
exports.notesByIdsSelector = () => reselect_1.createSelector(selectNotesById, (notesById) => memoize_one_1.default((noteIds) => getNotes(notesById, noteIds)));
exports.errorsSelector = () => reselect_1.createSelector(getErrors, errors => ({ errors }));
