"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_observable_1 = require("redux-observable");
const epic_1 = require("./timeline/epic");
const epic_favorite_1 = require("./timeline/epic_favorite");
const epic_note_1 = require("./timeline/epic_note");
const epic_pinned_event_1 = require("./timeline/epic_pinned_event");
exports.createRootEpic = () => redux_observable_1.combineEpics(epic_1.createTimelineEpic(), epic_favorite_1.createTimelineFavoriteEpic(), epic_note_1.createTimelineNoteEpic(), epic_pinned_event_1.createTimelinePinnedEventEpic());
