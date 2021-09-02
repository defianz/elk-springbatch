"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_fsa_reducers_1 = require("typescript-fsa-reducers");
const actions_1 = require("./actions");
exports.initialAppState = {
    notesById: {},
    errors: [],
};
exports.updateNotesById = ({ note, notesById }) => ({
    ...notesById,
    [note.id]: note,
});
exports.appReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialAppState)
    .case(actions_1.addNotes, (state, { notes }) => ({
    ...state,
    notesById: notes.reduce((acc, note) => ({ ...acc, [note.id]: note }), {}),
}))
    .case(actions_1.updateNote, (state, { note }) => ({
    ...state,
    notesById: exports.updateNotesById({ note, notesById: state.notesById }),
}))
    .case(actions_1.addError, (state, { id, title, message }) => ({
    ...state,
    errors: state.errors.concat({ id, title, message }),
}))
    .case(actions_1.removeError, (state, { id }) => ({
    ...state,
    errors: state.errors.filter(error => error.id !== id),
}))
    .build();
