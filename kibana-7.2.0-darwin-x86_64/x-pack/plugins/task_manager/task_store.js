"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * This module contains helpers for managing the task manager storage layer.
 */
const constants_1 = require("./constants");
/**
 * Wraps an elasticsearch connection and provides a task manager-specific
 * interface into the index.
 */
class TaskStore {
    /**
     * Constructs a new TaskStore.
     * @param {StoreOpts} opts
     * @prop {CallCluster} callCluster - The elastic search connection
     * @prop {string} index - The name of the task manager index
     * @prop {number} maxAttempts - The maximum number of attempts before a task will be abandoned
     * @prop {string[]} supportedTypes - The task types supported by this store
     * @prop {Logger} logger - The task manager logger.
     */
    constructor(opts) {
        this._isInitialized = false; // eslint-disable-line @typescript-eslint/camelcase
        this.callCluster = opts.callCluster;
        this.index = opts.index;
        this.maxAttempts = opts.maxAttempts;
        this.supportedTypes = opts.supportedTypes;
        this.logger = opts.logger;
        this.getKibanaUuid = opts.getKibanaUuid;
        this.fetchAvailableTasks = this.fetchAvailableTasks.bind(this);
    }
    addSupportedTypes(types) {
        if (!this._isInitialized) {
            this.supportedTypes = this.supportedTypes.concat(types);
        }
        else {
            throw new Error('Cannot add task types after initialization');
        }
    }
    /**
     * Initializes the store, ensuring the task manager index template is created
     * and the version is up to date.
     */
    async init() {
        if (this._isInitialized) {
            throw new Error('TaskStore has already been initialized!');
        }
        let existingVersion = -Infinity;
        const templateName = this.index;
        try {
            // check if template exists
            const templateCheck = await this.callCluster('indices.getTemplate', {
                name: templateName,
                filter_path: '*.version',
            });
            // extract the existing version
            const template = templateCheck[templateName] || {};
            existingVersion = template.version || 0;
        }
        catch (err) {
            if (err.statusCode !== 404) {
                throw err; // ignore not found
            }
        }
        if (existingVersion > constants_1.TASK_MANAGER_TEMPLATE_VERSION) {
            // Do not trample a newer version template
            this.logger.warning(`This Kibana instance defines an older template version (${constants_1.TASK_MANAGER_TEMPLATE_VERSION}) than is currently in Elasticsearch (${existingVersion}). ` +
                `Because of the potential for non-backwards compatible changes, this Kibana instance will only be able to claim scheduled tasks with ` +
                `"kibana.apiVersion" <= ${constants_1.TASK_MANAGER_API_VERSION} in the task metadata.`);
            return;
        }
        else if (existingVersion === constants_1.TASK_MANAGER_TEMPLATE_VERSION) {
            // The latest template is already saved, so just log a debug line.
            this.logger.debug(`Not installing ${this.index} index template: version ${constants_1.TASK_MANAGER_TEMPLATE_VERSION} already exists.`);
            return;
        }
        // Activate template creation / update
        if (existingVersion > 0) {
            this.logger.info(`Upgrading ${this.index} index template. Old version: ${existingVersion}, New version: ${constants_1.TASK_MANAGER_TEMPLATE_VERSION}.`);
        }
        else {
            this.logger.info(`Installing ${this.index} index template version: ${constants_1.TASK_MANAGER_TEMPLATE_VERSION}.`);
        }
        const templateResult = await this.callCluster('indices.putTemplate', {
            name: templateName,
            body: {
                index_patterns: [this.index],
                mappings: {
                    dynamic: false,
                    properties: {
                        type: { type: 'keyword' },
                        task: {
                            properties: {
                                taskType: { type: 'keyword' },
                                scheduledAt: { type: 'date' },
                                runAt: { type: 'date' },
                                interval: { type: 'text' },
                                attempts: { type: 'integer' },
                                status: { type: 'keyword' },
                                params: { type: 'text' },
                                state: { type: 'text' },
                                user: { type: 'keyword' },
                                scope: { type: 'keyword' },
                            },
                        },
                        kibana: {
                            properties: {
                                apiVersion: { type: 'integer' },
                                uuid: { type: 'keyword' },
                                version: { type: 'integer' },
                            },
                        },
                    },
                },
                settings: {
                    number_of_shards: 1,
                    auto_expand_replicas: '0-1',
                },
                version: constants_1.TASK_MANAGER_TEMPLATE_VERSION,
            },
        });
        this._isInitialized = true;
        this.logger.info(`Installed ${this.index} index template: version ${constants_1.TASK_MANAGER_TEMPLATE_VERSION} (API version ${constants_1.TASK_MANAGER_API_VERSION})`);
        return templateResult;
    }
    get isInitialized() {
        return this._isInitialized;
    }
    /**
     * Schedules a task.
     *
     * @param task - The task being scheduled.
     */
    async schedule(taskInstance) {
        if (!this._isInitialized) {
            await this.init();
        }
        if (!this.supportedTypes.includes(taskInstance.taskType)) {
            throw new Error(`Unsupported task type "${taskInstance.taskType}". Supported types are ${this.supportedTypes.join(', ')}`);
        }
        const { id, ...body } = rawSource(taskInstance, this);
        const result = await this.callCluster('index', {
            id,
            body,
            index: this.index,
            refresh: true,
        });
        const { task } = body;
        return {
            ...taskInstance,
            id: result._id,
            sequenceNumber: result._seq_no,
            primaryTerm: result._primary_term,
            attempts: 0,
            status: task.status,
            scheduledAt: task.scheduledAt,
            runAt: task.runAt,
            state: taskInstance.state || {},
        };
    }
    /**
     * Fetches a paginatable list of scheduled tasks.
     *
     * @param opts - The query options used to filter tasks
     */
    async fetch(opts = {}) {
        const sort = paginatableSort(opts.sort);
        return this.search({
            sort,
            search_after: opts.searchAfter,
            query: opts.query,
        });
    }
    /**
     * Fetches tasks from the index, which are ready to be run.
     * - runAt is now or past
     * - id is not currently running in this instance of Kibana
     * - has a type that is in our task definitions
     *
     * @param {TaskQuery} query
     * @prop {string[]} types - Task types to be queried
     * @prop {number} size - The number of task instances to retrieve
     * @returns {Promise<ConcreteTaskInstance[]>}
     */
    async fetchAvailableTasks() {
        const { docs } = await this.search({
            query: {
                bool: {
                    must: [
                        { terms: { 'task.taskType': this.supportedTypes } },
                        { range: { 'task.attempts': { lte: this.maxAttempts } } },
                        { range: { 'task.runAt': { lte: 'now' } } },
                        { range: { 'kibana.apiVersion': { lte: constants_1.TASK_MANAGER_API_VERSION } } },
                    ],
                },
            },
            size: 10,
            sort: { 'task.runAt': { order: 'asc' } },
            seq_no_primary_term: true,
        });
        return docs;
    }
    /**
     * Updates the specified doc in the index, returning the doc
     * with its version up to date.
     *
     * @param {TaskDoc} doc
     * @returns {Promise<TaskDoc>}
     */
    async update(doc) {
        const rawDoc = taskDocToRaw(doc, this);
        const result = await this.callCluster('update', {
            body: {
                doc: rawDoc._source,
            },
            id: doc.id,
            index: this.index,
            if_seq_no: doc.sequenceNumber,
            if_primary_term: doc.primaryTerm,
            // The refresh is important so that if we immediately look for work,
            // we don't pick up this task.
            refresh: true,
        });
        return {
            ...doc,
            sequenceNumber: result._seq_no,
            primaryTerm: result._primary_term,
        };
    }
    /**
     * Removes the specified task from the index.
     *
     * @param {string} id
     * @returns {Promise<void>}
     */
    async remove(id) {
        const result = await this.callCluster('delete', {
            id,
            index: this.index,
            // The refresh is important so that if we immediately look for work,
            // we don't pick up this task.
            refresh: true,
        });
        return {
            index: result._index,
            id: result._id,
            sequenceNumber: result._seq_no,
            primaryTerm: result._primary_term,
            result: result.result,
        };
    }
    async search(opts = {}) {
        const originalQuery = opts.query;
        const queryOnlyTasks = { term: { type: 'task' } };
        const query = originalQuery
            ? { bool: { must: [queryOnlyTasks, originalQuery] } }
            : queryOnlyTasks;
        const result = await this.callCluster('search', {
            index: this.index,
            ignoreUnavailable: true,
            body: {
                ...opts,
                query,
            },
        });
        const rawDocs = result.hits.hits;
        return {
            docs: rawDocs.map(rawToTaskDoc),
            searchAfter: (rawDocs.length && rawDocs[rawDocs.length - 1].sort) || [],
        };
    }
}
exports.TaskStore = TaskStore;
function paginatableSort(sort = []) {
    const sortById = { _id: 'desc' };
    if (!sort.length) {
        return [{ 'task.runAt': 'asc' }, sortById];
    }
    if (sort.find(({ _id }) => !!_id)) {
        return sort;
    }
    return [...sort, sortById];
}
function rawSource(doc, store) {
    const { id, ...taskFields } = doc;
    const source = {
        ...taskFields,
        params: JSON.stringify(doc.params || {}),
        state: JSON.stringify(doc.state || {}),
        attempts: doc.attempts || 0,
        scheduledAt: doc.scheduledAt || new Date(),
        runAt: doc.runAt || new Date(),
        status: doc.status || 'idle',
    };
    delete source.id;
    delete source.sequenceNumber;
    delete source.primaryTerm;
    delete source.type;
    return {
        id,
        type: 'task',
        task: source,
        kibana: {
            uuid: store.getKibanaUuid(),
            version: constants_1.TASK_MANAGER_TEMPLATE_VERSION,
            apiVersion: constants_1.TASK_MANAGER_API_VERSION,
        },
    };
}
function taskDocToRaw(doc, store) {
    const { type, task, kibana } = rawSource(doc, store);
    return {
        _id: doc.id,
        _index: store.index,
        _source: { type, task, kibana },
        _seq_no: doc.sequenceNumber,
        _primary_term: doc.primaryTerm,
    };
}
function rawToTaskDoc(doc) {
    return {
        ...doc._source.task,
        id: doc._id,
        sequenceNumber: doc._seq_no,
        primaryTerm: doc._primary_term,
        params: parseJSONField(doc._source.task.params, 'params', doc),
        state: parseJSONField(doc._source.task.state, 'state', doc),
    };
}
function parseJSONField(json, fieldName, doc) {
    try {
        return json ? JSON.parse(json) : {};
    }
    catch (error) {
        throw new Error(`Task "${doc._id}"'s ${fieldName} field has invalid JSON: ${json}`);
    }
}
