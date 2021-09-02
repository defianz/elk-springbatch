"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConditionalHeaders = ({ job, filteredHeaders, server, }) => {
    const config = server.config();
    const [hostname, port, basePath, protocol] = [
        config.get('xpack.reporting.kibanaServer.hostname') || config.get('server.host'),
        config.get('xpack.reporting.kibanaServer.port') || config.get('server.port'),
        config.get('server.basePath'),
        config.get('xpack.reporting.kibanaServer.protocol') || server.info.protocol,
    ];
    const conditionalHeaders = {
        headers: filteredHeaders,
        conditions: {
            hostname: hostname.toLowerCase(),
            port,
            basePath,
            protocol,
        },
    };
    return { job, conditionalHeaders, server };
};
