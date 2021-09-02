"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var _configSchema = require("@kbn/config-schema");

var _request = require("./request");

var _response = require("./response");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @public */
class Router {
  constructor(path) {
    this.path = path;

    _defineProperty(this, "routes", []);
  }
  /**
   * Register a `GET` request with the router
   */


  get(route, handler) {
    const routeSchemas = this.routeSchemasFromRouteConfig(route, 'GET');
    this.routes.push({
      handler: async (req, responseToolkit) => await this.handle(routeSchemas, req, responseToolkit, handler),
      method: 'GET',
      path: route.path
    });
  }
  /**
   * Register a `POST` request with the router
   */


  post(route, handler) {
    const routeSchemas = this.routeSchemasFromRouteConfig(route, 'POST');
    this.routes.push({
      handler: async (req, responseToolkit) => await this.handle(routeSchemas, req, responseToolkit, handler),
      method: 'POST',
      path: route.path
    });
  }
  /**
   * Register a `PUT` request with the router
   */


  put(route, handler) {
    const routeSchemas = this.routeSchemasFromRouteConfig(route, 'POST');
    this.routes.push({
      handler: async (req, responseToolkit) => await this.handle(routeSchemas, req, responseToolkit, handler),
      method: 'PUT',
      path: route.path
    });
  }
  /**
   * Register a `DELETE` request with the router
   */


  delete(route, handler) {
    const routeSchemas = this.routeSchemasFromRouteConfig(route, 'DELETE');
    this.routes.push({
      handler: async (req, responseToolkit) => await this.handle(routeSchemas, req, responseToolkit, handler),
      method: 'DELETE',
      path: route.path
    });
  }
  /**
   * Returns all routes registered with the this router.
   * @returns List of registered routes.
   */


  getRoutes() {
    return [...this.routes];
  }
  /**
   * Create the schemas for a route
   *
   * @returns Route schemas if `validate` is specified on the route, otherwise
   * undefined.
   */


  routeSchemasFromRouteConfig(route, routeMethod) {
    // The type doesn't allow `validate` to be undefined, but it can still
    // happen when it's used from JavaScript.
    if (route.validate === undefined) {
      throw new Error(`The [${routeMethod}] at [${route.path}] does not have a 'validate' specified. Use 'false' as the value if you want to bypass validation.`);
    }

    return route.validate ? route.validate(_configSchema.schema) : undefined;
  }

  async handle(routeSchemas, request, responseToolkit, handler) {
    let kibanaRequest;

    try {
      kibanaRequest = _request.KibanaRequest.from(request, routeSchemas);
    } catch (e) {
      // TODO Handle failed validation
      return responseToolkit.response({
        error: e.message
      }).code(400);
    }

    try {
      const kibanaResponse = await handler(kibanaRequest, _response.responseFactory);
      let payload = null;

      if (kibanaResponse.payload instanceof Error) {
        // TODO Design an error format
        payload = {
          error: kibanaResponse.payload.message
        };
      } else if (kibanaResponse.payload !== undefined) {
        payload = kibanaResponse.payload;
      }

      return responseToolkit.response(payload).code(kibanaResponse.status);
    } catch (e) {
      // TODO Handle `KibanaResponseError`
      // Otherwise we default to something along the lines of
      return responseToolkit.response({
        error: e.message
      }).code(500);
    }
  }

}

exports.Router = Router;