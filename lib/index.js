"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _constants = require("./constants.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n          visibility: hidden;\n          opacity: 0;\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n          visibility: visible;\n          opacity: 1;\n          transition-delay: ", "ms;\n        "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  position: fixed;\n  ", "\n  min-height: 20px;\n  font-family: ", ";\n  font-size: 12px;\n  font-weight: normal;\n  line-height: 14px;\n  letter-spacing: 0.73px;\n  color: #e1e1e1;\n  padding: 7px ", "px;\n  border-radius: 4px;\n  background-color: #2d2d2d;\n  border: solid ", "px #444444;\n  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.5);\n  transition: opacity 0.2s linear, visibility 0s linear 0.2s;\n  ", "\n  z-index: 999;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n      left: ", "px;\n      bottom: ", "px;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n      left: ", "px;\n      top: ", "px;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      left: -100px;\n      top: -100px;\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function getTooltipPositionStyle(tooltipPosition) {
  if (!tooltipPosition) {
    return (0, _styledComponents.css)(_templateObject());
  }

  if (tooltipPosition.tooltipTop) {
    return (0, _styledComponents.css)(_templateObject2(), tooltipPosition.tooltipLeft, tooltipPosition.tooltipTop);
  } else {
    return (0, _styledComponents.css)(_templateObject3(), tooltipPosition.tooltipLeft, tooltipPosition.tooltipBottom);
  }
}

var TooltipContainer = _styledComponents["default"].div(_templateObject4(), function (props) {
  return getTooltipPositionStyle(props.tooltipPosition);
}, BUILD_LANG === 'en' ? 'Roboto' : 'SourceHanSans', _constants.HORIZONTAL_PADDING, _constants.BORDER_WIDTH, function (props) {
  return props.showTooltip ? (0, _styledComponents.css)(_templateObject5(), props.delay) : (0, _styledComponents.css)(_templateObject6());
});

var _default = TooltipContainer;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BORDER_WIDTH = exports.HORIZONTAL_PADDING = exports.DEFAULT_DELAY_TIME = void 0;
var DEFAULT_DELAY_TIME = 1000; // styles

exports.DEFAULT_DELAY_TIME = DEFAULT_DELAY_TIME;
var HORIZONTAL_PADDING = 17;
exports.HORIZONTAL_PADDING = HORIZONTAL_PADDING;
var BORDER_WIDTH = 1;
exports.BORDER_WIDTH = BORDER_WIDTH;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTooltipPositionByTooltipWidthAndTargetNode = getTooltipPositionByTooltipWidthAndTargetNode;
var DEFAULT_VERTICAL_MARGIN_TO_TARGET = 5;
var DEFAULT_MINIMUM_MARGIN_TO_VIEW_PORT = 10;

function getTooltipPositionByTooltipWidthAndTargetNode(tooltipWidth, targetNode) {
  if (!tooltipWidth || !targetNode) {
    return {
      tooltipLeft: -100,
      tooltipTop: -100
    };
  }

  var tooltipLeft;
  var tooltipTop;
  var tooltipBottom;
  /* 
    Note: 
    getBoudingClientRect top, left, right, bottom values are all relative to top left origin,
    it is different from css absolute bottom and right.
  */

  var _targetNode$getBoundi = targetNode.getBoundingClientRect(),
      targetWidth = _targetNode$getBoundi.width,
      targetLeft = _targetNode$getBoundi.left,
      targetTop = _targetNode$getBoundi.top,
      targetBottom = _targetNode$getBoundi.bottom;

  var viewPortWidth = window.innerWidth;
  var viewPortHeight = window.innerHeight;
  tooltipLeft = targetLeft + targetWidth / 2 - tooltipWidth / 2;
  var tooltipBreaksLeftViewPort = tooltipLeft < DEFAULT_MINIMUM_MARGIN_TO_VIEW_PORT;

  if (tooltipBreaksLeftViewPort) {
    tooltipLeft = DEFAULT_MINIMUM_MARGIN_TO_VIEW_PORT;
  }

  var tooltipBreakRightViewPort = tooltipLeft + tooltipWidth > viewPortWidth - DEFAULT_MINIMUM_MARGIN_TO_VIEW_PORT;

  if (tooltipBreakRightViewPort) {
    tooltipLeft = viewPortWidth - tooltipWidth - DEFAULT_MINIMUM_MARGIN_TO_VIEW_PORT;
  }

  var showTooltipBelow = targetTop < viewPortHeight / 2;

  if (showTooltipBelow) {
    tooltipTop = targetBottom + DEFAULT_VERTICAL_MARGIN_TO_TARGET;
  } else {
    tooltipBottom = viewPortHeight - (targetTop - DEFAULT_VERTICAL_MARGIN_TO_TARGET);
  }

  return {
    tooltipTop: tooltipTop,
    tooltipBottom: tooltipBottom,
    tooltipLeft: tooltipLeft
  };
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _TooltipContainer = _interopRequireDefault(require("./TooltipContainer.js"));

var _getTooltipPosition = require("./getTooltipPosition.js");

var _constants = require("./constants.js");

var _uuid = _interopRequireDefault(require("@next/utils/uuid.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TooltipViaDataTooltip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TooltipViaDataTooltip, _React$Component);

  function TooltipViaDataTooltip(props) {
    var _this;

    _classCallCheck(this, TooltipViaDataTooltip);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TooltipViaDataTooltip).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "bindListener", function () {
      document.addEventListener('mouseenter', _this.mouseEnterHandler, true);
      document.addEventListener('mouseleave', _this.mouseLeaveHandler, true);
    });

    _defineProperty(_assertThisInitialized(_this), "observeDocumentForTooltipNodeRemoval", function () {
      _this.documentObserver = new MutationObserver(function (mutationList) {
        mutationList.forEach(function (mutation) {
          if (mutation.type === 'childList') {
            mutation.removedNodes.forEach(function (removedNode) {
              if (removedNode.querySelector && removedNode.querySelector('[data-tooltip-id]')) {
                removedNode.querySelectorAll('[data-tooltip-id]').forEach(function (node) {
                  _this.removeTooltip(node.dataset.tooltipId);
                });
              }

              if (removedNode.dataset) {
                if (removedNode.dataset.tooltipId) {
                  _this.removeTooltip(removedNode.dataset.tooltipId);
                }
              }
            });
          }
        });
      });

      _this.documentObserver.observe(document, {
        childList: true,
        subtree: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "stopObserveDocument", function () {
      if (_this.documentObserver) {
        _this.documentObserver.disconnect();

        _this.documentObserver = null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "unbindListeners", function () {
      document.removeEventListener('mouseenter', _this.mouseEnterHandler, true);
      document.removeEventListener('mouseleave', _this.mouseLeaveHandler, true);
    });

    _defineProperty(_assertThisInitialized(_this), "mouseEnterHandler", function (e) {
      var hasDataTooltip = e.target.dataset.tooltip !== undefined;

      if (hasDataTooltip) {
        var id = e.target.dataset.tooltipId;
        var tooltipText = e.target.dataset.tooltip;
        var tooltipVisible = typeof tooltipText === 'string' && tooltipText !== '';
        var delay = e.target.dataset.tooltipDelay || _constants.DEFAULT_DELAY_TIME;

        if (id && _this.state.tooltips.has(id)) {
          _this.setTooltipValue(id, {
            tooltipText: tooltipText,
            tooltipVisible: tooltipVisible,
            delay: delay
          });
        } else {
          _this.createTooltip(e.target, {
            tooltipText: tooltipText,
            tooltipVisible: tooltipVisible,
            delay: delay
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "mouseLeaveHandler", function (e) {
      var hasDataTooltip = e.target.dataset.tooltip !== undefined;
      var id = e.target.dataset.tooltipId;

      if (hasDataTooltip && id && _this.state.tooltips.has(id)) {
        _this.setTooltipValue(id, {
          tooltipVisible: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "createTooltip", function (targetNode, initialValue) {
      var id = (0, _uuid["default"])();
      targetNode.dataset.tooltipId = id;

      var targetAttributeObserver = _this.observeTargetAttributeChange(targetNode);

      var tooltip = {
        tooltipVisible: false,
        targetNode: targetNode,
        targetAttributeObserver: targetAttributeObserver
      };
      var newTooltips = new Map(_this.state.tooltips);
      newTooltips.set(id, tooltip);

      _this.setState({
        tooltips: newTooltips
      }, function () {
        _this.setTooltipValue(id, initialValue);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "observeTargetAttributeChange", function (targetNode) {
      var targetAttributeObserver = new MutationObserver(function (mutationList) {
        mutationList.forEach(function (mutation) {
          if (mutation.type === 'attributes') {
            var _mutation$target$data = mutation.target.dataset,
                tooltipId = _mutation$target$data.tooltipId,
                tooltip = _mutation$target$data.tooltip;

            if (tooltipId) {
              if (typeof tooltip === 'string') {
                _this.setTooltipValue(tooltipId, {
                  tooltipText: tooltip,
                  tooltipVisible: tooltip !== ''
                });
              } else {
                _this.removeTooltip(tooltipId);
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

    _defineProperty(_assertThisInitialized(_this), "setTooltipValue", function (id, newValue) {
      var newTooltips = new Map(_this.state.tooltips);
      newTooltips.set(id, _objectSpread({}, newTooltips.get(id), {}, newValue));

      _this.setState({
        tooltips: newTooltips
      });
    });

    _defineProperty(_assertThisInitialized(_this), "removeTooltip", function (id) {
      var newTooltips = new Map(_this.state.tooltips);
      var tooltipToBeRemoved = newTooltips.get(id);

      if (tooltipToBeRemoved) {
        tooltipToBeRemoved.targetAttributeObserver.disconnect();
        tooltipToBeRemoved.targetNode.dataset.tooltipId = undefined;
        newTooltips["delete"](id);

        _this.setState({
          tooltips: newTooltips
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getTooltipWidth", function (text) {
      var fontName = BUILD_LANG === 'en' ? 'Roboto' : 'SourceHanSans';

      var context = _this.canvas.getContext('2d');

      context.font = "12px ".concat(fontName);
      var metrics = context.measureText(text);
      var result = metrics.width + _constants.HORIZONTAL_PADDING * 2 + _constants.BORDER_WIDTH * 2;
      return result;
    });

    _this.state = {
      tooltips: new Map() // id, value pair

    };
    _this.canvas = document.createElement('canvas');
    _this.canvas.style.letterSpacing = '0.73px';
    return _this;
  }

  _createClass(TooltipViaDataTooltip, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (document.readyState === 'complete') {
        this.bindListener();
      } else {
        window.addEventListener('load', function () {
          _this2.bindListener();
        });
      }

      this.observeDocumentForTooltipNodeRemoval();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      Array.from(this.state.tooltips.entries()).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            id = _ref2[0],
            tooltipInfo = _ref2[1];

        tooltipInfo.targetAttributeObserver.disconnect();
      });
      this.unbindListeners();
      this.stopObserveDocument();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return Array.from(this.state.tooltips.entries()).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            id = _ref4[0],
            tooltipInfo = _ref4[1];

        var delay = tooltipInfo.delay,
            tooltipVisible = tooltipInfo.tooltipVisible,
            tooltipText = tooltipInfo.tooltipText,
            targetNode = tooltipInfo.targetNode;

        var tooltipWidth = _this3.getTooltipWidth(tooltipText);

        var tooltipPosition = (0, _getTooltipPosition.getTooltipPositionByTooltipWidthAndTargetNode)(tooltipWidth, targetNode);
        return _react["default"].createElement(_TooltipContainer["default"], {
          key: id,
          tooltipPosition: tooltipPosition,
          delay: delay,
          showTooltip: tooltipVisible
        }, tooltipText);
      });
    }
  }]);

  return TooltipViaDataTooltip;
}(_react["default"].Component);

exports["default"] = TooltipViaDataTooltip;
