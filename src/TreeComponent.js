import React from "react";
import PropTypes from "prop-types";

import TreeNode from "./TreeNode";
import defaultTreeStyles from "./defaultTreeStyles";

import { setTreeInternalProperties } from "./TreeViewHelpers";

import { multiselection } from "./multiselection";

export class TreeKey extends React.Component {
  constructor(props) {
    super(props);
    let { selectedNodes, expandedNodes, tree } = props;

    // adds non enumerable properties to each node
    // to keep track of its relationships for keyboard control
    // they'll be left out if the user stringifies the tree
    setTreeInternalProperties(tree);
    
    // set root as selected / expanded is it hasn't been specified
    this.state = {
      tree: tree,
      lastSelectedNode: (selectedNodes && selectedNodes[0]) || tree,
      selectedNodes: selectedNodes || [tree],
      expandedNodes: expandedNodes || [tree],
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
    let node = this.state.lastSelectedNode;
    
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

  shouldAutoSelectNodes() {
    return !this.props.selectedNodes;
  }

  selectNewNode(node, e) {
    let { multiSelection } = this.props;
    let selectedNodes = multiSelection ? this.getNodesUsingKeyModifiers(
      node,
      e,
      this.state.selectedNodes,
      this.state.expandedNodes
    ) : [node];

    if(this.shouldAutoSelectNodes()) {
      this.setState({ selectedNodes });
    }

    this.setState({ lastSelectedNode: node });
    this.props.onSelectNode(multiSelection ? selectedNodes : selectedNodes[0]);
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
    
    if(this.props.onExpandNode) {
      this.props.onExpandNode(expandedNodes);
    }
  }

  static getDerivedStateFromProps(props, state) {
    let selectedNodes = props.selectedNodes || state.selectedNodes;
    let expandedNodes = props.expandedNodes || state.expandedNodes;

    if (selectedNodes !== state.selectedNodes || expandedNodes !== state.expandedNodes) {
      return { selectedNodes, expandedNodes };
    }

    return null;
  }

  render() {
    let style = this.props.styles || defaultTreeStyles;
    let templates = this.props.templates;

    let { selectedNodes, expandedNodes, tree } = this.state;

    return (
      <ul
        tabIndex={0}
        onKeyDown={this.handleOnKeyDown}
        className="treeview-root"
        style={style.root}
      >
        <TreeNode
          selectedNodes={selectedNodes}
          templates={templates}
          node={tree}
          selectNewNode={this.selectNewNode}
          setToggling={this.setToggling}
          style={style}
          expandedNodes={expandedNodes}
        />
      </ul>
    );
  }
}

TreeKey.propTypes = {
  tree: PropTypes.object,
  onSelectNode: PropTypes.func,
  selectedNodes: PropTypes.arrayOf(PropTypes.object),
  expandedNodes: PropTypes.arrayOf(PropTypes.object),
  templates: PropTypes.objectOf(PropTypes.func),
  multiSelection: PropTypes.bool,
};
