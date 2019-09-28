"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TooltipContainer = _interopRequireDefault(require("./TooltipContainer.js"));

var _getTooltipPosition = require("./getTooltipPosition.js");

var _constants = require("./constants.js");

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class TooltipViaDataTooltip extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "bindListener", () => {
      document.addEventListener('mouseenter', this.mouseEnterHandler, true);
      document.addEventListener('mouseleave', this.mouseLeaveHandler, true);
    });

    _defineProperty(this, "observeDocumentForTooltipNodeRemoval", () => {
      this.documentObserver = new MutationObserver(mutationList => {
        mutationList.forEach(mutation => {
          if (mutation.type === 'childList') {
            mutation.removedNodes.forEach(removedNode => {
              if (removedNode.querySelector && removedNode.querySelector('[data-tooltip-id]')) {
                removedNode.querySelectorAll('[data-tooltip-id]').forEach(node => {
                  this.removeTooltip(node.dataset.tooltipId);
                });
              }

              if (removedNode.dataset) {
                if (removedNode.dataset.tooltipId) {
                  this.removeTooltip(removedNode.dataset.tooltipId);
                }
              }
            });
          }
        });
      });
      this.documentObserver.observe(document, {
        childList: true,
        subtree: true
      });
    });

    _defineProperty(this, "stopObserveDocument", () => {
      if (this.documentObserver) {
        this.documentObserver.disconnect();
        this.documentObserver = null;
      }
    });

    _defineProperty(this, "unbindListeners", () => {
      document.removeEventListener('mouseenter', this.mouseEnterHandler, true);
      document.removeEventListener('mouseleave', this.mouseLeaveHandler, true);
    });

    _defineProperty(this, "mouseEnterHandler", e => {
      const hasDataTooltip = e.target.dataset.tooltip !== undefined;

      if (hasDataTooltip) {
        const id = e.target.dataset.tooltipId;
        const tooltipText = e.target.dataset.tooltip;
        const tooltipVisible = typeof tooltipText === 'string' && tooltipText !== '';
        const delay = e.target.dataset.tooltipDelay || _constants.DEFAULT_DELAY_TIME;

        if (id && this.state.tooltips.has(id)) {
          this.setTooltipValue(id, {
            tooltipText,
            tooltipVisible,
            delay
          });
        } else {
          this.createTooltip(e.target, {
            tooltipText,
            tooltipVisible,
            delay
          });
        }
      }
    });

    _defineProperty(this, "mouseLeaveHandler", e => {
      const hasDataTooltip = e.target.dataset.tooltip !== undefined;
      const id = e.target.dataset.tooltipId;

      if (hasDataTooltip && id && this.state.tooltips.has(id)) {
        this.setTooltipValue(id, {
          tooltipVisible: false
        });
      }
    });

    _defineProperty(this, "createTooltip", (targetNode, initialValue) => {
      const id = (0, _v.default)();
      targetNode.dataset.tooltipId = id;
      const targetAttributeObserver = this.observeTargetAttributeChange(targetNode);
      const tooltip = {
        tooltipVisible: false,
        targetNode,
        targetAttributeObserver
      };
      const newTooltips = new Map(this.state.tooltips);
      newTooltips.set(id, tooltip);
      this.setState({
        tooltips: newTooltips
      }, () => {
        this.setTooltipValue(id, initialValue);
      });
    });

    _defineProperty(this, "observeTargetAttributeChange", targetNode => {
      const targetAttributeObserver = new MutationObserver(mutationList => {
        mutationList.forEach(mutation => {
          if (mutation.type === 'attributes') {
            const {
              tooltipId,
              tooltip
            } = mutation.target.dataset;

            if (tooltipId) {
              if (typeof tooltip === 'string') {
                this.setTooltipValue(tooltipId, {
                  tooltipText: tooltip,
                  tooltipVisible: tooltip !== ''
                });
              } else {
                this.removeTooltip(tooltipId);
              }
            }
          }
        });
      });
      targetAttributeObserver.observe(targetNode, {
        attributes: true,
        attributeFilter: ['data-tooltip']
      });
      return targetAttributeObserver;
    });

    _defineProperty(this, "setTooltipValue", (id, newValue) => {
      const newTooltips = new Map(this.state.tooltips);
      newTooltips.set(id, { ...newTooltips.get(id),
        ...newValue
      });
      this.setState({
        tooltips: newTooltips
      });
    });

    _defineProperty(this, "removeTooltip", id => {
      const newTooltips = new Map(this.state.tooltips);
      const tooltipToBeRemoved = newTooltips.get(id);

      if (tooltipToBeRemoved) {
        tooltipToBeRemoved.targetAttributeObserver.disconnect();
        tooltipToBeRemoved.targetNode.dataset.tooltipId = undefined;
        newTooltips.delete(id);
        this.setState({
          tooltips: newTooltips
        });
      }
    });

    _defineProperty(this, "getTooltipWidth", text => {
      const fontName = 'Roboto';
      const context = this.canvas.getContext('2d');
      context.font = `12px ${fontName}`;
      const metrics = context.measureText(text);
      const result = metrics.width + _constants.HORIZONTAL_PADDING * 2 + _constants.BORDER_WIDTH * 2;
      return result;
    });

    this.state = {
      tooltips: new Map() // id, value pair

    };
    this.canvas = document.createElement('canvas');
    this.canvas.style.letterSpacing = '0.73px';
  }

  componentDidMount() {
    if (document.readyState === 'complete') {
      this.bindListener();
    } else {
      window.addEventListener('load', () => {
        this.bindListener();
      });
    }

    this.observeDocumentForTooltipNodeRemoval();
  }

  componentWillUnmount() {
    Array.from(this.state.tooltips.entries()).forEach(([id, tooltipInfo]) => {
      tooltipInfo.targetAttributeObserver.disconnect();
    });
    this.unbindListeners();
    this.stopObserveDocument();
  }

  render() {
    return Array.from(this.state.tooltips.entries()).map(([id, tooltipInfo]) => {
      const {
        delay,
        tooltipVisible,
        tooltipText,
        targetNode
      } = tooltipInfo;
      const tooltipWidth = this.getTooltipWidth(tooltipText);
      const tooltipPosition = (0, _getTooltipPosition.getTooltipPositionByTooltipWidthAndTargetNode)(tooltipWidth, targetNode);
      return _react.default.createElement(_TooltipContainer.default, {
        key: id,
        tooltipPosition: tooltipPosition,
        delay: delay,
        showTooltip: tooltipVisible
      }, tooltipText);
    });
  }

}

exports.default = TooltipViaDataTooltip;