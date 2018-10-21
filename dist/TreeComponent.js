"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _TreeNode = _interopRequireDefault(require("./TreeNode"));

var _defaultTreeStyles = _interopRequireDefault(require("./defaultTreeStyles"));

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

var TreeComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TreeComponent, _React$Component);

  function TreeComponent(props) {
    var _this;

    _classCallCheck(this, TreeComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TreeComponent).call(this, props));
    _this.handleOnKeyDown = _this.handleOnKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setToggling = _this.setToggling.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.selectNewNode = _this.selectNewNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(TreeComponent, [{
    key: "selectNextNode",
    value: function selectNextNode(node) {
      function findLastCollapsedChild(node) {
        if (!node.$lastChild || !node.$expanded) return node;else return findLastCollapsedChild(node.$lastChild);
      }

      if (node.$previousNode && node.$previousNode.$expanded && node.$previousNode.$lastChild) {
        var lastCollapsedChild = findLastCollapsedChild(node.$previousNode);
        this.selectNewNode(lastCollapsedChild);
      } else if (node.$previousNode) {
        this.selectNewNode(node.$previousNode);
      } else if (node.$parent) {
        this.selectNewNode(node.$parent);
      }
    }
  }, {
    key: "selectPreviousNode",
    value: function selectPreviousNode(node) {
      function findFirstParentWithNextNode(node) {
        if (!node.$parent) return;
        if (node.$parent && node.$parent.$nextNode) return node.$parent.$nextNode;else return findFirstParentWithNextNode(node.$parent);
      }

      if (node.$children && node.$expanded) {
        this.selectNewNode(node.$firstChild);
      } else if (node.$nextNode) {
        this.selectNewNode(node.$nextNode);
      } else if (node.$parent) {
        var firstParentWithNextNode = findFirstParentWithNextNode(node);
        if (firstParentWithNextNode) this.selectNewNode(firstParentWithNextNode);
      }
    }
  }, {
    key: "handleOnKeyDown",
    value: function handleOnKeyDown(e) {
      var _this2 = this;

      var node = this.props.selectedNode;
      var handlers = {
        ArrowUp: function ArrowUp() {
          return _this2.selectNextNode(node);
        },
        ArrowDown: function ArrowDown() {
          return _this2.selectPreviousNode(node);
        },
        ArrowLeft: function ArrowLeft() {
          return _this2.setToggling(node, false);
        },
        ArrowRight: function ArrowRight() {
          return _this2.setToggling(node, true);
        }
      };

      if (handlers[e.key]) {
        e.preventDefault();
        handlers[e.key]();
      }
    }
  }, {
    key: "selectNewNode",
    value: function selectNewNode(node) {
      this.props.onSelectNode(node, this.selectedNodeEl);
    }
  }, {
    key: "setToggling",
    value: function setToggling(node, shouldExpand) {
      if (typeof shouldExpand === "boolean") {
        node.$expanded = shouldExpand;
      } else {
        node.$expanded = !node.$expanded;
      }

      this.setState({
        tree: this.props.tree
      });
    }
  }, {
    key: "render",
    value: function render() {
      var style = this.props.styles || _defaultTreeStyles.default;
      var root;

      if (style) {
        root = style.root;
      }

      return _react.default.createElement("ul", {
        tabIndex: 0,
        onKeyDown: this.handleOnKeyDown,
        className: "treeview-root",
        style: root || {}
      }, _react.default.createElement(_TreeNode.default, {
        templates: this.props.templates || {},
        node: this.props.tree,
        iconsEnabled: this.props.iconsEnabled,
        selectNewNode: this.selectNewNode,
        setToggling: this.setToggling,
        style: style
      }));
    }
  }]);

  return TreeComponent;
}(_react.default.Component);

exports.TreeComponent = TreeComponent;