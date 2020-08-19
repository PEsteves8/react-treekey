import PropTypes from "prop-types";

import { defaultHeader } from "./TreeViewDefaultTemplates";

export default function TreeListItemContent(props) {
  let { template, node } = props;
  return template ? template(node) : defaultHeader(node);
}

TreeListItemContent.propTypes = {
  template: PropTypes.func,
  node: PropTypes.object,
};
