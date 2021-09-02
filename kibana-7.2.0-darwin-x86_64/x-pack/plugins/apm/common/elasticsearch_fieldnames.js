"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
exports.SERVICE_NAME = 'service.name';
exports.SERVICE_ENVIRONMENT = 'service.environment';
exports.SERVICE_AGENT_NAME = 'agent.name';
exports.URL_FULL = 'url.full';
exports.HTTP_REQUEST_METHOD = 'http.request.method';
exports.USER_ID = 'user.id';
exports.OBSERVER_VERSION_MAJOR = 'observer.version_major';
exports.OBSERVER_LISTENING = 'observer.listening';
exports.PROCESSOR_EVENT = 'processor.event';
exports.TRANSACTION_DURATION = 'transaction.duration.us';
exports.TRANSACTION_TYPE = 'transaction.type';
exports.TRANSACTION_RESULT = 'transaction.result';
exports.TRANSACTION_NAME = 'transaction.name';
exports.TRANSACTION_ID = 'transaction.id';
exports.TRANSACTION_SAMPLED = 'transaction.sampled';
exports.TRACE_ID = 'trace.id';
exports.SPAN_DURATION = 'span.duration.us';
exports.SPAN_TYPE = 'span.type';
exports.SPAN_SUBTYPE = 'span.subtype';
exports.SPAN_ACTION = 'span.action';
exports.SPAN_NAME = 'span.name';
exports.SPAN_ID = 'span.id';
// Parent ID for a transaction or span
exports.PARENT_ID = 'parent.id';
exports.ERROR_GROUP_ID = 'error.grouping_key';
exports.ERROR_CULPRIT = 'error.culprit';
exports.ERROR_LOG_MESSAGE = 'error.log.message';
exports.ERROR_EXC_MESSAGE = 'error.exception.message'; // only to be used in es queries, since error.exception is now an array
exports.ERROR_EXC_HANDLED = 'error.exception.handled'; // only to be used in es queries, since error.exception is now an array
// METRICS
exports.METRIC_SYSTEM_FREE_MEMORY = 'system.memory.actual.free';
exports.METRIC_SYSTEM_TOTAL_MEMORY = 'system.memory.total';
exports.METRIC_SYSTEM_CPU_PERCENT = 'system.cpu.total.norm.pct';
exports.METRIC_PROCESS_CPU_PERCENT = 'system.process.cpu.total.norm.pct';
exports.METRIC_JAVA_HEAP_MEMORY_MAX = 'jvm.memory.heap.max';
exports.METRIC_JAVA_HEAP_MEMORY_COMMITTED = 'jvm.memory.heap.committed';
exports.METRIC_JAVA_HEAP_MEMORY_USED = 'jvm.memory.heap.used';
exports.METRIC_JAVA_NON_HEAP_MEMORY_MAX = 'jvm.memory.non_heap.max';
exports.METRIC_JAVA_NON_HEAP_MEMORY_COMMITTED = 'jvm.memory.non_heap.committed';
exports.METRIC_JAVA_NON_HEAP_MEMORY_USED = 'jvm.memory.non_heap.used';
exports.METRIC_JAVA_THREAD_COUNT = 'jvm.thread.count';
