"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _constants = require("./constants.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function getTooltipPositionStyle(tooltipPosition) {
  if (!tooltipPosition) {
    return _styledComponents.css`
      left: -100px;
      top: -100px;
    `;
  }

  if (tooltipPosition.tooltipTop) {
    return _styledComponents.css`
      left: ${tooltipPosition.tooltipLeft}px;
      top: ${tooltipPosition.tooltipTop}px;
    `;
  } else {
    return _styledComponents.css`
      left: ${tooltipPosition.tooltipLeft}px;
      bottom: ${tooltipPosition.tooltipBottom}px;
    `;
  }
}

const TooltipContainer = _styledComponents.default.div`
  position: fixed;
  ${props => getTooltipPositionStyle(props.tooltipPosition)}
  min-height: 20px;
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: normal;
  line-height: 14px;
  letter-spacing: 0.73px;
  color: #e1e1e1;
  padding: 7px ${_constants.HORIZONTAL_PADDING}px;
  border-radius: 4px;
  background-color: #2d2d2d;
  border: solid ${_constants.BORDER_WIDTH}px #444444;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.5);
  transition: opacity 0.2s linear, visibility 0s linear 0.2s;
  ${props => props.showTooltip ? _styledComponents.css`
          visibility: visible;
          opacity: 1;
          transition-delay: ${props.delay}ms;
        ` : _styledComponents.css`
          visibility: hidden;
          opacity: 0;
        `}
  z-index: 999;
`;
var _default = TooltipContainer;
exports.default = _default;