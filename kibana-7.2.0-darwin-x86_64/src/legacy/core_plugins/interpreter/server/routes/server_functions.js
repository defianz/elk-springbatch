"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerServerFunctions = registerServerFunctions;

var _boom = _interopRequireDefault(require("boom"));

var _serialize = require("../../common/serialize");

var _constants = require("../../common/constants");

var _create_handlers = require("../lib/create_handlers");

var _joi = _interopRequireDefault(require("joi"));

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

/**
 * Register the Canvas function endopints.
 *
 * @param {*} server - The Kibana server
 */
function registerServerFunctions(server) {
  getServerFunctions(server);
  runServerFunctions(server);
}
/**
 * Register the endpoint that executes a batch of functions, and sends the result back as a single response.
 *
 * @param {*} server - The Kibana server
 */


function runServerFunctions(server) {
  server.route({
    method: 'POST',
    path: `${_constants.API_ROUTE}/fns`,
    options: {
      payload: {
        allow: 'application/json',
        maxBytes: 26214400 // 25MB payload limit

      },
      validate: {
        payload: _joi.default.object({
          functions: _joi.default.array().items(_joi.default.object().keys({
            id: _joi.default.number().required(),
            functionName: _joi.default.string().required(),
            args: _joi.default.object().default({}),
            context: _joi.default.any().default(null)
          })).required()
        }).required()
      }
    },

    async handler(req) {
      const handlers = await (0, _create_handlers.createHandlers)(req, server);
      const {
        functions
      } = req.payload; // Grab the raw Node response object.

      const res = req.raw.res; // Tell Hapi not to manage the response https://github.com/hapijs/hapi/issues/3884

      req._isReplied = true; // Send the initial headers.

      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Connection': 'keep-alive',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache'
      }); // Write a length-delimited response

      const streamResult = result => {
        const payload = JSON.stringify(result) + '\n';
        res.write(`${payload.length}:${payload}`);
      }; // Tries to run an interpreter function, and ensures a consistent error payload on failure.


      const tryFunction = async (id, fnCall) => {
        try {
          const result = await runFunction(server, handlers, fnCall);

          if (typeof result === 'undefined') {
            return batchError(id, `Function ${fnCall.functionName} did not return anything.`);
          }

          return {
            id,
            statusCode: 200,
            result
          };
        } catch (err) {
          if (_boom.default.isBoom(err)) {
            return batchError(id, err.output.payload, err.statusCode);
          } else if (err instanceof Error) {
            return batchError(id, err.message);
          }

          server.log(['interpreter', 'error'], err);
          return batchError(id, 'See server logs for details.');
        }
      }; // Process each function individually, and stream the responses back to the client


      await Promise.all(functions.map(({
        id,
        ...fnCall
      }) => tryFunction(id, fnCall).then(streamResult))); // All of the responses have been written, so we can close the response.

      res.end();
    }

  });
}
/**
 * A helper function for bundling up errors.
 */


function batchError(id, message, statusCode = 500) {
  return {
    id,
    statusCode,
    result: {
      statusCode,
      message
    }
  };
}
/**
 * Register the endpoint that returns the list of server-only functions.
 * @param {*} server - The Kibana server
 */


function getServerFunctions(server) {
  server.route({
    method: 'GET',
    path: `${_constants.API_ROUTE}/fns`,

    handler() {
      return server.plugins.interpreter.registries().serverFunctions.toJS();
    }

  });
}
/**
 * Run a single Canvas function.
 *
 * @param {*} server - The Kibana server object
 * @param {*} handlers - The Canvas handlers
 * @param {*} fnCall - Describes the function being run `{ functionName, args, context }`
 */


async function runFunction(server, handlers, fnCall) {
  const registries = server.plugins.interpreter.registries();
  const {
    functionName,
    args,
    context
  } = fnCall;
  const types = registries.types.toJS();
  const {
    deserialize
  } = (0, _serialize.serializeProvider)(types);
  const fnDef = registries.serverFunctions.toJS()[functionName];

  if (!fnDef) {
    throw _boom.default.notFound(`Function "${functionName}" could not be found.`);
  }

  return fnDef.fn(deserialize(context), args, handlers);
}