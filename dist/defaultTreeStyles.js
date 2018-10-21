"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  root: {
    outline: 'none',
    paddingLeft: '10px',
    listStyle: 'none'
  },
  node: {
    default: {
      position: 'relative',
      paddingLeft: '100%',
      marginLeft: '-100%'
    },
    selected: {
      backgroundColor: 'grey'
    }
  },
  nestedList: {
    listStyle: 'none',
    paddingLeft: '15px'
  }
};
exports.default = _default;