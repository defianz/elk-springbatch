"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
const lodash_1 = require("lodash");
const react_2 = tslib_1.__importDefault(require("react"));
const config_schemas_1 = require("../../../common/config_schemas");
const config_schemas_translations_map_1 = require("../../../common/config_schemas_translations_map");
const constants_1 = require("../../../common/constants");
const breadcrumb_1 = require("../../components/navigation/breadcrumb");
const connected_link_1 = require("../../components/navigation/connected_link");
const tag_1 = require("../../components/tag");
const index_1 = require("../../components/tag/config_view/index");
class BeatDetailPageUi extends react_2.default.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedConfig: null,
            tags: [],
            configuration_blocks: [],
            configurationBlocksPage: 0,
        };
    }
    async componentWillMount() {
        const tags = await this.props.libs.tags.getTagsWithIds(this.props.beat.tags);
        const blocksResult = await this.props.libs.configBlocks.getForTags(this.props.beat.tags, this.state.configurationBlocksPage);
        this.setState({
            configuration_blocks: blocksResult.list,
            tags,
        });
    }
    render() {
        const props = this.props;
        const { beat, intl } = props;
        if (!beat) {
            return (react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.beatsManagement.beat.beatNotFoundErrorTitle", defaultMessage: "Beat not found" }));
        }
        const configurationBlocks = !this.state.configuration_blocks
            ? []
            : this.state.configuration_blocks.map(configuration => ({
                // @ts-ignore one of the types on ConfigurationBlock doesn't define a "module" property
                module: configuration.config.type || null,
                tagId: configuration.tag,
                tagColor: ((this.state.tags || []).find(tag => tag.id === configuration.tag) || {})
                    .color || 'grey',
                tagName: ((this.state.tags || []).find(tag => tag.id === configuration.tag) || {})
                    .name || configuration.tag,
                ...beat,
                ...configuration,
                displayValue: lodash_1.get(config_schemas_translations_map_1.translateConfigSchema(config_schemas_1.configBlockSchemas).find(config => config.id === configuration.type), 'text', null),
            }));
        const columns = [
            {
                field: 'displayValue',
                name: intl.formatMessage({
                    id: 'xpack.beatsManagement.beatConfigurations.typeColumnName',
                    defaultMessage: 'Type',
                }),
                sortable: true,
                render: (value, configuration) => (react_2.default.createElement(eui_1.EuiLink, { onClick: () => {
                        this.setState({
                            selectedConfig: configuration,
                        });
                    } }, value || configuration.type)),
            },
            {
                field: 'module',
                name: intl.formatMessage({
                    id: 'xpack.beatsManagement.beatConfigurations.moduleColumnName',
                    defaultMessage: 'Module',
                }),
                sortable: true,
            },
            {
                field: 'description',
                name: intl.formatMessage({
                    id: 'xpack.beatsManagement.beatConfigurations.descriptionColumnName',
                    defaultMessage: 'Description',
                }),
                sortable: true,
            },
            {
                field: 'tagId',
                name: intl.formatMessage({
                    id: 'xpack.beatsManagement.beatConfigurations.tagColumnName',
                    defaultMessage: 'Tag',
                }),
                render: (id, block) => (react_2.default.createElement(connected_link_1.ConnectedLink, { path: `/tag/edit/${id}` },
                    react_2.default.createElement(tag_1.TagBadge, { maxIdRenderSize: constants_1.TABLE_CONFIG.TRUNCATE_TAG_LENGTH_SMALL, tag: { color: block.tagColor, id, name: block.tagName } }))),
                sortable: true,
            },
        ];
        return (react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement(breadcrumb_1.Breadcrumb, { title: i18n_1.i18n.translate('xpack.beatsManagement.breadcrumb.beatDetails', {
                    defaultMessage: 'Beat details for: {beatId}',
                    values: { beatId: beat.id },
                }), path: `/beat/${beat.id}/details` }),
            react_2.default.createElement(eui_1.EuiSpacer, null),
            react_2.default.createElement(eui_1.EuiFlexGroup, null,
                react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiTitle, { size: "xs" },
                        react_2.default.createElement("h4", null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.beatsManagement.beat.detailsConfigurationTitle", defaultMessage: "Configurations" }))),
                    react_2.default.createElement(eui_1.EuiText, { size: "s" },
                        react_2.default.createElement("p", null,
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.beatsManagement.beat.detailsConfigurationDescription", defaultMessage: "You can have multiple configurations applied to an individual tag. These configurations can repeat\n                    or mix types as necessary. For example, you may utilize three metricbeat configurations alongside one input and\n                    filebeat configuration." })))),
                react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiInMemoryTable, { columns: columns, items: configurationBlocks }))),
            this.state.selectedConfig && (react_2.default.createElement(index_1.ConfigView, { configBlock: this.state.selectedConfig, onClose: () => this.setState({ selectedConfig: null }) }))));
    }
}
exports.BeatDetailPage = react_1.injectI18n(BeatDetailPageUi);
