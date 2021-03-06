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
const tslib_1 = require("tslib");
const Rx = tslib_1.__importStar(require("rxjs"));
const operators_1 = require("rxjs/operators");
/**
 * Just like the [`shareReplay()`](https://rxjs-dev.firebaseapp.com/api/operators/shareReplay) operator from
 * RxJS except for a few key differences:
 *
 * - If all downstream subscribers unsubscribe the source subscription will be unsubscribed.
 *
 * - Replay-ability is only maintained while the source is active, if it completes or errors
 *   then complete/error is sent to the current subscribers and the replay buffer is cleared.
 *
 * - Any subscription after the the source completes or errors will create a new subscription
 *   to the source observable.
 *
 * @param bufferSize Optional, default is `Number.POSITIVE_INFINITY`
 */
function shareWeakReplay(bufferSize) {
    return (source) => {
        let subject;
        const stop$ = new Rx.Subject();
        return new Rx.Observable(observer => {
            if (!subject) {
                subject = new Rx.ReplaySubject(bufferSize);
            }
            subject.subscribe(observer).add(() => {
                if (!subject) {
                    return;
                }
                if (subject.observers.length === 0) {
                    stop$.next();
                }
                if (subject.closed || subject.isStopped) {
                    subject = undefined;
                }
            });
            if (subject && subject.observers.length === 1) {
                source.pipe(operators_1.takeUntil(stop$)).subscribe(subject);
            }
        });
    };
}
exports.shareWeakReplay = shareWeakReplay;
