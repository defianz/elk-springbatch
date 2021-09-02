"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.persistTimelineFavoriteMutation = graphql_tag_1.default `
  mutation PersistTimelineFavoriteMutation($timelineId: ID) {
    persistFavorite(timelineId: $timelineId) {
      savedObjectId
      version
      favorite {
        fullName
        userName
        favoriteDate
      }
    }
  }
`;