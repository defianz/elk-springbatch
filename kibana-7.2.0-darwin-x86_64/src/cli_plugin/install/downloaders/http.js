"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = downloadUrl;

var _wreck = _interopRequireDefault(require("@hapi/wreck"));

var _progress = _interopRequireDefault(require("../progress"));

var _fs = require("fs");

var _httpProxyAgent = _interopRequireDefault(require("http-proxy-agent"));

var _httpsProxyAgent = _interopRequireDefault(require("https-proxy-agent"));

var _proxyFromEnv = require("proxy-from-env");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function getProxyAgent(sourceUrl, logger) {
  const proxy = (0, _proxyFromEnv.getProxyForUrl)(sourceUrl);

  if (!proxy) {
    return null;
  }

  logger.log(`Picked up proxy ${proxy} from environment variable.`);

  if (/^https/.test(sourceUrl)) {
    return new _httpsProxyAgent.default(proxy);
  } else {
    return new _httpProxyAgent.default(proxy);
  }
}

async function sendRequest({
  sourceUrl,
  timeout
}, logger) {
  const maxRedirects = 11; //Because this one goes to 11.

  const reqOptions = {
    timeout,
    redirects: maxRedirects
  };
  const proxyAgent = getProxyAgent(sourceUrl, logger);

  if (proxyAgent) {
    reqOptions.agent = proxyAgent;
  }

  try {
    const promise = _wreck.default.request('GET', sourceUrl, reqOptions);

    const req = promise.req;
    const resp = await promise;

    if (resp.statusCode >= 400) {
      throw new Error('ENOTFOUND');
    }

    return {
      req,
      resp
    };
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      err = new Error('ENOTFOUND');
    }

    throw err;
  }
}

function downloadResponse({
  resp,
  targetPath,
  progress
}) {
  return new Promise((resolve, reject) => {
    const writeStream = (0, _fs.createWriteStream)(targetPath); // if either stream errors, fail quickly

    resp.on('error', reject);
    writeStream.on('error', reject); // report progress as we download

    resp.on('data', chunk => {
      progress.progress(chunk.length);
    }); // write the download to the file system

    resp.pipe(writeStream); // when the write is done, we are done

    writeStream.on('finish', resolve);
  });
}
/*
Responsible for managing http transfers
*/


async function downloadUrl(logger, sourceUrl, targetPath, timeout) {
  try {
    const {
      req,
      resp
    } = await sendRequest({
      sourceUrl,
      timeout
    }, logger);

    try {
      const totalSize = parseFloat(resp.headers['content-length']) || 0;
      const progress = new _progress.default(logger);
      progress.init(totalSize);
      await downloadResponse({
        resp,
        targetPath,
        progress
      });
      progress.complete();
    } catch (err) {
      req.abort();
      throw err;
    }
  } catch (err) {
    if (err.message !== 'ENOTFOUND') {
      logger.error(err);
    }

    throw err;
  }
}

module.exports = exports.default;