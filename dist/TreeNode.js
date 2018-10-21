"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TreeNodeContent = _interopRequireDefault(require("./TreeNodeContent"));

var _TreeNodeToggle = _interopRequireDefault(require("./TreeNodeToggle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var TreeNode =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TreeNode, _React$Component);

  function TreeNode(props) {
    var _this;

    _classCallCheck(this, TreeNode);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeNode).call(this, props));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(TreeNode, [{
    key: "onClick",
    value: function onClick(e) {
      e.stopPropagation();
      this.props.selectNewNode(this.props.node);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var style = this.props.style;
      var nodeTextStyles;

      if (style) {
        nodeTextStyles = _objectSpread({}, style.node.default);

        if (this.props.node.$selected) {
          nodeTextStyles = _objectSpread({}, style.node.default, style.node.selected);
        }
      }

      return _react.default.createElement("li", {
        onClick: this.onClick,
        className: "".concat(this.props.node.$selected ? "treeview-selected-node" : '')
      }, _react.default.createElement("div", {
        style: nodeTextStyles || {}
      }, this.props.node.$children && _react.default.createElement(_TreeNodeToggle.default, {
        template: this.props.templates.toggle,
        setToggling: this.props.setToggling,
        node: this.props.node
      }), _react.default.createElement(_TreeNodeContent.default, {
        template: this.props.templates.header,
        node: this.props.node,
        iconsEnabled: this.props.iconsEnabled
      })), this.props.node.$children && this.props.node.$expanded && _react.default.createElement("ul", {
        style: this.props.style.nestedList
      }, this.props.node.$children.map(function (item, idx) {
        return _react.default.createElement(TreeNode, {
          style: _this2.props.style,
          node: item,
          key: idx,
          selectNewNode: _this2.props.selectNewNode,
          setToggling: _this2.props.setToggling,
          iconsEnabled: _this2.props.iconsEnabled,
          templates: _this2.props.templates
        });
      })));
    }
  }]);

  return TreeNode;
}(_react.default.Component);

var _default = TreeNode;
exports.default = _default;