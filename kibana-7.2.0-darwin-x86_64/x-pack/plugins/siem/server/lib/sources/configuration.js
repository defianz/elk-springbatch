"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigurationSourcesAdapter {
    constructor(configuration) {
        this.configuration = configuration;
    }
    async getAll() {
        const sourceConfigurations = (await this.configuration.get()).sources || {
            default: DEFAULT_SOURCE,
        };
        const sourceConfigurationsWithDefault = {
            ...sourceConfigurations,
            default: {
                ...DEFAULT_SOURCE,
                ...(sourceConfigurations.default || {}),
            },
        };
        return Object.entries(sourceConfigurationsWithDefault).reduce((result, [sourceId, sourceConfiguration]) => ({
            ...result,
            [sourceId]: {
                ...sourceConfiguration,
                fields: {
                    ...DEFAULT_FIELDS,
                    ...(sourceConfiguration.fields || {}),
                },
            },
        }), {});
    }
}
exports.ConfigurationSourcesAdapter = ConfigurationSourcesAdapter;
const DEFAULT_FIELDS = {
    container: 'docker.container.name',
    host: 'beat.hostname',
    message: ['message', '@message'],
    pod: 'kubernetes.pod.name',
    tiebreaker: '_doc',
    timestamp: '@timestamp',
};
const DEFAULT_SOURCE = {
    fields: DEFAULT_FIELDS,
};
