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
const absolute_to_parsed_url_1 = require("../../url/absolute_to_parsed_url");
const new_platform_1 = require("../../new_platform");
const relative_to_absolute_1 = require("../../url/relative_to_absolute");
function initChromeNavApi(chrome, internals) {
    let coreNavLinks;
    new_platform_1.onStart(({ core }) => (coreNavLinks = core.chrome.navLinks));
    /**
     * Clear last url for deleted saved objects to avoid loading pages with "Could not locate..."
     */
    chrome.untrackNavLinksForDeletedSavedObjects = (deletedIds) => {
        function urlContainsDeletedId(url) {
            const includedId = deletedIds.find(deletedId => {
                return url.includes(deletedId);
            });
            return includedId !== undefined;
        }
        coreNavLinks.getAll().forEach(link => {
            if (link.linkToLastSubUrl && urlContainsDeletedId(link.url)) {
                setLastUrl(link, link.baseUrl);
            }
        });
    };
    /**
     * Manually sets the last url for the given app. The last url for a given app is updated automatically during
     * normal page navigation, so this should only need to be called to insert a last url that was not actually
     * navigated to. For instance, when saving an object and redirecting to another page, the last url of the app
     * should be the saved instance, but because of the redirect to a different page (e.g. `Save and Add to Dashboard`
     * on visualize tab), it won't be tracked automatically and will need to be inserted manually. See
     * https://github.com/elastic/kibana/pull/11932 for more background on why this was added.
     *
     * @param id {String} - an id that represents the navigation link.
     * @param kibanaParsedUrl {KibanaParsedUrl} the url to track
     */
    chrome.trackSubUrlForApp = (id, kibanaParsedUrl) => {
        const navLink = coreNavLinks.get(id);
        if (navLink) {
            setLastUrl(navLink, kibanaParsedUrl.getAbsoluteUrl());
        }
    };
    internals.trackPossibleSubUrl = async function (url) {
        const kibanaParsedUrl = absolute_to_parsed_url_1.absoluteToParsedUrl(url, chrome.getBasePath());
        coreNavLinks
            .getAll()
            // Filter only legacy links
            .filter(link => link.subUrlBase)
            .forEach(link => {
            const active = url.startsWith(link.subUrlBase);
            link = coreNavLinks.update(link.id, { active });
            if (active) {
                setLastUrl(link, url);
                return;
            }
            link = refreshLastUrl(link);
            const newGlobalState = kibanaParsedUrl.getGlobalState();
            if (newGlobalState) {
                injectNewGlobalState(link, kibanaParsedUrl.appId, newGlobalState);
            }
        });
    };
    function lastSubUrlKey(link) {
        return `lastSubUrl:${link.baseUrl}`;
    }
    function getLastUrl(link) {
        return internals.appUrlStore.getItem(lastSubUrlKey(link));
    }
    function setLastUrl(link, url) {
        if (link.linkToLastSubUrl === false) {
            return;
        }
        internals.appUrlStore.setItem(lastSubUrlKey(link), url);
        refreshLastUrl(link);
    }
    function refreshLastUrl(link) {
        const lastSubUrl = getLastUrl(link);
        return coreNavLinks.update(link.id, {
            url: lastSubUrl || link.url || link.baseUrl,
        });
    }
    function injectNewGlobalState(link, fromAppId, newGlobalState) {
        const kibanaParsedUrl = absolute_to_parsed_url_1.absoluteToParsedUrl(getLastUrl(link) || link.url || link.baseUrl, chrome.getBasePath());
        // don't copy global state if links are for different apps
        if (fromAppId !== kibanaParsedUrl.appId)
            return;
        kibanaParsedUrl.setGlobalState(newGlobalState);
        coreNavLinks.update(link.id, {
            url: kibanaParsedUrl.getAbsoluteUrl(),
        });
    }
    // simulate a possible change in url to initialize the
    // link.active and link.lastUrl properties
    new_platform_1.onStart(({ core }) => {
        core.chrome.navLinks
            .getAll()
            .filter(link => link.subUrlBase)
            .forEach(link => {
            core.chrome.navLinks.update(link.id, {
                subUrlBase: relative_to_absolute_1.relativeToAbsolute(chrome.addBasePath(link.subUrlBase)),
            });
        });
        internals.trackPossibleSubUrl(document.location.href);
    });
}
exports.initChromeNavApi = initChromeNavApi;
