"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
require("brace/mode/yaml");
require("brace/theme/github");
const lodash_1 = require("lodash");
const react_2 = tslib_1.__importDefault(require("react"));
const constants_1 = require("../../../common/constants");
const primary_1 = require("../../components/layouts/primary");
const tag_1 = require("../../components/tag");
class TagEditPageComponent extends react_2.default.PureComponent {
    constructor(props) {
        super(props);
        this.loadConfigBlocks = async (page = -1) => {
            const blocksResponse = await this.props.libs.configBlocks.getForTags([this.state.tag.id], page);
            this.setState({
                configuration_blocks: blocksResponse,
            });
        };
        this.loadTag = async () => {
            const tags = await this.props.libs.tags.getTagsWithIds([this.props.match.params.tagid]);
            if (tags.length === 0) {
                // TODO do something to error https://github.com/elastic/kibana/issues/26023
            }
            this.setState({
                tag: tags[0],
            });
        };
        this.loadAttachedBeats = async () => {
            const beats = await this.props.libs.beats.getBeatsWithTag(this.props.match.params.tagid);
            const beatsTags = await this.props.libs.tags.getTagsWithIds(lodash_1.flatten(beats.map(beat => beat.tags)));
            this.setState({
                attachedBeats: beats,
                beatsTags,
            });
        };
        this.saveTag = async () => {
            await this.props.containers.tags.upsertTag(this.state.tag);
            this.props.goTo(`/overview/configuration_tags`);
        };
        this.getNumExclusiveConfigurationBlocks = () => this.state.configuration_blocks.list
            .map(({ type }) => constants_1.UNIQUENESS_ENFORCING_TYPES.some(uniqueType => uniqueType === type))
            .reduce((acc, cur) => (cur ? acc + 1 : acc), 0);
        this.state = {
            showFlyout: false,
            attachedBeats: null,
            beatsTags: [],
            tag: {
                id: props.match.params.tagid,
                name: '',
                color: '#fff',
                hasConfigurationBlocksTypes: [],
            },
            configuration_blocks: {
                list: [],
                page: 0,
                total: 0,
            },
        };
    }
    componentWillMount() {
        this.loadTag();
        this.loadAttachedBeats();
        this.loadConfigBlocks();
    }
    render() {
        const { intl } = this.props;
        return (react_2.default.createElement(primary_1.PrimaryLayout, { hideBreadcrumbs: this.props.libs.framework.versionGreaterThen('6.7.0'), title: intl.formatMessage({
                id: 'xpack.beatsManagement.tag.updateTagTitle',
                defaultMessage: 'Update Tag: {tagId}',
            }, {
                tagId: this.state.tag.id,
            }) },
            react_2.default.createElement("div", null,
                react_2.default.createElement(tag_1.TagEdit, { tag: this.state.tag, configuration_blocks: this.state.configuration_blocks, onDetachBeat: async (beatIds) => {
                        await this.props.containers.beats.removeTagsFromBeats(beatIds, this.state.tag.id);
                        await this.loadAttachedBeats();
                    }, onTagChange: (field, value) => this.setState(oldState => ({
                        tag: { ...oldState.tag, [field]: value },
                    })), attachedBeats: (this.state.attachedBeats || []).map(beat => ({
                        ...beat,
                        tags: lodash_1.flatten(beat.tags.map(tagId => this.state.beatsTags.filter(tag => tag.id === tagId))),
                    })), onConfigListChange: (index) => {
                        this.loadConfigBlocks(index);
                    }, onConfigAddOrEdit: (block) => {
                        this.props.libs.configBlocks
                            .upsert([{ ...block, tag: this.state.tag.id }])
                            .catch((e) => {
                            // eslint-disable-next-line
                            console.error('Error upseting config block', e);
                        })
                            .then(() => {
                            this.loadConfigBlocks(this.state.configuration_blocks.page);
                        });
                    }, onConfigRemoved: (block) => {
                        this.props.libs.configBlocks
                            .delete(block.id)
                            .catch((e) => {
                            alert('Error removing block, please check your browsers console logs for more details');
                            // eslint-disable-next-line
                            console.error(`Error removing block ${block.id}`, e);
                        })
                            .then(() => {
                            this.loadConfigBlocks(this.state.configuration_blocks.page);
                        });
                    } }),
                react_2.default.createElement(eui_1.EuiSpacer, { size: "m" }),
                react_2.default.createElement(eui_1.EuiFlexGroup, null,
                    react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_2.default.createElement(eui_1.EuiButton, { fill: true, disabled: this.state.tag.id.search(/^[A-Za-z0-9? ,_-]+$/) === -1 ||
                                this.state.tag.id === '' ||
                                this.getNumExclusiveConfigurationBlocks() > 1 // || this.state.tag.configuration_blocks.length === 0
                            , onClick: this.saveTag },
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.beatsManagement.tag.saveButtonLabel", defaultMessage: "Save" }))),
                    react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_2.default.createElement(eui_1.EuiButtonEmpty, { onClick: () => this.props.goTo('/overview/configuration_tags') },
                            react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.beatsManagement.tag.cancelButtonLabel", defaultMessage: "Cancel" })))))));
    }
}
exports.TagEditPage = react_1.injectI18n(TagEditPageComponent);
