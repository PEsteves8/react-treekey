"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _defaultTreeStyles = _interopRequireDefault(require("./defaultTreeStyles"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TreeViewDefaultTemplates = require("./TreeViewDefaultTemplates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function TreeNodeToggle(props) {
  var template = props.template,
      isExpanded = props.isExpanded,
      node = props.node;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _defaultTreeStyles["default"].nodeToggleWrapper
  }, template ? template(isExpanded, node) : (0, _TreeViewDefaultTemplates.defaultToggle)(isExpanded));
}

TreeNodeToggle.propTypes = {
  template: _propTypes["default"].func,
  setToggling: _propTypes["default"].func,
  node: _propTypes["default"].object,
  isExpanded: _propTypes["default"].bool
};
var _default = TreeNodeToggle;
exports["default"] = _default;