export default {
  root: {
    outline: "none",
    paddingLeft: "18px",
    listStyle: "none",
  },
  node: {
    default: {},
    selected: {
      backgroundColor: "grey",
    },
  },
  listItem: {
    cursor: 'pointer',
  },
  nodeToggleWrapper: {
    display: "inline-block",
    paddingLeft: "25px",
    marginLeft: "-18px",
  },
  nodeToggleSvg: {
    points: "0,0,0,10,8,5",
    height: 10,
    width: 8,
  },
  nestedList: {
    listStyle: "none",
    paddingLeft: "0px",
  },
};
