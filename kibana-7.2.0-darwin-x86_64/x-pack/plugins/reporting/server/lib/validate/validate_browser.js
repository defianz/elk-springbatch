"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_types_1 = require("../../browsers/browser_types");
/*
 * Validate the Reporting headless browser can launch, and that it can connect
 * to the locally running Kibana instance.
 */
exports.validateBrowser = async (server, browserFactory, logger) => {
    if (browserFactory.type === browser_types_1.CHROMIUM) {
        return browserFactory
            .test({
            viewport: { width: 800, height: 600 },
        }, logger)
            .then((browser) => {
            if (browser && browser.close) {
                browser.close();
            }
            else {
                throw new Error('Could not close browser client handle!');
            }
        });
    }
};
