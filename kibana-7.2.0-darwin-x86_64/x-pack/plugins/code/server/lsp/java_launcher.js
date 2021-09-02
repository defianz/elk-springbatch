"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const get_port_1 = tslib_1.__importDefault(require("get-port"));
const glob = tslib_1.__importStar(require("glob"));
const os_1 = require("os");
const path_1 = tslib_1.__importDefault(require("path"));
const request_expander_1 = require("./request_expander");
const abstract_launcher_1 = require("./abstract_launcher");
const JAVA_LANG_DETACH_PORT = 2090;
class JavaLauncher extends abstract_launcher_1.AbstractLauncher {
    constructor(targetHost, options, loggerFactory) {
        super('java', targetHost, options, loggerFactory);
        this.targetHost = targetHost;
        this.options = options;
        this.loggerFactory = loggerFactory;
        this.needModuleArguments = true;
    }
    createExpander(proxy, builtinWorkspace, maxWorkspace) {
        return new request_expander_1.RequestExpander(proxy, builtinWorkspace, maxWorkspace, this.options, {
            settings: {
                'java.import.gradle.enabled': this.options.security.enableGradleImport,
                'java.import.maven.enabled': this.options.security.enableMavenImport,
                'java.autobuild.enabled': false,
            },
        });
    }
    startConnect(proxy) {
        proxy.awaitServerConnection().catch(this.log.debug);
    }
    async getPort() {
        if (!this.options.lsp.detach) {
            return await get_port_1.default();
        }
        return JAVA_LANG_DETACH_PORT;
    }
    async getJavaHome(installationPath, log) {
        function findJDK(platform) {
            const JDKFound = glob.sync(`**/jdks/*${platform}/jdk-*`, {
                cwd: installationPath,
            });
            if (!JDKFound.length) {
                log.error('Cannot find Java Home in Bundle installation for ' + platform);
                return undefined;
            }
            return path_1.default.resolve(installationPath, JDKFound[0]);
        }
        let bundledJavaHome;
        // detect platform
        const osPlatform = os_1.platform();
        switch (osPlatform) {
            case 'darwin':
                bundledJavaHome = `${findJDK('osx')}/Contents/Home`;
                break;
            case 'win32':
                bundledJavaHome = `${findJDK('windows')}`;
                break;
            case 'freebsd':
            case 'linux':
                bundledJavaHome = `${findJDK('linux')}`;
                break;
            default:
                log.error('No Bundle JDK defined ' + osPlatform);
        }
        if (this.getSystemJavaHome()) {
            const javaHomePath = this.getSystemJavaHome();
            const javaVersion = await this.getJavaVersion(javaHomePath);
            if (javaVersion > 8) {
                // for JDK's versiob > 8, we need extra arguments as default
                return javaHomePath;
            }
            else if (javaVersion === 8) {
                // JDK's version = 8, needn't extra arguments
                this.needModuleArguments = false;
                return javaHomePath;
            }
            else {
                // JDK's version < 8, use bundled JDK instead, whose version > 8, so need extra arguments as default
            }
        }
        return bundledJavaHome;
    }
    async spawnProcess(installationPath, port, log) {
        const launchersFound = glob.sync('**/plugins/org.eclipse.equinox.launcher_*.jar', {
            cwd: installationPath,
        });
        if (!launchersFound.length) {
            throw new Error('Cannot find language server jar file');
        }
        const javaHomePath = await this.getJavaHome(installationPath, log);
        if (!javaHomePath) {
            throw new Error('Cannot find Java Home');
        }
        const javaPath = path_1.default.resolve(javaHomePath, 'bin', process.platform === 'win32' ? 'java.exe' : 'java');
        const params = [
            '-Declipse.application=org.elastic.jdt.ls.core.id1',
            '-Dosgi.bundles.defaultStartLevel=4',
            '-Declipse.product=org.elastic.jdt.ls.core.product',
            '-Dlog.level=ALL',
            '-Dfile.encoding=utf8',
            '-noverify',
            '-Xmx4G',
            '-jar',
            path_1.default.resolve(installationPath, launchersFound[0]),
            '-configuration',
            this.options.jdtConfigPath,
            '-data',
            this.options.jdtWorkspacePath,
        ];
        if (this.needModuleArguments) {
            params.push('--add-modules=ALL-SYSTEM', '--add-opens', 'java.base/java.util=ALL-UNNAMED', '--add-opens', 'java.base/java.lang=ALL-UNNAMED');
        }
        const p = child_process_1.spawn(javaPath, params, {
            detached: false,
            stdio: 'pipe',
            env: {
                ...process.env,
                CLIENT_HOST: '127.0.0.1',
                CLIENT_PORT: port.toString(),
                JAVA_HOME: javaHomePath,
            },
        });
        p.stdout.on('data', data => {
            log.stdout(data.toString());
        });
        p.stderr.on('data', data => {
            log.stderr(data.toString());
        });
        log.info(`Launch Java Language Server at port ${port.toString()}, pid:${p.pid}, JAVA_HOME:${javaHomePath}`);
        return p;
    }
    // TODO(pcxu): run /usr/libexec/java_home to get all java homes for macOS
    getSystemJavaHome() {
        let javaHome = process.env.JDK_HOME;
        if (!javaHome) {
            javaHome = process.env.JAVA_HOME;
        }
        if (javaHome) {
            javaHome = this.expandHomeDir(javaHome);
            const JAVAC_FILENAME = 'javac' + (process.platform === 'win32' ? '.exe' : '');
            if (fs_1.existsSync(javaHome) && fs_1.existsSync(path_1.default.resolve(javaHome, 'bin', JAVAC_FILENAME))) {
                return javaHome;
            }
        }
        return '';
    }
    getJavaVersion(javaHome) {
        return new Promise((resolve, reject) => {
            child_process_1.execFile(path_1.default.resolve(javaHome, 'bin', process.platform === 'win32' ? 'java.exe' : 'java'), ['-version'], {}, (error, stdout, stderr) => {
                const javaVersion = this.parseMajorVersion(stderr);
                resolve(javaVersion);
            });
        });
    }
    parseMajorVersion(content) {
        let regexp = /version "(.*)"/g;
        let match = regexp.exec(content);
        if (!match) {
            return 0;
        }
        let version = match[1];
        if (version.startsWith('1.')) {
            version = version.substring(2);
        }
        regexp = /\d+/g;
        match = regexp.exec(version);
        let javaVersion = 0;
        if (match) {
            javaVersion = parseInt(match[0], 10);
        }
        return javaVersion;
    }
    expandHomeDir(javaHome) {
        const homeDir = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
        if (!javaHome) {
            return javaHome;
        }
        if (javaHome === '~') {
            return homeDir;
        }
        if (javaHome.slice(0, 2) !== '~/') {
            return javaHome;
        }
        return path_1.default.join(homeDir, javaHome.slice(2));
    }
}
exports.JavaLauncher = JavaLauncher;
