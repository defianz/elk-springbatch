"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const events_1 = tslib_1.__importDefault(require("events"));
const net = tslib_1.__importStar(require("net"));
const url_1 = require("url");
const vscode_jsonrpc_1 = require("vscode-jsonrpc");
const main_1 = require("vscode-languageserver-protocol/lib/main");
const main_2 = require("vscode-languageserver/lib/main");
const http_message_reader_1 = require("./http_message_reader");
const http_message_writer_1 = require("./http_message_writer");
const http_request_emitter_1 = require("./http_request_emitter");
const replies_map_1 = require("./replies_map");
const cancelable_1 = require("../utils/cancelable");
class LanguageServerProxy {
    constructor(targetPort, targetHost, logger, lspOptions) {
        this.error = null;
        this.initialized = false;
        this.clientConnection = null;
        this.closed = false;
        this.sequenceNumber = 0;
        this.httpEmitter = new http_request_emitter_1.HttpRequestEmitter();
        this.replies = replies_map_1.createRepliesMap();
        this.eventEmitter = new events_1.default();
        this.connectingPromise = null;
        this.targetHost = targetHost;
        this.targetPort = targetPort;
        this.logger = logger;
        this.lspOptions = lspOptions;
        this.conn = main_2.createConnection(new http_message_reader_1.HttpMessageReader(this.httpEmitter), new http_message_writer_1.HttpMessageWriter(this.replies, logger));
    }
    get isClosed() {
        return this.closed;
    }
    handleRequest(request) {
        return this.receiveRequest(request.method, request.params, request.isNotification);
    }
    receiveRequest(method, params, isNotification = false) {
        if (this.error) {
            return Promise.reject(this.error);
        }
        const message = {
            jsonrpc: '2.0',
            id: this.sequenceNumber++,
            method,
            params,
        };
        return new Promise((resolve, reject) => {
            if (this.lspOptions.verbose) {
                this.logger.info(`emit message ${JSON.stringify(message)}`);
            }
            else {
                this.logger.debug(`emit message ${JSON.stringify(message)}`);
            }
            if (isNotification) {
                // for language server as jdt, notification won't have a response message.
                this.httpEmitter.emit('message', message);
                resolve();
            }
            else {
                this.replies.set(message.id, [resolve, reject]);
                this.httpEmitter.emit('message', message);
            }
        });
    }
    async initialize(clientCapabilities, workspaceFolders, initOptions) {
        if (this.error) {
            throw this.error;
        }
        const clientConn = await this.connect();
        const rootUri = workspaceFolders[0].uri;
        const params = {
            processId: null,
            workspaceFolders,
            rootUri,
            capabilities: clientCapabilities,
            rootPath: url_1.fileURLToPath(rootUri),
        };
        return await clientConn
            .sendRequest('initialize', initOptions ? { ...params, initializationOptions: initOptions } : params)
            .then(r => {
            this.logger.info(`initialized at ${rootUri}`);
            // @ts-ignore
            // TODO fix this
            clientConn.sendNotification(main_1.InitializedNotification.type, {});
            this.initialized = true;
            return r;
        });
    }
    listen() {
        this.conn.onRequest((method, ...params) => {
            if (this.lspOptions.verbose) {
                this.logger.info('received request method: ' + method);
            }
            else {
                this.logger.debug('received request method: ' + method);
            }
            return this.connect().then(clientConn => {
                if (this.lspOptions.verbose) {
                    this.logger.info(`proxy method:${method} to Language Server `);
                }
                else {
                    this.logger.debug(`proxy method:${method} to Language Server `);
                }
                return clientConn.sendRequest(method, ...params);
            });
        });
        this.conn.listen();
    }
    async shutdown() {
        const clientConn = await this.connect();
        this.logger.info(`sending shutdown request`);
        return await clientConn.sendRequest('shutdown');
    }
    /**
     * send a exit request to Language Server
     * https://microsoft.github.io/language-server-protocol/specification#exit
     */
    async exit() {
        this.closed = true; // stop the socket reconnect
        if (this.clientConnection) {
            this.logger.info('sending `shutdown` request to language server.');
            const clientConn = this.clientConnection;
            clientConn.sendRequest('shutdown').then(() => {
                this.conn.dispose();
            });
            this.logger.info('sending `exit` notification to language server.');
            // @ts-ignore
            clientConn.sendNotification(main_1.ExitNotification.type);
        }
        this.eventEmitter.emit('exit');
    }
    awaitServerConnection() {
        // prevent calling this method multiple times which may cause 'port already in use' error
        if (!this.connectingPromise) {
            this.connectingPromise = new cancelable_1.Cancelable((res, rej, onCancel) => {
                const server = net.createServer(socket => {
                    this.initialized = false;
                    server.close();
                    this.eventEmitter.emit('connect');
                    socket.on('close', () => this.onSocketClosed());
                    this.logger.info('langserver connection established on port ' + this.targetPort);
                    const reader = new vscode_jsonrpc_1.SocketMessageReader(socket);
                    const writer = new vscode_jsonrpc_1.SocketMessageWriter(socket);
                    this.clientConnection = vscode_jsonrpc_1.createMessageConnection(reader, writer, this.logger);
                    this.registerOnNotificationHandler(this.clientConnection);
                    this.clientConnection.listen();
                    res(this.clientConnection);
                });
                server.on('error', rej);
                server.listen(this.targetPort, () => {
                    server.removeListener('error', rej);
                    this.logger.info('Wait langserver connection on port ' + this.targetPort);
                });
                onCancel(error => {
                    server.close();
                    rej(error);
                });
            });
        }
        return this.connectingPromise.promise;
    }
    /**
     * get notification when proxy's socket disconnect
     * @param listener
     */
    onDisconnected(listener) {
        this.eventEmitter.on('close', listener);
    }
    onExit(listener) {
        this.eventEmitter.on('exit', listener);
    }
    /**
     * get notification when proxy's socket connect
     * @param listener
     */
    onConnected(listener) {
        this.eventEmitter.on('connect', listener);
    }
    connect() {
        if (this.clientConnection) {
            return Promise.resolve(this.clientConnection);
        }
        this.closed = false;
        if (!this.connectingPromise) {
            this.connectingPromise = new cancelable_1.Cancelable(resolve => {
                this.socket = new net.Socket();
                this.socket.on('connect', () => {
                    const reader = new vscode_jsonrpc_1.SocketMessageReader(this.socket);
                    const writer = new vscode_jsonrpc_1.SocketMessageWriter(this.socket);
                    this.clientConnection = vscode_jsonrpc_1.createMessageConnection(reader, writer, this.logger);
                    this.registerOnNotificationHandler(this.clientConnection);
                    this.clientConnection.listen();
                    resolve(this.clientConnection);
                    this.eventEmitter.emit('connect');
                });
                this.socket.on('close', () => this.onSocketClosed());
                this.socket.on('error', () => void 0);
                this.socket.on('timeout', () => void 0);
                this.socket.on('drain', () => void 0);
                this.socket.connect(this.targetPort, this.targetHost);
            });
        }
        return this.connectingPromise.promise;
    }
    unloadWorkspace(workspaceDir) {
        return Promise.reject('should not hit here');
    }
    onSocketClosed() {
        this.clientConnection = null;
        this.connectingPromise = null;
        this.eventEmitter.emit('close');
    }
    registerOnNotificationHandler(clientConnection) {
        // @ts-ignore
        clientConnection.onNotification(main_1.LogMessageNotification.type, notification => {
            switch (notification.type) {
                case main_1.MessageType.Log:
                    this.logger.debug(notification.message);
                    break;
                case main_1.MessageType.Info:
                    if (this.lspOptions.verbose) {
                        this.logger.info(notification.message);
                    }
                    else {
                        this.logger.debug(notification.message);
                    }
                    break;
                case main_1.MessageType.Warning:
                    if (this.lspOptions.verbose) {
                        this.logger.warn(notification.message);
                    }
                    else {
                        this.logger.log(notification.message);
                    }
                    break;
                case main_1.MessageType.Error:
                    if (this.lspOptions.verbose) {
                        this.logger.error(notification.message);
                    }
                    else {
                        this.logger.warn(notification.message);
                    }
                    break;
            }
        });
    }
    changePort(port) {
        if (port !== this.targetPort) {
            this.targetPort = port;
            if (this.connectingPromise) {
                this.connectingPromise.cancel();
                this.connectingPromise = null;
            }
        }
    }
    setError(error) {
        if (this.connectingPromise) {
            this.connectingPromise.cancel(error);
            this.connectingPromise = null;
        }
        this.error = error;
    }
}
exports.LanguageServerProxy = LanguageServerProxy;
