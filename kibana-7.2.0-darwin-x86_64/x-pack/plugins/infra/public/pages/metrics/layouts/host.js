"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const types_1 = require("../../../graphql/types");
const lib_1 = require("../../../lib/lib");
const nginx_1 = require("./nginx");
const types_2 = require("./types");
exports.hostLayoutCreator = theme => [
    {
        id: 'hostOverview',
        label: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.layoutLabel', {
            defaultMessage: 'Host',
        }),
        sections: [
            {
                id: types_1.InfraMetric.hostSystemOverview,
                linkToId: 'hostOverview',
                label: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.overviewSection.sectionLabel', {
                    defaultMessage: 'Overview',
                }),
                requires: ['system.cpu', 'system.load', 'system.memory', 'system.network'],
                type: types_2.InfraMetricLayoutSectionType.gauges,
                visConfig: {
                    seriesOverrides: {
                        cpu: {
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.overviewSection.cpuUsageSeriesLabel', {
                                defaultMessage: 'CPU Usage',
                            }),
                            color: theme.eui.euiColorFullShade,
                            formatter: lib_1.InfraFormatterType.percent,
                            gaugeMax: 1,
                        },
                        load: {
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.overviewSection.loadSeriesLabel', {
                                defaultMessage: 'Load (5m)',
                            }),
                            color: theme.eui.euiColorFullShade,
                        },
                        memory: {
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.overviewSection.memoryCapacitySeriesLabel', {
                                defaultMessage: 'Memory Usage',
                            }),
                            color: theme.eui.euiColorFullShade,
                            formatter: lib_1.InfraFormatterType.percent,
                            gaugeMax: 1,
                        },
                        rx: {
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.overviewSection.inboundRXSeriesLabel', {
                                defaultMessage: 'Inbound (RX)',
                            }),
                            color: theme.eui.euiColorFullShade,
                            formatter: lib_1.InfraFormatterType.bits,
                            formatterTemplate: '{{value}}/s',
                        },
                        tx: {
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.overviewSection.outboundTXSeriesLabel', {
                                defaultMessage: 'Outbound (TX)',
                            }),
                            color: theme.eui.euiColorFullShade,
                            formatter: lib_1.InfraFormatterType.bits,
                            formatterTemplate: '{{value}}/s',
                        },
                    },
                },
            },
            {
                id: types_1.InfraMetric.hostCpuUsage,
                label: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.cpuUsageSection.sectionLabel', {
                    defaultMessage: 'CPU Usage',
                }),
                requires: ['system.cpu'],
                type: types_2.InfraMetricLayoutSectionType.chart,
                visConfig: {
                    stacked: true,
                    type: types_2.InfraMetricLayoutVisualizationType.area,
                    formatter: lib_1.InfraFormatterType.percent,
                    bounds: { min: 0, max: 1 },
                    seriesOverrides: {
                        user: { color: theme.eui.euiColorVis0 },
                        system: { color: theme.eui.euiColorVis2 },
                        steal: { color: theme.eui.euiColorVis9 },
                        irq: { color: theme.eui.euiColorVis4 },
                        softirq: { color: theme.eui.euiColorVis6 },
                        iowait: { color: theme.eui.euiColorVis7 },
                        nice: { color: theme.eui.euiColorVis5 },
                    },
                },
            },
            {
                id: types_1.InfraMetric.hostLoad,
                label: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.loadSection.sectionLabel', {
                    defaultMessage: 'Load',
                }),
                requires: ['system.load'],
                type: types_2.InfraMetricLayoutSectionType.chart,
                visConfig: {
                    seriesOverrides: {
                        load_1m: {
                            color: theme.eui.euiColorVis0,
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.loadSection.oneMinuteSeriesLabel', {
                                defaultMessage: '1m',
                            }),
                        },
                        load_5m: {
                            color: theme.eui.euiColorVis1,
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.loadSection.fiveMinuteSeriesLabel', {
                                defaultMessage: '5m',
                            }),
                        },
                        load_15m: {
                            color: theme.eui.euiColorVis3,
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.loadSection.fifteenMinuteSeriesLabel', {
                                defaultMessage: '15m',
                            }),
                        },
                    },
                },
            },
            {
                id: types_1.InfraMetric.hostMemoryUsage,
                label: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.memoryUsageSection.sectionLabel', {
                    defaultMessage: 'Memory Usage',
                }),
                requires: ['system.memory'],
                type: types_2.InfraMetricLayoutSectionType.chart,
                visConfig: {
                    stacked: true,
                    formatter: lib_1.InfraFormatterType.bytes,
                    type: types_2.InfraMetricLayoutVisualizationType.area,
                    seriesOverrides: {
                        used: { color: theme.eui.euiColorVis2 },
                        free: { color: theme.eui.euiColorVis0 },
                        cache: { color: theme.eui.euiColorVis1 },
                    },
                },
            },
            {
                id: types_1.InfraMetric.hostNetworkTraffic,
                label: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.networkTrafficSection.sectionLabel', {
                    defaultMessage: 'Network Traffic',
                }),
                requires: ['system.network'],
                type: types_2.InfraMetricLayoutSectionType.chart,
                visConfig: {
                    formatter: lib_1.InfraFormatterType.bits,
                    formatterTemplate: '{{value}}/s',
                    type: types_2.InfraMetricLayoutVisualizationType.area,
                    seriesOverrides: {
                        rx: {
                            color: theme.eui.euiColorVis1,
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.networkTrafficSection.networkRxRateSeriesLabel', {
                                defaultMessage: 'in',
                            }),
                        },
                        tx: {
                            color: theme.eui.euiColorVis2,
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.hostMetricsLayout.networkTrafficSection.networkTxRateSeriesLabel', {
                                defaultMessage: 'out',
                            }),
                        },
                    },
                },
            },
        ],
    },
    {
        id: 'k8sOverview',
        label: 'Kubernetes',
        sections: [
            {
                id: types_1.InfraMetric.hostK8sOverview,
                linkToId: 'k8sOverview',
                label: i18n_1.i18n.translate('xpack.infra.metricDetailPage.kubernetesMetricsLayout.overviewSection.sectionLabel', {
                    defaultMessage: 'Overview',
                }),
                requires: ['kubernetes.node'],
                type: types_2.InfraMetricLayoutSectionType.gauges,
                visConfig: {
                    seriesOverrides: {
                        cpucap: {
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.kubernetesMetricsLayout.overviewSection.cpuUsageSeriesLabel', {
                                defaultMessage: 'CPU Capacity',
                            }),
                            color: 'secondary',
                            formatter: lib_1.InfraFormatterType.percent,
                            gaugeMax: 1,
                        },
                        load: {
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.kubernetesMetricsLayout.overviewSection.loadSeriesLabel', {
                                defaultMessage: 'Load (5m)',
                            }),
                            color: 'secondary',
                        },
                        memorycap: {
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.kubernetesMetricsLayout.overviewSection.memoryUsageSeriesLabel', {
                                defaultMessage: 'Memory Capacity',
                            }),
                            color: 'secondary',
                            formatter: lib_1.InfraFormatterType.percent,
                            gaugeMax: 1,
                        },
                        podcap: {
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.kubernetesMetricsLayout.overviewSection.podCapacitySeriesLabel', {
                                defaultMessage: 'Pod Capacity',
                            }),
                            color: 'secondary',
                            formatter: lib_1.InfraFormatterType.percent,
                            gaugeMax: 1,
                        },
                        diskcap: {
                            name: i18n_1.i18n.translate('xpack.infra.metricDetailPage.kubernetesMetricsLayout.overviewSection.diskCapacitySeriesLabel', {
                                defaultMessage: 'Disk Capacity',
                            }),
                            color: 'secondary',
                            formatter: lib_1.InfraFormatterType.percent,
                            gaugeMax: 1,
                        },
                    },
                },
            },
            {
                id: types_1.InfraMetric.hostK8sCpuCap,
                label: i18n_1.i18n.translate('xpack.infra.metricDetailPage.kubernetesMetricsLayout.nodeCpuCapacitySection.sectionLabel', {
                    defaultMessage: 'Node CPU Capacity',
                }),
                requires: ['kubernetes.node'],
                type: types_2.InfraMetricLayoutSectionType.chart,
                visConfig: {
                    formatter: lib_1.InfraFormatterType.abbreviatedNumber,
                    seriesOverrides: {
                        capacity: { color: theme.eui.euiColorVis2 },
                        used: { color: theme.eui.euiColorVis1, type: types_2.InfraMetricLayoutVisualizationType.area },
                    },
                },
            },
            {
                id: types_1.InfraMetric.hostK8sMemoryCap,
                label: i18n_1.i18n.translate('xpack.infra.metricDetailPage.kubernetesMetricsLayout.nodeMemoryCapacitySection.sectionLabel', {
                    defaultMessage: 'Node Memory Capacity',
                }),
                requires: ['kubernetes.node'],
                type: types_2.InfraMetricLayoutSectionType.chart,
                visConfig: {
                    formatter: lib_1.InfraFormatterType.bytes,
                    seriesOverrides: {
                        capacity: { color: theme.eui.euiColorVis2 },
                        used: { color: theme.eui.euiColorVis1, type: types_2.InfraMetricLayoutVisualizationType.area },
                    },
                },
            },
            {
                id: types_1.InfraMetric.hostK8sDiskCap,
                label: i18n_1.i18n.translate('xpack.infra.metricDetailPage.kubernetesMetricsLayout.nodeDiskCapacitySection.sectionLabel', {
                    defaultMessage: 'Node Disk Capacity',
                }),
                requires: ['kubernetes.node'],
                type: types_2.InfraMetricLayoutSectionType.chart,
                visConfig: {
                    formatter: lib_1.InfraFormatterType.bytes,
                    seriesOverrides: {
                        capacity: { color: theme.eui.euiColorVis2 },
                        used: { color: theme.eui.euiColorVis1, type: types_2.InfraMetricLayoutVisualizationType.area },
                    },
                },
            },
            {
                id: types_1.InfraMetric.hostK8sPodCap,
                label: i18n_1.i18n.translate('xpack.infra.metricDetailPage.kubernetesMetricsLayout.nodePodCapacitySection.sectionLabel', {
                    defaultMessage: 'Node Pod Capacity',
                }),
                requires: ['kubernetes.node'],
                type: types_2.InfraMetricLayoutSectionType.chart,
                visConfig: {
                    formatter: lib_1.InfraFormatterType.number,
                    seriesOverrides: {
                        capacity: { color: theme.eui.euiColorVis2 },
                        used: { color: theme.eui.euiColorVis1, type: types_2.InfraMetricLayoutVisualizationType.area },
                    },
                },
            },
        ],
    },
    ...nginx_1.nginxLayoutCreator(theme),
];
