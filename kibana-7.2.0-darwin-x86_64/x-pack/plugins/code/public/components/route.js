"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const actions_1 = require("../actions");
const url_1 = require("../utils/url");
class CSRoute extends react_router_dom_1.Route {
    // eslint-disable-next-line @typescript-eslint/camelcase
    UNSAFE_componentWillMount() {
        if (this.state.match && this.state.match.params && this.state.match.params.revision) {
            this.state.match.params.revision = url_1.decodeRevisionString(this.state.match.params.revision);
        }
        this.props.routeChange({ ...this.state.match, location: this.props.location });
    }
    componentDidUpdate() {
        if (this.state.match && this.state.match.params && this.state.match.params.revision) {
            this.state.match.params.revision = url_1.decodeRevisionString(this.state.match.params.revision);
        }
        this.props.routeChange({ ...this.state.match, location: this.props.location });
    }
}
exports.Route = react_redux_1.connect(null, { routeChange: actions_1.routeChange })(CSRoute);
