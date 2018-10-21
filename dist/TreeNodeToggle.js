"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TreeNodeToggleStyles = _interopRequireDefault(require("./TreeNodeToggleStyles"));

var _TreeViewDefaultTemplates = require("./TreeViewDefaultTemplates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var TreeNodeToggle =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TreeNodeToggle, _React$Component);

  function TreeNodeToggle(props) {
    var _this;

    _classCallCheck(this, TreeNodeToggle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeNodeToggle).call(this, props));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(TreeNodeToggle, [{
    key: "onClick",
    value: function onClick(e) {
      e.stopPropagation();
      this.props.setToggling(this.props.node);
    }
  }, {
    key: "renderToggle",
    value: function renderToggle() {
      var _this$props = this.props,
          template = _this$props.template,
          node = _this$props.node;
      return template ? template(node) : (0, _TreeViewDefaultTemplates.defaultToggle)(node);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        onClick: this.onClick,
        style: _TreeNodeToggleStyles.default.wrapper
      }, this.renderToggle());
    }
  }]);

  return TreeNodeToggle;
}(_react.default.Component);

var _default = TreeNodeToggle;
exports.default = _default;