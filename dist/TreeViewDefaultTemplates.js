"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultHeader = exports.defaultToggle = void 0;

var _react = _interopRequireDefault(require("react"));

var _defaultTreeStyles = _interopRequireDefault(require("./defaultTreeStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultToggle = function defaultToggle(isExpanded) {
  var svgStyles = {
    fill: "white",
    strokeWidth: 0,
    transformOrigin: "center",
    transform: "rotate(".concat(isExpanded ? "90deg" : "0", ")")
  };
  var _styles$nodeToggleSvg = _defaultTreeStyles["default"].nodeToggleSvg,
      height = _styles$nodeToggleSvg.height,
      width = _styles$nodeToggleSvg.width,
      points = _styles$nodeToggleSvg.points;
  return /*#__PURE__*/_react["default"].createElement("svg", {
    height: height,
    width: width
  }, /*#__PURE__*/_react["default"].createElement("polygon", {
    points: points,
    style: svgStyles
  }));
};

exports.defaultToggle = defaultToggle;

var defaultHeader = function defaultHeader(node) {
  return /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      paddingLeft: "7px"
    }
  }, node.name);
};

exports.defaultHeader = defaultHeader;