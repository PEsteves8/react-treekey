"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _TreeNodeContent = _interopRequireDefault(require("./TreeNodeContent"));

var _TreeNodeToggle = _interopRequireDefault(require("./TreeNodeToggle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TreeNode = /*#__PURE__*/function (_React$Component) {
  _inherits(TreeNode, _React$Component);

  var _super = _createSuper(TreeNode);

  function TreeNode(props) {
    var _this;

    _classCallCheck(this, TreeNode);

    _this = _super.call(this, props);
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TreeNode, [{
    key: "onClick",
    value: function onClick(e) {
      this.props.selectNewNode(this.props.node, e);

      if (!e.shiftKey && !e.ctrlKey) {
        this.props.handleToggle(this.props.node);
      }
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      if (event.shiftKey || event.ctrlKey || event.metaKey) {
        // Prevent text selection
        event.preventDefault();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var style = this.props.style;
      var isSelectedNode = this.props.selectedNodes.includes(this.props.node);
      var nodeTextStyles = {};
      var listItemStyle = {};

      if (style) {
        var paddingLeft = 10 * this.props.indentValue;

        if (!this.props.node.children) {
          paddingLeft = paddingLeft + 15;
        }

        nodeTextStyles = _objectSpread(_objectSpread({}, style.node["default"]), {}, {
          paddingLeft: paddingLeft + "px"
        });

        if (isSelectedNode) {
          nodeTextStyles = _objectSpread(_objectSpread({}, nodeTextStyles), style.node.selected);
        }

        listItemStyle = style.listItem;
      }

      var isExpanded = this.props.expandedNodes.includes(this.props.node);
      var templates = this.props.templates || {};
      return /*#__PURE__*/_react["default"].createElement("li", {
        style: listItemStyle,
        className: "".concat(isSelectedNode ? "treeview-selected-node" : "")
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: nodeTextStyles,
        onClick: this.onClick,
        onMouseDown: this.onMouseDown
      }, this.props.node.children && /*#__PURE__*/_react["default"].createElement(_TreeNodeToggle["default"], {
        template: templates.toggle,
        node: this.props.node,
        isExpanded: isExpanded
      }), /*#__PURE__*/_react["default"].createElement(_TreeNodeContent["default"], {
        template: templates.header,
        node: this.props.node,
        iconsEnabled: this.props.iconsEnabled
      })), this.props.node.children && isExpanded && /*#__PURE__*/_react["default"].createElement("ul", {
        style: this.props.style.nestedList
      }, this.props.node.children.map(function (item, idx) {
        return /*#__PURE__*/_react["default"].createElement(TreeNode, {
          style: _this2.props.style,
          node: item,
          key: idx,
          selectNewNode: _this2.props.selectNewNode,
          handleToggle: _this2.props.handleToggle,
          iconsEnabled: _this2.props.iconsEnabled,
          templates: templates,
          selectedNode: _this2.props.selectedNode,
          selectedNodes: _this2.props.selectedNodes,
          expandedNodes: _this2.props.expandedNodes,
          indentValue: _this2.props.indentValue + 1
        });
      })));
    }
  }]);

  return TreeNode;
}(_react["default"].Component);

var _default = TreeNode;
exports["default"] = _default;