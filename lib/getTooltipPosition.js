"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTooltipPositionByTooltipWidthAndTargetNode = getTooltipPositionByTooltipWidthAndTargetNode;
const DEFAULT_VERTICAL_MARGIN_TO_TARGET = 5;
const DEFAULT_MINIMUM_MARGIN_TO_VIEW_PORT = 10;

function getTooltipPositionByTooltipWidthAndTargetNode(tooltipWidth, targetNode) {
  if (!tooltipWidth || !targetNode) {
    return {
      tooltipLeft: -100,
      tooltipTop: -100
    };
  }

  let tooltipLeft;
  let tooltipTop;
  let tooltipBottom;
  /* 
    Note: 
    getBoudingClientRect top, left, right, bottom values are all relative to top left origin,
    it is different from css absolute bottom and right.
  */

  const {
    width: targetWidth,
    left: targetLeft,
    top: targetTop,
    bottom: targetBottom
  } = targetNode.getBoundingClientRect();
  const viewPortWidth = window.innerWidth;
  const viewPortHeight = window.innerHeight;
  tooltipLeft = targetLeft + targetWidth / 2 - tooltipWidth / 2;
  const tooltipBreaksLeftViewPort = tooltipLeft < DEFAULT_MINIMUM_MARGIN_TO_VIEW_PORT;

  if (tooltipBreaksLeftViewPort) {
    tooltipLeft = DEFAULT_MINIMUM_MARGIN_TO_VIEW_PORT;
  }

  const tooltipBreakRightViewPort = tooltipLeft + tooltipWidth > viewPortWidth - DEFAULT_MINIMUM_MARGIN_TO_VIEW_PORT;

  if (tooltipBreakRightViewPort) {
    tooltipLeft = viewPortWidth - tooltipWidth - DEFAULT_MINIMUM_MARGIN_TO_VIEW_PORT;
  }

  const showTooltipBelow = targetTop < viewPortHeight / 2;

  if (showTooltipBelow) {
    tooltipTop = targetBottom + DEFAULT_VERTICAL_MARGIN_TO_TARGET;
  } else {
    tooltipBottom = viewPortHeight - (targetTop - DEFAULT_VERTICAL_MARGIN_TO_TARGET);
  }

  return {
    tooltipTop,
    tooltipBottom,
    tooltipLeft
  };
}