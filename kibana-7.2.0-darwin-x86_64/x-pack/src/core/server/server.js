"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const elasticsearch_1 = require("./elasticsearch");
const http_1 = require("./http");
const legacy_1 = require("./legacy");
const plugins_1 = require("./plugins");
const elasticsearch_2 = require("./elasticsearch");
const http_2 = require("./http");
const logging_1 = require("./logging");
const dev_1 = require("./dev");
class Server {
    constructor(config$, env, logger) {
        this.config$ = config$;
        this.env = env;
        this.logger = logger;
        this.log = this.logger.get('server');
        this.configService = new config_1.ConfigService(config$, env, logger);
        const core = { configService: this.configService, env, logger };
        this.http = new http_1.HttpService(core);
        this.plugins = new plugins_1.PluginsService(core);
        this.legacy = new legacy_1.LegacyService(core);
        this.elasticsearch = new elasticsearch_1.ElasticsearchService(core);
    }
    async setup() {
        this.log.debug('setting up server');
        const httpSetup = await this.http.setup();
        this.registerDefaultRoute(httpSetup);
        const elasticsearchServiceSetup = await this.elasticsearch.setup();
        const pluginsSetup = await this.plugins.setup({
            elasticsearch: elasticsearchServiceSetup,
            http: httpSetup,
        });
        const coreSetup = {
            elasticsearch: elasticsearchServiceSetup,
            http: httpSetup,
            plugins: pluginsSetup,
        };
        await this.legacy.setup(coreSetup);
        return coreSetup;
    }
    async start() {
        const httpStart = await this.http.start();
        const plugins = await this.plugins.start({});
        const startDeps = {
            http: httpStart,
            plugins,
        };
        await this.legacy.start(startDeps);
        return startDeps;
    }
    async stop() {
        this.log.debug('stopping server');
        await this.legacy.stop();
        await this.plugins.stop();
        await this.elasticsearch.stop();
        await this.http.stop();
    }
    registerDefaultRoute(httpSetup) {
        const router = new http_1.Router('/core');
        router.get({ path: '/', validate: false }, async (req, res) => res.ok({ version: '0.0.1' }));
        httpSetup.registerRouter(router);
    }
    async setupConfigSchemas() {
        const schemas = [
            [elasticsearch_2.config.path, elasticsearch_2.config.schema],
            [logging_1.config.path, logging_1.config.schema],
            [http_2.config.path, http_2.config.schema],
            [plugins_1.config.path, plugins_1.config.schema],
            [dev_1.config.path, dev_1.config.schema],
        ];
        for (const [path, schema] of schemas) {
            await this.configService.setSchema(path, schema);
        }
    }
}
exports.Server = Server;
