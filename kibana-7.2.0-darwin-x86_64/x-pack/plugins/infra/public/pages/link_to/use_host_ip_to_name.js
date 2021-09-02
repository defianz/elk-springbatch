"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const fetch_1 = require("../../utils/fetch");
exports.useHostIpToName = (ipAddress, indexPattern) => {
    const [error, setError] = react_1.useState(null);
    const [loading, setLoadingState] = react_1.useState(true);
    const [data, setData] = react_1.useState(null);
    react_1.useEffect(() => {
        (async () => {
            setLoadingState(true);
            setError(null);
            try {
                if (ipAddress && indexPattern) {
                    const response = await fetch_1.fetch.post('../api/infra/ip_to_host', {
                        ip: ipAddress,
                        index_pattern: indexPattern,
                    });
                    setLoadingState(false);
                    setData(response.data);
                }
            }
            catch (err) {
                setLoadingState(false);
                setError(err);
            }
        })();
    }, [ipAddress, indexPattern]);
    return { name: (data && data.host) || null, loading, error };
};
