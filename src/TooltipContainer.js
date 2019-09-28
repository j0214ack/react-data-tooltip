import styled, { css } from 'styled-components';
import { HORIZONTAL_PADDING, BORDER_WIDTH } from './constants.js';

function getTooltipPositionStyle(tooltipPosition) {
  if (!tooltipPosition) {
    return css`
      left: -100px;
      top: -100px;
    `;
  }
  if (tooltipPosition.tooltipTop) {
    return css`
      left: ${tooltipPosition.tooltipLeft}px;
      top: ${tooltipPosition.tooltipTop}px;
    `;
  } else {
    return css`
      left: ${tooltipPosition.tooltipLeft}px;
      bottom: ${tooltipPosition.tooltipBottom}px;
    `;
  }
}

const TooltipContainer = styled.div`
  position: fixed;
  ${props => getTooltipPositionStyle(props.tooltipPosition)}
  min-height: 20px;
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: normal;
  line-height: 14px;
  letter-spacing: 0.73px;
  color: #e1e1e1;
  padding: 7px ${HORIZONTAL_PADDING}px;
  border-radius: 4px;
  background-color: #2d2d2d;
  border: solid ${BORDER_WIDTH}px #444444;
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.5);
  transition: opacity 0.2s linear, visibility 0s linear 0.2s;
  ${props =>
    props.showTooltip
      ? css`
          visibility: visible;
          opacity: 1;
          transition-delay: ${props.delay}ms;
        `
      : css`
          visibility: hidden;
          opacity: 0;
        `}
  z-index: 999;
`;

export default TooltipContainer;
