"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const timefilter_1 = require("ui/timefilter");
const jobs_list_1 = require("../../../../../../common/constants/jobs_list");
exports.useRefreshInterval = (getJobs, setBlockRefresh) => {
    react_1.useEffect(() => {
        let jobsRefreshInterval = null;
        timefilter_1.timefilter.disableTimeRangeSelector();
        timefilter_1.timefilter.enableAutoRefreshSelector();
        initAutoRefresh();
        initAutoRefreshUpdate();
        function initAutoRefresh() {
            const { value } = timefilter_1.timefilter.getRefreshInterval();
            if (value === 0) {
                // the auto refresher starts in an off state
                // so switch it on and set the interval to 30s
                timefilter_1.timefilter.setRefreshInterval({
                    pause: false,
                    value: jobs_list_1.DEFAULT_REFRESH_INTERVAL_MS,
                });
            }
            setAutoRefresh();
        }
        function initAutoRefreshUpdate() {
            // update the interval if it changes
            timefilter_1.timefilter.on('refreshIntervalUpdate', () => {
                setAutoRefresh();
            });
        }
        function setAutoRefresh() {
            const { value, pause } = timefilter_1.timefilter.getRefreshInterval();
            if (pause) {
                clearRefreshInterval();
            }
            else {
                setRefreshInterval(value);
            }
            getJobs(true);
        }
        function setRefreshInterval(interval) {
            clearRefreshInterval();
            if (interval >= jobs_list_1.MINIMUM_REFRESH_INTERVAL_MS) {
                setBlockRefresh(false);
                const intervalId = window.setInterval(() => {
                    getJobs();
                }, interval);
                jobsRefreshInterval = intervalId;
            }
        }
        function clearRefreshInterval() {
            setBlockRefresh(true);
            if (jobsRefreshInterval !== null) {
                window.clearInterval(jobsRefreshInterval);
            }
        }
        // useEffect cleanup
        return () => {
            clearRefreshInterval();
        };
    }, []); // [] as comparator makes sure this only runs once
};
