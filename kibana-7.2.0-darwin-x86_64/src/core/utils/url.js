"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyUrl = modifyUrl;

var _url = require("url");

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

/**
 *  Takes a URL and a function that takes the meaningful parts
 *  of the URL as a key-value object, modifies some or all of
 *  the parts, and returns the modified parts formatted again
 *  as a url.
 *
 *  Url Parts sent:
 *    - protocol
 *    - slashes (does the url have the //)
 *    - auth
 *    - hostname (just the name of the host, no port or auth information)
 *    - port
 *    - pathname (the path after the hostname, no query or hash, starts
 *        with a slash if there was a path)
 *    - query (always an object, even when no query on original url)
 *    - hash
 *
 *  Why?
 *    - The default url library in node produces several conflicting
 *      properties on the "parsed" output. Modifying any of these might
 *      lead to the modifications being ignored (depending on which
 *      property was modified)
 *    - It's not always clear whether to use path/pathname, host/hostname,
 *      so this tries to add helpful constraints
 *
 *  @param url The string url to parse.
 *  @param urlModifier A function that will modify the parsed url, or return a new one.
 *  @returns The modified and reformatted url
 */
function modifyUrl(url, urlModifier) {
  const parsed = (0, _url.parse)(url, true); // Copy over the most specific version of each property. By default, the parsed url includes several
  // conflicting properties (like path and pathname + search, or search and query) and keeping track
  // of which property is actually used when they are formatted is harder than necessary.

  const meaningfulParts = {
    auth: parsed.auth,
    hash: parsed.hash,
    hostname: parsed.hostname,
    pathname: parsed.pathname,
    port: parsed.port,
    protocol: parsed.protocol,
    query: parsed.query || {},
    slashes: parsed.slashes
  }; // The urlModifier modifies the meaningfulParts object, or returns a new one.

  const modifiedParts = urlModifier(meaningfulParts) || meaningfulParts; // Format the modified/replaced meaningfulParts back into a url.

  return (0, _url.format)({
    auth: modifiedParts.auth,
    hash: modifiedParts.hash,
    hostname: modifiedParts.hostname,
    pathname: modifiedParts.pathname,
    port: modifiedParts.port,
    protocol: modifiedParts.protocol,
    query: modifiedParts.query,
    slashes: modifiedParts.slashes
  });
}