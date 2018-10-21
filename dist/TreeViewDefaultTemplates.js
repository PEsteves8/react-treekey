"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultHeader = exports.defaultToggle = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultToggle = function defaultToggle(node) {
  var svg = {
    style: {
      fill: 'white',
      strokeWidth: 0,
      transformOrigin: 'center',
      transform: "rotate(".concat(node.$expanded ? '90deg' : '0', ")")
    },
    points: '0,0,0,10,8,5',
    height: 10,
    width: 8
  };
  return _react.default.createElement("svg", {
    height: svg.height,
    width: svg.width
  }, _react.default.createElement("polygon", {
    points: svg.points,
    style: svg.style
  }));
};

exports.defaultToggle = defaultToggle;

var defaultHeader = function defaultHeader(node) {
  return _react.default.createElement("span", null, node.name);
};

exports.defaultHeader = defaultHeader;