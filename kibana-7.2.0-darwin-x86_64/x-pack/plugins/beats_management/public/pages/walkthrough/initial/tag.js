"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
const lodash_1 = require("lodash");
const react_2 = tslib_1.__importStar(require("react"));
const v4_1 = tslib_1.__importDefault(require("uuid/v4"));
const tag_edit_1 = require("../../../components/tag/tag_edit");
class InitialTagPage extends react_2.Component {
    constructor(props) {
        super(props);
        this.loadTag = async () => {
            const tags = await this.props.libs.tags.getTagsWithIds([this.state.tag.id]);
            if (tags.length > 0) {
                this.setState({
                    tag: tags[0],
                });
            }
        };
        this.saveTag = async () => {
            const newTag = await this.props.libs.tags.upsertTag(this.state.tag);
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
            this.props.setUrlState({
                createdTag: newTag.id,
            });
            this.props.goTo(`/walkthrough/initial/finish`);
        };
        this.state = {
            tag: {
                id: v4_1.default(),
                name: '',
                color: '#DD0A73',
                hasConfigurationBlocksTypes: [],
            },
            configuration_blocks: [],
            currentConfigPage: 0,
        };
        if (props.urlState.createdTag) {
            this.loadTag();
        }
    }
    render() {
        const blockStartingIndex = this.state.currentConfigPage * 5;
        return (react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement(tag_edit_1.TagEdit, { tag: this.state.tag, configuration_blocks: {
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
            react_2.default.createElement(eui_1.EuiFlexGroup, null,
                react_2.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_2.default.createElement(eui_1.EuiButton, { fill: true, disabled: this.state.tag.name.search(/^[A-Za-z0-9? ,_-]+$/) === -1 ||
                            this.state.tag.name === '' ||
                            this.state.configuration_blocks.length === 0, onClick: this.saveTag },
                        react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.beatsManagement.createTag.saveAndContinueButtonLabel", defaultMessage: "Save & Continue" }))))));
    }
}
exports.InitialTagPage = InitialTagPage;
