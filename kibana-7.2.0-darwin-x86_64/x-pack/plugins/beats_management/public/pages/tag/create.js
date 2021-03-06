"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_theme_k6_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_k6_light.json"));
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
require("brace/mode/yaml");
require("brace/theme/github");
const lodash_1 = require("lodash");
const react_2 = tslib_1.__importDefault(require("react"));
const configuration_blocks_1 = require("../../../common/constants/configuration_blocks");
const primary_1 = require("../../components/layouts/primary");
const tag_1 = require("../../components/tag");
const random_eui_color_1 = require("../../utils/random_eui_color");
class TagCreatePageComponent extends react_2.default.PureComponent {
    constructor(props) {
        super(props);
        this.saveTag = async () => {
            const newTag = await this.props.containers.tags.upsertTag(this.state.tag);
            if (!newTag) {
                return alert(i18n_1.i18n.translate('xpack.beatsManagement.createTag.errorSavingTagTitle', {
                    defaultMessage: 'error saving tag',
                }));
            }
            const createBlocksResponse = await this.props.libs.configBlocks.upsert(this.state.configuration_blocks.map(block => ({ ...block, tag: this.state.tag.id })));
            const creationError = createBlocksResponse.results.reduce((err, resp) => (!err ? (err = resp.error ? resp.error.message : '') : err), '');
            if (creationError) {
                return alert(creationError);
            }
            this.props.goTo(`/overview/configuration_tags`);
        };
        this.getNumExclusiveConfigurationBlocks = () => this.state.configuration_blocks
            .map(({ type }) => configuration_blocks_1.UNIQUENESS_ENFORCING_TYPES.some(uniqueType => uniqueType === type))
            .reduce((acc, cur) => (cur ? acc + 1 : acc), 0);
        this.state = {
            showFlyout: false,
            currentConfigPage: 0,
            tag: {
                id: '',
                name: '',
                color: random_eui_color_1.randomEUIColor(eui_theme_k6_light_json_1.default),
                hasConfigurationBlocksTypes: [],
            },
            configuration_blocks: [],
        };
    }
    render() {
        const { intl } = this.props;
        const blockStartingIndex = this.state.currentConfigPage * 5;
        return (react_2.default.createElement(primary_1.PrimaryLayout, { hideBreadcrumbs: this.props.libs.framework.versionGreaterThen('6.7.0'), title: intl.formatMessage({
                id: 'xpack.beatsManagement.tag.createTagTitle',
                defaultMessage: 'Create Tag',
            }) },
            react_2.default.createElement("div", null,
                react_2.default.createElement(tag_1.TagEdit, { tag: this.state.tag, configuration_blocks: {
                        list: this.state.configuration_blocks.slice(blockStartingIndex, 5 + blockStartingIndex),
                        page: this.state.currentConfigPage,
                        total: this.state.configuration_blocks.length,
                    }, onTagChange: (field, value) => this.setState(oldState => ({
                        tag: { ...oldState.tag, [field]: value },
                    })), onConfigListChange: (index) => {
                        this.setState({
                            currentConfigPage: index,
                        });
                    }, onConfigAddOrEdit: (block) => {
                        this.setState(previousState => ({
                            configuration_blocks: previousState.configuration_blocks.concat([block]),
                        }));
                    }, onConfigRemoved: (block) => {
                        this.setState(previousState => {
                            const selectedIndex = previousState.configuration_blocks.findIndex(c => {
                                return lodash_1.isEqual(block, c);
                            });
                            const blocks = [...previousState.configuration_blocks];
                            blocks.splice(selectedIndex, 1);
                            return {
                                configuration_blocks: blocks,
                            };
                        });
                    } }),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }),
                react_2.default.createElement(eui_1.EuiFlexGroup, null,
                    react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_2.default.createElement(eui_1.EuiButton, { fill: true, disabled: this.state.tag.name.search(/^[A-Za-z0-9? ,_-]+$/) === -1 ||
                                this.state.tag.name === '' ||
                                this.getNumExclusiveConfigurationBlocks() > 1 // || this.state.tag.configuration_blocks.length === 0
                            , onClick: this.saveTag },
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.beatsManagement.tag.saveButtonLabel", defaultMessage: "Save" }))),
                    react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_2.default.createElement(eui_1.EuiButtonEmpty, { onClick: () => this.props.goTo('/overview/configuration_tags') },
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.beatsManagement.tag.cancelButtonLabel", defaultMessage: "Cancel" })))))));
    }
}
exports.TagCreatePage = react_1.injectI18n(TagCreatePageComponent);
