"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
var _a;
"use strict";
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const react_3 = require("ui/capabilities/react");
const eui_styled_components_1 = tslib_1.__importStar(require("../../../../../common/eui_styled_components"));
const errors_1 = require("../../../common/errors");
const auto_sizer_1 = require("../../components/auto_sizer");
const document_title_1 = require("../../components/document_title");
const header_1 = require("../../components/header");
const metrics_1 = require("../../components/metrics");
const invalid_node_1 = require("../../components/metrics/invalid_node");
const side_nav_1 = require("../../components/metrics/side_nav");
const time_controls_1 = require("../../components/metrics/time_controls");
const page_1 = require("../../components/page");
const source_configuration_1 = require("../../components/source_configuration");
const with_metadata_1 = require("../../containers/metadata/with_metadata");
const with_metrics_1 = require("../../containers/metrics/with_metrics");
const with_metrics_time_1 = require("../../containers/metrics/with_metrics_time");
const with_source_1 = require("../../containers/with_source");
const error_1 = require("../error");
const layouts_1 = require("./layouts");
const page_providers_1 = require("./page_providers");
const DetailPageContent = eui_styled_components_1.default(page_1.PageContent) `
  overflow: auto;
  background-color: ${props => props.theme.eui.euiColorLightestShade};
`;
const EuiPageContentWithRelative = eui_styled_components_1.default(eui_1.EuiPageContent) `
  position: relative;
`;
exports.MetricDetail = react_3.injectUICapabilities(eui_styled_components_1.withTheme(react_1.injectI18n((_a = class extends react_2.default.PureComponent {
        constructor() {
            super(...arguments);
            this.handleClick = (section) => () => {
                const id = section.linkToId || section.id;
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView();
                }
            };
        }
        render() {
            const { intl, uiCapabilities } = this.props;
            const nodeId = this.props.match.params.node;
            const nodeType = this.props.match.params.type;
            const layoutCreator = layouts_1.layoutCreators[nodeType];
            if (!layoutCreator) {
                return (react_2.default.createElement(error_1.Error, { message: intl.formatMessage({
                        id: 'xpack.infra.metricDetailPage.invalidNodeTypeErrorMessage',
                        defaultMessage: '{nodeType} is not a valid node type',
                    }, {
                        nodeType: `"${nodeType}"`,
                    }) }));
            }
            const layouts = layoutCreator(this.props.theme);
            return (react_2.default.createElement(page_providers_1.MetricDetailPageProviders, null,
                react_2.default.createElement(with_source_1.WithSource, null, ({ sourceId }) => (react_2.default.createElement(with_metrics_time_1.WithMetricsTime, null, ({ timeRange, setTimeRange, refreshInterval, setRefreshInterval, isAutoReloading, setAutoReload, }) => (react_2.default.createElement(with_metadata_1.WithMetadata, { layouts: layouts, sourceId: sourceId, nodeType: nodeType, nodeId: nodeId }, ({ name, filteredLayouts, loading: metadataLoading }) => {
                    const breadcrumbs = [
                        {
                            href: '#/',
                            text: intl.formatMessage({
                                id: 'xpack.infra.header.infrastructureTitle',
                                defaultMessage: 'Infrastructure',
                            }),
                        },
                        { text: name },
                    ];
                    return (react_2.default.createElement(page_1.ColumnarPage, null,
                        react_2.default.createElement(header_1.Header, { breadcrumbs: breadcrumbs, readOnlyBadge: !uiCapabilities.infrastructure.save }),
                        react_2.default.createElement(source_configuration_1.SourceConfigurationFlyout, { shouldAllowEdit: uiCapabilities.infrastructure.configureSource }),
                        react_2.default.createElement(with_metrics_time_1.WithMetricsTimeUrlState, null),
                        react_2.default.createElement(document_title_1.DocumentTitle, { title: intl.formatMessage({
                                id: 'xpack.infra.metricDetailPage.documentTitle',
                                defaultMessage: 'Infrastructure | Metrics | {name}',
                            }, {
                                name,
                            }) }),
                        react_2.default.createElement(DetailPageContent, { "data-test-subj": "infraMetricsPage" },
                            react_2.default.createElement(with_metrics_1.WithMetrics, { layouts: filteredLayouts, sourceId: sourceId, timerange: timeRange, nodeType: nodeType, nodeId: nodeId }, ({ metrics, error, loading, refetch }) => {
                                if (error) {
                                    const invalidNodeError = error.graphQLErrors.some((err) => err.code === errors_1.InfraMetricsErrorCodes.invalid_node);
                                    return (react_2.default.createElement(react_2.default.Fragment, null,
                                        react_2.default.createElement(document_title_1.DocumentTitle, { title: (previousTitle) => intl.formatMessage({
                                                id: 'xpack.infra.metricDetailPage.documentTitleError',
                                                defaultMessage: '{previousTitle} | Uh oh',
                                            }, {
                                                previousTitle,
                                            }) }),
                                        invalidNodeError ? (react_2.default.createElement(invalid_node_1.InvalidNodeError, { nodeName: name })) : (react_2.default.createElement(error_1.ErrorPageBody, { message: error.message }))));
                                }
                                return (react_2.default.createElement(eui_1.EuiPage, { style: { flex: '1 0 auto' } },
                                    react_2.default.createElement(side_nav_1.MetricsSideNav, { layouts: filteredLayouts, loading: metadataLoading, nodeName: name, handleClick: this.handleClick }),
                                    react_2.default.createElement(auto_sizer_1.AutoSizer, { content: false, bounds: true, detectAnyWindowResize: true }, ({ measureRef, bounds: { width = 0 } }) => {
                                        return (react_2.default.createElement(MetricsDetailsPageColumn, { innerRef: measureRef },
                                            react_2.default.createElement(eui_1.EuiPageBody, { style: { width: `${width}px` } },
                                                react_2.default.createElement(eui_1.EuiPageHeader, { style: { flex: '0 0 auto' } },
                                                    react_2.default.createElement(eui_1.EuiPageHeaderSection, { style: { width: '100%' } },
                                                        react_2.default.createElement(MetricsTitleTimeRangeContainer, null,
                                                            react_2.default.createElement(eui_1.EuiHideFor, { sizes: ['xs', 's'] },
                                                                react_2.default.createElement(eui_1.EuiTitle, { size: "m" },
                                                                    react_2.default.createElement("h1", null, name))),
                                                            react_2.default.createElement(time_controls_1.MetricsTimeControls, { currentTimeRange: timeRange, isLiveStreaming: isAutoReloading, refreshInterval: refreshInterval, setRefreshInterval: setRefreshInterval, onChangeTimeRange: setTimeRange, setAutoReload: setAutoReload })))),
                                                react_2.default.createElement(EuiPageContentWithRelative, null,
                                                    react_2.default.createElement(metrics_1.Metrics, { label: name, nodeId: nodeId, layouts: filteredLayouts, metrics: metrics, loading: metrics.length > 0 && isAutoReloading
                                                            ? false
                                                            : loading, refetch: refetch, onChangeRangeTime: setTimeRange, isLiveStreaming: isAutoReloading, stopLiveStreaming: () => setAutoReload(false) })))));
                                    })));
                            }))));
                })))))));
        }
    },
    _a.displayName = 'MetricDetailPage',
    _a))));
const MetricsDetailsPageColumn = eui_styled_components_1.default.div `
  flex: 1 0 0%;
  display: flex;
  flex-direction: column;
`;
const MetricsTitleTimeRangeContainer = eui_styled_components_1.default.div `
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
