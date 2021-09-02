"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.documentationLinks = exports.ELASTIC_WEBSITE_URL = exports.DOC_LINK_VERSION = void 0;

var _metadata = require("../metadata");

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
  WARNING: The links in this file are validated during the docs build. This is accomplished with some regex magic that
  looks for these particular constants. As a result, we should not add new constants or change the existing ones.
  If you absolutely must make a change, talk to Clinton Gormley first so he can update his Perl scripts.
 */
var DOC_LINK_VERSION = _metadata.metadata.branch;
exports.DOC_LINK_VERSION = DOC_LINK_VERSION;
var ELASTIC_WEBSITE_URL = 'https://www.elastic.co/';
exports.ELASTIC_WEBSITE_URL = ELASTIC_WEBSITE_URL;
var ELASTIC_DOCS = "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION, "/");
var documentationLinks = {
  filebeat: {
    base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/filebeat/").concat(DOC_LINK_VERSION),
    installation: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/filebeat/").concat(DOC_LINK_VERSION, "/filebeat-installation.html"),
    configuration: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/filebeat/").concat(DOC_LINK_VERSION, "/filebeat-configuration.html"),
    elasticsearchOutput: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/filebeat/").concat(DOC_LINK_VERSION, "/elasticsearch-output.html"),
    startup: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/filebeat/").concat(DOC_LINK_VERSION, "/filebeat-starting.html"),
    exportedFields: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/filebeat/").concat(DOC_LINK_VERSION, "/exported-fields.html")
  },
  auditbeat: {
    base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/auditbeat/").concat(DOC_LINK_VERSION)
  },
  metricbeat: {
    base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/metricbeat/").concat(DOC_LINK_VERSION)
  },
  heartbeat: {
    base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/heartbeat/").concat(DOC_LINK_VERSION)
  },
  logstash: {
    base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/logstash/").concat(DOC_LINK_VERSION)
  },
  functionbeat: {
    base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/functionbeat/").concat(DOC_LINK_VERSION)
  },
  winlogbeat: {
    base: "".concat(ELASTIC_WEBSITE_URL, "guide/en/beats/winlogbeat/").concat(DOC_LINK_VERSION)
  },
  aggs: {
    date_histogram: "".concat(ELASTIC_DOCS, "search-aggregations-bucket-datehistogram-aggregation.html"),
    date_range: "".concat(ELASTIC_DOCS, "search-aggregations-bucket-daterange-aggregation.html"),
    filter: "".concat(ELASTIC_DOCS, "search-aggregations-bucket-filter-aggregation.html"),
    filters: "".concat(ELASTIC_DOCS, "search-aggregations-bucket-filters-aggregation.html"),
    geohash_grid: "".concat(ELASTIC_DOCS, "search-aggregations-bucket-geohashgrid-aggregation.html"),
    histogram: "".concat(ELASTIC_DOCS, "search-aggregations-bucket-histogram-aggregation.html"),
    ip_range: "".concat(ELASTIC_DOCS, "search-aggregations-bucket-iprange-aggregation.html"),
    range: "".concat(ELASTIC_DOCS, "search-aggregations-bucket-range-aggregation.html"),
    significant_terms: "".concat(ELASTIC_DOCS, "search-aggregations-bucket-significantterms-aggregation.html"),
    terms: "".concat(ELASTIC_DOCS, "search-aggregations-bucket-terms-aggregation.html"),
    avg: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-avg-aggregation.html"),
    avg_bucket: "".concat(ELASTIC_DOCS, "search-aggregations-pipeline-avg-bucket-aggregation.html"),
    max_bucket: "".concat(ELASTIC_DOCS, "search-aggregations-pipeline-max-bucket-aggregation.html"),
    min_bucket: "".concat(ELASTIC_DOCS, "search-aggregations-pipeline-min-bucket-aggregation.html"),
    sum_bucket: "".concat(ELASTIC_DOCS, "search-aggregations-pipeline-sum-bucket-aggregation.html"),
    cardinality: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-cardinality-aggregation.html"),
    count: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-valuecount-aggregation.html"),
    cumulative_sum: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-sum-aggregation.html"),
    derivative: "".concat(ELASTIC_DOCS, "search-aggregations-pipeline-derivative-aggregation.html"),
    geo_bounds: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-geobounds-aggregation.html"),
    geo_centroid: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-geocentroid-aggregation.html"),
    max: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-max-aggregation.html"),
    median: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-percentile-aggregation.html"),
    min: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-min-aggregation.html"),
    moving_avg: "".concat(ELASTIC_DOCS, "search-aggregations-pipeline-movavg-aggregation.html"),
    percentile_ranks: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-percentile-rank-aggregation.html"),
    serial_diff: "".concat(ELASTIC_DOCS, "search-aggregations-pipeline-serialdiff-aggregation.html"),
    std_dev: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-extendedstats-aggregation.html"),
    sum: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-sum-aggregation.html"),
    top_hits: "".concat(ELASTIC_DOCS, "search-aggregations-metrics-top-hits-aggregation.html")
  },
  scriptedFields: {
    scriptFields: "".concat(ELASTIC_DOCS, "search-request-script-fields.html"),
    scriptAggs: "".concat(ELASTIC_DOCS, "search-aggregations.html#_values_source"),
    painless: "".concat(ELASTIC_DOCS, "modules-scripting-painless.html"),
    painlessApi: "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/painless/").concat(DOC_LINK_VERSION, "/painless-api-reference.html"),
    painlessSyntax: "".concat(ELASTIC_DOCS, "modules-scripting-painless-syntax.html"),
    luceneExpressions: "".concat(ELASTIC_DOCS, "modules-scripting-expression.html")
  },
  indexPatterns: {
    loadingData: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/tutorial-load-dataset.html"),
    introduction: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/index-patterns.html")
  },
  kibana: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/index.html"),
  siem: "".concat(ELASTIC_WEBSITE_URL, "guide/en/siem/guide/").concat(DOC_LINK_VERSION, "/index.html"),
  query: {
    luceneQuerySyntax: "".concat(ELASTIC_DOCS, "query-dsl-query-string-query.html#query-string-syntax"),
    queryDsl: "".concat(ELASTIC_DOCS, "query-dsl.html"),
    kueryQuerySyntax: "".concat(ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat(DOC_LINK_VERSION, "/kuery-query.html")
  },
  date: {
    dateMath: "".concat(ELASTIC_DOCS, "common-options.html#date-math")
  }
};
exports.documentationLinks = documentationLinks;