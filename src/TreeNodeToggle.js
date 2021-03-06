import React from "react";

import styles from "./defaultTreeStyles";
import PropTypes from "prop-types";
import { defaultToggle } from "./TreeViewDefaultTemplates";

function TreeNodeToggle(props) {
  let { template, isExpanded, node } = props;

  return (
    <div style={styles.nodeToggleWrapper}>
      {template ? template(isExpanded, node) : defaultToggle(isExpanded)}
    </div>
  );
}

TreeNodeToggle.propTypes = {
  template: PropTypes.func,
  setToggling: PropTypes.func,
  node: PropTypes.object,
  isExpanded: PropTypes.bool,
};

export default TreeNodeToggle;
