"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const url_1 = tslib_1.__importDefault(require("url"));
const uri_util_1 = require("../../../common/uri_util");
const url_2 = require("../../utils/url");
function registerReferencesAction(e, getUrlQuery) {
    e.addAction({
        id: 'editor.action.referenceSearch.trigger',
        label: 'Find All References',
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,
        run(ed) {
            const position = ed.getPosition();
            const { uri } = uri_util_1.parseSchema(ed.getModel().uri.toString());
            const refUrl = `git:/${uri}!L${position.lineNumber - 1}:${position.column - 1}`;
            const queries = url_1.default.parse(getUrlQuery(), true).query;
            const query = querystring_1.default.stringify({
                ...queries,
                tab: 'references',
                refUrl,
            });
            url_2.history.push(`${uri}?${query}`);
        },
    });
}
exports.registerReferencesAction = registerReferencesAction;
