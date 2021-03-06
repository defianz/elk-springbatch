"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryConfigBlocksAdapter {
    constructor(db) {
        this.db = db;
    }
    async upsert(blocks) {
        this.db = this.db.concat(blocks);
        return {
            success: true,
            results: blocks.map(() => ({
                success: true,
                action: 'created',
            })),
        };
    }
    async getForTags(tagIds) {
        return {
            success: true,
            list: this.db.filter(block => tagIds.includes(block.tag)),
            page: 0,
            total: this.db.filter(block => tagIds.includes(block.tag)).length,
        };
    }
    async delete(id) {
        this.db = this.db.reduce((newDB, block) => {
            if (block.id !== id) {
                newDB.push(block);
            }
            return newDB;
        }, []);
        return !!this.db.find(block => block.id === id);
    }
}
exports.MemoryConfigBlocksAdapter = MemoryConfigBlocksAdapter;
