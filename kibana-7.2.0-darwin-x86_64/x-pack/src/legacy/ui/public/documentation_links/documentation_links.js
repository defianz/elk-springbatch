"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_1 = require("../metadata");
/*
  WARNING: The links in this file are validated during the docs build. This is accomplished with some regex magic that
  looks for these particular constants. As a result, we should not add new constants or change the existing ones.
  If you absolutely must make a change, talk to Clinton Gormley first so he can update his Perl scripts.
 */
exports.DOC_LINK_VERSION = metadata_1.metadata.branch;
exports.ELASTIC_WEBSITE_URL = 'https://www.elastic.co/';
const ELASTIC_DOCS = `${exports.ELASTIC_WEBSITE_URL}guide/en/elasticsearch/reference/${exports.DOC_LINK_VERSION}/`;
exports.documentationLinks = {
    filebeat: {
        base: `${exports.ELASTIC_WEBSITE_URL}guide/en/beats/filebeat/${exports.DOC_LINK_VERSION}`,
        installation: `${exports.ELASTIC_WEBSITE_URL}guide/en/beats/filebeat/${exports.DOC_LINK_VERSION}/filebeat-installation.html`,
        configuration: `${exports.ELASTIC_WEBSITE_URL}guide/en/beats/filebeat/${exports.DOC_LINK_VERSION}/filebeat-configuration.html`,
        elasticsearchOutput: `${exports.ELASTIC_WEBSITE_URL}guide/en/beats/filebeat/${exports.DOC_LINK_VERSION}/elasticsearch-output.html`,
        startup: `${exports.ELASTIC_WEBSITE_URL}guide/en/beats/filebeat/${exports.DOC_LINK_VERSION}/filebeat-starting.html`,
        exportedFields: `${exports.ELASTIC_WEBSITE_URL}guide/en/beats/filebeat/${exports.DOC_LINK_VERSION}/exported-fields.html`,
    },
    auditbeat: {
        base: `${exports.ELASTIC_WEBSITE_URL}guide/en/beats/auditbeat/${exports.DOC_LINK_VERSION}`,
    },
    metricbeat: {
        base: `${exports.ELASTIC_WEBSITE_URL}guide/en/beats/metricbeat/${exports.DOC_LINK_VERSION}`,
    },
    heartbeat: {
        base: `${exports.ELASTIC_WEBSITE_URL}guide/en/beats/heartbeat/${exports.DOC_LINK_VERSION}`,
    },
    logstash: {
        base: `${exports.ELASTIC_WEBSITE_URL}guide/en/logstash/${exports.DOC_LINK_VERSION}`,
    },
    functionbeat: {
        base: `${exports.ELASTIC_WEBSITE_URL}guide/en/beats/functionbeat/${exports.DOC_LINK_VERSION}`,
    },
    winlogbeat: {
        base: `${exports.ELASTIC_WEBSITE_URL}guide/en/beats/winlogbeat/${exports.DOC_LINK_VERSION}`,
    },
    aggs: {
        date_histogram: `${ELASTIC_DOCS}search-aggregations-bucket-datehistogram-aggregation.html`,
        date_range: `${ELASTIC_DOCS}search-aggregations-bucket-daterange-aggregation.html`,
        filter: `${ELASTIC_DOCS}search-aggregations-bucket-filter-aggregation.html`,
        filters: `${ELASTIC_DOCS}search-aggregations-bucket-filters-aggregation.html`,
        geohash_grid: `${ELASTIC_DOCS}search-aggregations-bucket-geohashgrid-aggregation.html`,
        histogram: `${ELASTIC_DOCS}search-aggregations-bucket-histogram-aggregation.html`,
        ip_range: `${ELASTIC_DOCS}search-aggregations-bucket-iprange-aggregation.html`,
        range: `${ELASTIC_DOCS}search-aggregations-bucket-range-aggregation.html`,
        significant_terms: `${ELASTIC_DOCS}search-aggregations-bucket-significantterms-aggregation.html`,
        terms: `${ELASTIC_DOCS}search-aggregations-bucket-terms-aggregation.html`,
        avg: `${ELASTIC_DOCS}search-aggregations-metrics-avg-aggregation.html`,
        avg_bucket: `${ELASTIC_DOCS}search-aggregations-pipeline-avg-bucket-aggregation.html`,
        max_bucket: `${ELASTIC_DOCS}search-aggregations-pipeline-max-bucket-aggregation.html`,
        min_bucket: `${ELASTIC_DOCS}search-aggregations-pipeline-min-bucket-aggregation.html`,
        sum_bucket: `${ELASTIC_DOCS}search-aggregations-pipeline-sum-bucket-aggregation.html`,
        cardinality: `${ELASTIC_DOCS}search-aggregations-metrics-cardinality-aggregation.html`,
        count: `${ELASTIC_DOCS}search-aggregations-metrics-valuecount-aggregation.html`,
        cumulative_sum: `${ELASTIC_DOCS}search-aggregations-metrics-sum-aggregation.html`,
        derivative: `${ELASTIC_DOCS}search-aggregations-pipeline-derivative-aggregation.html`,
        geo_bounds: `${ELASTIC_DOCS}search-aggregations-metrics-geobounds-aggregation.html`,
        geo_centroid: `${ELASTIC_DOCS}search-aggregations-metrics-geocentroid-aggregation.html`,
        max: `${ELASTIC_DOCS}search-aggregations-metrics-max-aggregation.html`,
        median: `${ELASTIC_DOCS}search-aggregations-metrics-percentile-aggregation.html`,
        min: `${ELASTIC_DOCS}search-aggregations-metrics-min-aggregation.html`,
        moving_avg: `${ELASTIC_DOCS}search-aggregations-pipeline-movavg-aggregation.html`,
        percentile_ranks: `${ELASTIC_DOCS}search-aggregations-metrics-percentile-rank-aggregation.html`,
        serial_diff: `${ELASTIC_DOCS}search-aggregations-pipeline-serialdiff-aggregation.html`,
        std_dev: `${ELASTIC_DOCS}search-aggregations-metrics-extendedstats-aggregation.html`,
        sum: `${ELASTIC_DOCS}search-aggregations-metrics-sum-aggregation.html`,
        top_hits: `${ELASTIC_DOCS}search-aggregations-metrics-top-hits-aggregation.html`,
    },
    scriptedFields: {
        scriptFields: `${ELASTIC_DOCS}search-request-script-fields.html`,
        scriptAggs: `${ELASTIC_DOCS}search-aggregations.html#_values_source`,
        painless: `${ELASTIC_DOCS}modules-scripting-painless.html`,
        painlessApi: `${exports.ELASTIC_WEBSITE_URL}guide/en/elasticsearch/painless/${exports.DOC_LINK_VERSION}/painless-api-reference.html`,
        painlessSyntax: `${ELASTIC_DOCS}modules-scripting-painless-syntax.html`,
        luceneExpressions: `${ELASTIC_DOCS}modules-scripting-expression.html`,
    },
    indexPatterns: {
        loadingData: `${exports.ELASTIC_WEBSITE_URL}guide/en/kibana/${exports.DOC_LINK_VERSION}/tutorial-load-dataset.html`,
        introduction: `${exports.ELASTIC_WEBSITE_URL}guide/en/kibana/${exports.DOC_LINK_VERSION}/index-patterns.html`,
    },
    kibana: `${exports.ELASTIC_WEBSITE_URL}guide/en/kibana/${exports.DOC_LINK_VERSION}/index.html`,
    siem: `${exports.ELASTIC_WEBSITE_URL}guide/en/siem/guide/${exports.DOC_LINK_VERSION}/index.html`,
    query: {
        luceneQuerySyntax: `${ELASTIC_DOCS}query-dsl-query-string-query.html#query-string-syntax`,
        queryDsl: `${ELASTIC_DOCS}query-dsl.html`,
        kueryQuerySyntax: `${exports.ELASTIC_WEBSITE_URL}guide/en/kibana/${exports.DOC_LINK_VERSION}/kuery-query.html`,
    },
    date: {
        dateMath: `${ELASTIC_DOCS}common-options.html#date-math`,
    },
};
