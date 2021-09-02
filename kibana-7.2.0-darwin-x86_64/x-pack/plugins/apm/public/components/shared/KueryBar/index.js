"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const lodash_1 = require("lodash");
const eui_1 = require("@elastic/eui");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const react_2 = require("@kbn/i18n/react");
const i18n_1 = require("@kbn/i18n");
const url_helpers_1 = require("../Links/url_helpers");
const KibanaLink_1 = require("../Links/KibanaLink");
// @ts-ignore
const Typeahead_1 = require("./Typeahead");
const kuery_1 = require("../../../services/kuery");
// @ts-ignore
const get_bool_filter_1 = require("./get_bool_filter");
const useLocation_1 = require("../../../hooks/useLocation");
const useUrlParams_1 = require("../../../hooks/useUrlParams");
const history_1 = require("../../../utils/history");
const Container = styled_components_1.default.div `
  margin-bottom: 10px;
`;
function KueryBar() {
    const [state, setState] = react_1.useState({
        indexPattern: null,
        suggestions: [],
        isLoadingIndexPattern: true,
        isLoadingSuggestions: false
    });
    const { urlParams } = useUrlParams_1.useUrlParams();
    const location = useLocation_1.useLocation();
    const apmIndexPatternTitle = chrome_1.default.getInjected('apmIndexPatternTitle');
    const indexPatternMissing = !state.isLoadingIndexPattern && !state.indexPattern;
    let currentRequestCheck;
    react_1.useEffect(() => {
        let didCancel = false;
        async function loadIndexPattern() {
            setState({ ...state, isLoadingIndexPattern: true });
            const indexPattern = await kuery_1.getAPMIndexPatternForKuery();
            if (didCancel) {
                return;
            }
            if (!indexPattern) {
                setState({ ...state, isLoadingIndexPattern: false });
            }
            else {
                setState({ ...state, indexPattern, isLoadingIndexPattern: false });
            }
        }
        loadIndexPattern();
        return () => {
            didCancel = true;
        };
    }, []);
    async function onChange(inputValue, selectionStart) {
        const { indexPattern } = state;
        if (indexPattern === null) {
            return;
        }
        setState({ ...state, suggestions: [], isLoadingSuggestions: true });
        const currentRequest = lodash_1.uniqueId();
        currentRequestCheck = currentRequest;
        const boolFilter = get_bool_filter_1.getBoolFilter(urlParams);
        try {
            const suggestions = (await kuery_1.getSuggestions(inputValue, selectionStart, indexPattern, boolFilter))
                .filter(suggestion => !lodash_1.startsWith(suggestion.text, 'span.'))
                .slice(0, 15);
            if (currentRequest !== currentRequestCheck) {
                return;
            }
            setState({ ...state, suggestions, isLoadingSuggestions: false });
        }
        catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error while fetching suggestions', e);
        }
    }
    function onSubmit(inputValue) {
        const { indexPattern } = state;
        if (indexPattern === null) {
            return;
        }
        try {
            const res = kuery_1.convertKueryToEsQuery(inputValue, indexPattern);
            if (!res) {
                return;
            }
            history_1.history.replace({
                ...location,
                search: url_helpers_1.fromQuery({
                    ...url_helpers_1.toQuery(location.search),
                    kuery: url_helpers_1.legacyEncodeURIComponent(inputValue.trim())
                })
            });
        }
        catch (e) {
            console.log('Invalid kuery syntax'); // eslint-disable-line no-console
        }
    }
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement(Typeahead_1.Typeahead, { disabled: indexPatternMissing, isLoading: state.isLoadingSuggestions, initialValue: urlParams.kuery, onChange: onChange, onSubmit: onSubmit, suggestions: state.suggestions }),
        indexPatternMissing && (react_1.default.createElement(eui_1.EuiCallOut, { style: { display: 'inline-block', marginTop: '10px' }, title: react_1.default.createElement("div", null,
                react_1.default.createElement(react_2.FormattedMessage, { id: "xpack.apm.kueryBar.indexPatternMissingWarningMessage", defaultMessage: "There's no APM index pattern with the title {apmIndexPatternTitle} available. To use the Query bar, please choose to import the APM index pattern via the {setupInstructionsLink}.", values: {
                        apmIndexPatternTitle: `"${apmIndexPatternTitle}"`,
                        setupInstructionsLink: (react_1.default.createElement(KibanaLink_1.KibanaLink, { path: `/home/tutorial/apm` }, i18n_1.i18n.translate('xpack.apm.kueryBar.setupInstructionsLinkLabel', { defaultMessage: 'Setup Instructions' })))
                    } })), color: "warning", iconType: "alert", size: "s" }))));
}
exports.KueryBar = KueryBar;
