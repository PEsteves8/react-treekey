import React from "react";
import PropTypes from "prop-types";

import TreeNode from "./TreeNode";
import defaultTreeStyles from "./defaultTreeStyles";

import { setTreeInternalProperties } from "./TreeViewHelpers";

import { multiselection } from "./multiselection";

export class TreeKey extends React.Component {
  constructor(props) {
    super(props);

    // adds non enumerable properties to each node
    // to keep track of its relationships for keyboard control
    // they'll be left out if the user stringifies the tree
    setTreeInternalProperties(props.tree);

    this.state = {
      tree: props.tree,
      selectedNode: null,
      selectedNodes: [],
      expandedNodes: this.props.expandedNodes || [],
    };

    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);

    this.setToggling = this.setToggling.bind(this);
    this.selectNewNode = this.selectNewNode.bind(this);

    this.getNodesUsingKeyModifiers = multiselection().getNodesUsingKeyModifiers;
  }

  findFirstParentsNextNode(node) {
    if (!node.$parent) return;
    if (node.$parent && node.$parent.$nextNode) return node.$parent.$nextNode;
    else return this.findFirstParentsNextNode(node.$parent);
  }

  findLastCollapsedChild(node) {
    let lastCollapsedChild = node;
    while (
      lastCollapsedChild.$lastChild &&
      this.isNodeExpanded(lastCollapsedChild)
    ) {
      lastCollapsedChild = lastCollapsedChild.$lastChild;
    }
    return lastCollapsedChild;
  }

  isNodeExpanded(node) {
    return this.state.expandedNodes.includes(node);
  }

  selectPreviousNode(node, e) {
    if (
      node.$previousNode &&
      this.isNodeExpanded(node.$previousNode) &&
      node.$previousNode.$lastChild
    ) {
      const lastCollapsedChild = this.findLastCollapsedChild(
        node.$previousNode
      );
      this.selectNewNode(lastCollapsedChild, e);
    } else if (node.$previousNode) {
      this.selectNewNode(node.$previousNode, e);
    } else if (node.$parent) {
      this.selectNewNode(node.$parent, e);
    }
  }

  selectNextNode(node, e) {
    if (node.children && this.isNodeExpanded(node)) {
      this.selectNewNode(node.$firstChild, e);
    } else if (node.$nextNode) {
      this.selectNewNode(node.$nextNode, e);
    } else if (node.$parent) {
      let firstParentWithNextNode = this.findFirstParentsNextNode(node);
      if (firstParentWithNextNode)
        this.selectNewNode(firstParentWithNextNode, e);
    }
  }

  handleOnKeyDown(e) {
    let node =
      this.props.selectedNode ||
      this.state.selectedNode ||
      this.props.selectedNodes[0];
    let handlers = {
      ArrowUp: () => this.selectPreviousNode(node, e),
      ArrowDown: () => this.selectNextNode(node, e),
      ArrowLeft: () => this.setToggling(node, false),
      ArrowRight: () => this.setToggling(node, true),
    };

    if (handlers[e.key]) {
      e.preventDefault();
      handlers[e.key]();
    }
  }

  selectNewNode(node, e) {
    if (!this.props.selectedNode) {
      this.setState({ selectedNode: node });
    }

    if (this.props.multiSelection) {
      let selectedNodes = this.getNodesUsingKeyModifiers(
        node,
        e,
        this.props.selectedNodes,
        this.state.expandedNodes
      );
      this.props.onSelectNode(selectedNodes);
    } else {
      this.props.onSelectNode(node, e);
    }
  }

  setToggling(node, shouldBeExpanded = !this.isNodeExpanded(node)) {
    // if no value is provided, then simply invert the previous one
    // the value is provided when using the arrow keys
    let expanded = this.state.expandedNodes;
    let isExpanded = this.isNodeExpanded(node);
    let expandedNodes;
    if (shouldBeExpanded && !isExpanded) {
      expandedNodes = [...expanded, node];
    } else if (!shouldBeExpanded && isExpanded) {
      expandedNodes = expanded.filter((n) => n !== node);
    }
    if (expandedNodes) {
      this.setState({ expandedNodes });
    }
  }

  componentDidMount() {
    if (!this.isStartingSelectedNodeSet()) {
      // Set the root as the selected node
      this.selectNewNode(this.props.tree);
    }

    if (this.state.expandedNodes.length === 0) {
      this.setState({ expandedNodes: [this.props.tree] });
    }
  }

  isStartingSelectedNodeSet() {
    return (
      this.props.selectedNode ||
      (this.props.selectedNodes && this.props.selectedNodes.length > 0)
    );
  }

  render() {
    const style = this.props.styles || defaultTreeStyles;
    const templates = this.props.templates;

    const selectedNode = this.props.selectedNode || this.state.selectedNode;
    const selectedNodes = this.props.selectedNodes;

    return (
      <ul
        tabIndex={0}
        onKeyDown={this.handleOnKeyDown}
        className="treeview-root"
        style={style.root}
      >
        <TreeNode
          selectedNode={selectedNode}
          selectedNodes={selectedNodes}
          templates={templates}
          node={this.state.tree}
          selectNewNode={this.selectNewNode}
          setToggling={this.setToggling}
          style={style}
          expandedNodes={this.state.expandedNodes}
        />
      </ul>
    );
  }
}

TreeKey.propTypes = {
  tree: PropTypes.object,
  onSelectNode: PropTypes.func,
  selectedNode: PropTypes.object,
  selectedNodes: PropTypes.arrayOf(PropTypes.object),
  expandedNodes: PropTypes.arrayOf(PropTypes.object),
  templates: PropTypes.objectOf(PropTypes.func),
  multiSelection: PropTypes.bool,
};
