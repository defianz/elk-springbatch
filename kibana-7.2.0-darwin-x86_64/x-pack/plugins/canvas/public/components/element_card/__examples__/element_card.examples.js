"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_2 = require("@storybook/react");
const addon_actions_1 = require("@storybook/addon-actions");
const element_card_1 = require("../element_card");
const elastic_logo_1 = require("../../../lib/elastic_logo");
react_2.storiesOf('components/ElementCard', module)
    .addDecorator(story => (react_1.default.createElement("div", { style: {
        width: '210px',
    } }, story())))
    .add('with title and description', () => (react_1.default.createElement(element_card_1.ElementCard, { title: "Element 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis aliquet arcu ut turpis duis." })))
    .add('with image', () => (react_1.default.createElement(element_card_1.ElementCard, { title: "Element 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis aliquet arcu ut turpis duis.", image: elastic_logo_1.elasticLogo })))
    .add('with tags', () => (react_1.default.createElement(element_card_1.ElementCard, { title: "Element 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis aliquet arcu ut turpis duis.", tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'], onClick: addon_actions_1.action('onClick') })))
    .add('with click handler', () => (react_1.default.createElement(element_card_1.ElementCard, { title: "Element 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis aliquet arcu ut turpis duis.", onClick: addon_actions_1.action('onClick') })));
