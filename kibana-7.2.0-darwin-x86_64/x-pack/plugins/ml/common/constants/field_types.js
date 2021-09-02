"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ES_FIELD_TYPES;
(function (ES_FIELD_TYPES) {
    ES_FIELD_TYPES["ATTACHMENT"] = "attachment";
    ES_FIELD_TYPES["BOOLEAN"] = "boolean";
    ES_FIELD_TYPES["BYTE"] = "byte";
    ES_FIELD_TYPES["DATE"] = "date";
    ES_FIELD_TYPES["DOUBLE"] = "double";
    ES_FIELD_TYPES["FLOAT"] = "float";
    ES_FIELD_TYPES["GEO_POINT"] = "geo_point";
    ES_FIELD_TYPES["GEO_SHAPE"] = "geo_shape";
    ES_FIELD_TYPES["HALF_FLOAT"] = "half_float";
    ES_FIELD_TYPES["INTEGER"] = "integer";
    ES_FIELD_TYPES["IP"] = "ip";
    ES_FIELD_TYPES["KEYWORD"] = "keyword";
    ES_FIELD_TYPES["LONG"] = "long";
    ES_FIELD_TYPES["MURMUR3"] = "murmur3";
    ES_FIELD_TYPES["SCALED_FLOAT"] = "scaled_float";
    ES_FIELD_TYPES["SHORT"] = "short";
    ES_FIELD_TYPES["TEXT"] = "text";
    ES_FIELD_TYPES["TOKEN_COUNT"] = "token_count";
    ES_FIELD_TYPES["_ID"] = "_id";
    ES_FIELD_TYPES["_SOURCE"] = "_source";
    ES_FIELD_TYPES["_TYPE"] = "_type";
})(ES_FIELD_TYPES = exports.ES_FIELD_TYPES || (exports.ES_FIELD_TYPES = {}));
var KBN_FIELD_TYPES;
(function (KBN_FIELD_TYPES) {
    KBN_FIELD_TYPES["ATTACHMENT"] = "attachment";
    KBN_FIELD_TYPES["BOOLEAN"] = "boolean";
    KBN_FIELD_TYPES["DATE"] = "date";
    KBN_FIELD_TYPES["GEO_POINT"] = "geo_point";
    KBN_FIELD_TYPES["GEO_SHAPE"] = "geo_shape";
    KBN_FIELD_TYPES["IP"] = "ip";
    KBN_FIELD_TYPES["MURMUR3"] = "murmur3";
    KBN_FIELD_TYPES["NUMBER"] = "number";
    KBN_FIELD_TYPES["STRING"] = "string";
    KBN_FIELD_TYPES["_SOURCE"] = "_source";
    KBN_FIELD_TYPES["UNKNOWN"] = "unknown";
    KBN_FIELD_TYPES["CONFLICT"] = "conflict";
})(KBN_FIELD_TYPES = exports.KBN_FIELD_TYPES || (exports.KBN_FIELD_TYPES = {}));
var ML_JOB_FIELD_TYPES;
(function (ML_JOB_FIELD_TYPES) {
    ML_JOB_FIELD_TYPES["BOOLEAN"] = "boolean";
    ML_JOB_FIELD_TYPES["DATE"] = "date";
    ML_JOB_FIELD_TYPES["GEO_POINT"] = "geo_point";
    ML_JOB_FIELD_TYPES["IP"] = "ip";
    ML_JOB_FIELD_TYPES["KEYWORD"] = "keyword";
    ML_JOB_FIELD_TYPES["NUMBER"] = "number";
    ML_JOB_FIELD_TYPES["TEXT"] = "text";
    ML_JOB_FIELD_TYPES["UNKNOWN"] = "unknown";
})(ML_JOB_FIELD_TYPES = exports.ML_JOB_FIELD_TYPES || (exports.ML_JOB_FIELD_TYPES = {}));
