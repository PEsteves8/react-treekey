import React from "react";
import PropTypes from "prop-types";

import { defaultHeader } from "./TreeViewDefaultTemplates";

export default class TreeListItemContent extends React.Component {
  render() {
    let { template, node } = this.props;
    return template ? template(node) : defaultHeader(node);
  }
}

TreeListItemContent.propTypes = {
  template: PropTypes.func,
  node: PropTypes.object,
};
