"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TreeListItemContent;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TreeViewDefaultTemplates = require("./TreeViewDefaultTemplates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function TreeListItemContent(props) {
  var template = props.template,
      node = props.node;
  return template ? template(node) : (0, _TreeViewDefaultTemplates.defaultHeader)(node);
}

TreeListItemContent.propTypes = {
  template: _propTypes["default"].func,
  node: _propTypes["default"].object
};