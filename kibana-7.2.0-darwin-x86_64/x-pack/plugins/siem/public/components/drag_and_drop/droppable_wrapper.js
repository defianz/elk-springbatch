"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const ReactDndDropTarget = styled_components_1.default.div `
  transition: background-color 0.7s ease;
  width: 100%;
  height: ${({ height }) => height};
  .flyout-overlay {
    .euiPanel {
      background-color: ${props => props.theme.eui.euiFormBackgroundColor};
    }
  }
  ${props => props.isDraggingOver
    ? `
    .drop-and-provider-timeline {
      &:hover {
        background-color: ${props.theme.eui.euiColorEmptyShade};
      }
    }
  > div.timeline-drop-area-empty {
     background-color: ${props.theme.eui.euiColorLightShade};
  }
  > div.timeline-drop-area {
    background-color: ${props.theme.eui.euiColorLightShade};
    .provider-item-filter-container div:first-child{
      // Override dragNdrop beautiful so we do not have our droppable moving around for no good reason
      transform: none !important;
    }
    .drop-and-provider-timeline {
      display: block !important;
      + div {
        display: none;
      }
    }
  }
  .flyout-overlay {
    .euiPanel {
      background-color: ${props.theme.eui.euiColorLightShade};
    }
    + div {
      // Override dragNdrop beautiful so we do not have our droppable moving around for no good reason
      display: none !important;
    }
  }
  `
    : ''}
  > div.timeline-drop-area {
    .drop-and-provider-timeline {
      display: none;
    }
    & + div {
      // Override dragNdrop beautiful so we do not have our droppable moving around for no good reason
      display: none !important;
    }
  }
`;
exports.DroppableWrapper = recompose_1.pure(({ children, droppableId, height = '100%', isDropDisabled = false, type }) => (React.createElement(react_beautiful_dnd_1.Droppable, { isDropDisabled: isDropDisabled, droppableId: droppableId, direction: 'horizontal', type: type }, (provided, snapshot) => (React.createElement(ReactDndDropTarget, Object.assign({ height: height, innerRef: provided.innerRef }, provided.droppableProps, { isDraggingOver: snapshot.isDraggingOver }),
    children,
    provided.placeholder)))));
