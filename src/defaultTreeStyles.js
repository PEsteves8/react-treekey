export default {
  root: {
    outline: "none",
    paddingLeft: "20px",
    listStyle: "none",
  },
  node: {
    default: {
      paddingLeft: "100%",
      marginLeft: "-100%",
    },
    selected: {
      backgroundColor: "grey",
    },
  },
  nodeToggleWrapper: {
    display: "inline-block",
    padding: "0 5px",
    marginLeft: "-18px",
  },
  nodeToggleSvg: {
    points: "0,0,0,10,8,5",
    height: 10,
    width: 8,
  },
  nestedList: {
    listStyle: "none",
    paddingLeft: "8px",
  },
};
