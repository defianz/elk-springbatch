"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = tslib_1.__importStar(require("react"));
const react_2 = require("@kbn/i18n/react");
const eui_1 = require("@elastic/eui");
const create_tsvb_link_1 = require("./helpers/create_tsvb_link");
exports.MetricsExplorerChartContextMenu = react_2.injectI18n(({ intl, onFilter, options, series, source, timeRange }) => {
    const [isPopoverOpen, setPopoverState] = react_1.useState(false);
    const supportFiltering = options.groupBy != null && onFilter != null;
    const handleFilter = react_1.useCallback(() => {
        // onFilter needs check for Typescript even though it's
        // covered by supportFiltering variable
        if (supportFiltering && onFilter) {
            onFilter(`${options.groupBy}: "${series.id}"`);
        }
        setPopoverState(false);
    }, [supportFiltering, options.groupBy, series.id, onFilter]);
    const tsvbUrl = create_tsvb_link_1.createTSVBLink(source, options, series, timeRange);
    // Only display the "Add Filter" option if it's supported
    const filterByItem = supportFiltering
        ? [
            {
                name: intl.formatMessage({
                    id: 'xpack.infra.metricsExplorer.filterByLabel',
                    defaultMessage: 'Add Filter',
                }),
                icon: 'infraApp',
                onClick: handleFilter,
            },
        ]
        : [];
    const panels = [
        {
            id: 0,
            title: 'Actions',
            items: [
                ...filterByItem,
                {
                    name: intl.formatMessage({
                        id: 'xpack.infra.metricsExplorer.openInTSVB',
                        defaultMessage: 'Open in Visualize',
                    }),
                    href: tsvbUrl,
                    icon: 'visualizeApp',
                    disabled: options.metrics.length === 0,
                },
            ],
        },
    ];
    const handleClose = () => setPopoverState(false);
    const handleOpen = () => setPopoverState(true);
    const actionAriaLabel = intl.formatMessage({
        id: 'xpack.infra.metricsExplorer.actionsLabel.aria',
        defaultMessage: 'Actions for {grouping}',
    }, { grouping: series.id });
    const actionLabel = intl.formatMessage({
        id: 'xpack.infra.metricsExplorer.actionsLabel.button',
        defaultMessage: 'Actions',
    });
    const button = (react_1.default.createElement(eui_1.EuiButtonEmpty, { contentProps: { 'aria-label': actionAriaLabel }, onClick: handleOpen, size: "s", iconType: "arrowDown", iconSide: "right" }, actionLabel));
    return (react_1.default.createElement(eui_1.EuiPopover, { closePopover: handleClose, id: `${series.id}-popover`, button: button, isOpen: isPopoverOpen, panelPaddingSize: "none" },
        react_1.default.createElement(eui_1.EuiContextMenu, { initialPanelId: 0, panels: panels })));
});
