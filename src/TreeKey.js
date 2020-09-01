import React from "react";
import PropTypes from "prop-types";

import TreeNode from "./TreeNode";
import defaultTreeStyles from "./defaultTreeStyles";

import { setTreeInternalProperties } from "./TreeViewHelpers";

import { multiselection } from "./multiselection";

import { KEYS } from "./constants";

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
      tree,
      lastSelectedNode: (selectedNodes && selectedNodes[0]) || tree,
      selectedNodes: selectedNodes || [tree],
      expandedNodes: expandedNodes || [tree],
    };

    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);

    this.updateExpandedNodes = this.updateExpandedNodes.bind(this);
    this.selectNewNode = this.selectNewNode.bind(this);
    this.handleToggle = this.handleToggle.bind(this);

    this.getNodesUsingKeyModifiers = multiselection().getNodesUsingKeyModifiers;
  }

  findFirstParentsNextNode(node) {
    if (!node.$parent) return;

    if (node.$parent && node.$parent.$nextNode) {
      return node.$parent.$nextNode;
    }

    return this.findFirstParentsNextNode(node.$parent);
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
    const { LEFT, RIGHT, UP, DOWN } = KEYS;
    let handlers = {
      [UP]: () => this.selectPreviousNode(node, e),
      [DOWN]: () => this.selectNextNode(node, e),
      [LEFT]: () => this.handleToggle(node, LEFT),
      [RIGHT]: () => this.handleToggle(node, RIGHT),
    };

    if (handlers[e.key]) {
      e.preventDefault();
      handlers[e.key]();
    }
  }

  selectNewNode(node, e) {
    let { multiSelection } = this.props;
    let selectedNodes = multiSelection
      ? this.getNodesUsingKeyModifiers(
          node,
          e,
          this.state.selectedNodes,
          this.state.expandedNodes
        )
      : [node];

    if (this.shouldAutoSelectNodes()) {
      this.setState({ selectedNodes });
    }

    this.setState({ lastSelectedNode: node });
    this.props.onSelectNode(multiSelection ? selectedNodes : selectedNodes[0]);
  }

  updateExpandedNodes(node, shouldExpand) {
    let { expandedNodes } = this.state;
    let result = shouldExpand
      ? [...expandedNodes, node]
      : expandedNodes.filter((n) => n !== node);
    return result;
  }

  handleToggle(node, key) {
    // the explicit value is only provided when using the arrow keys
    // with click, simply invert the previous value
    const { LEFT, RIGHT } = KEYS;
    let isExpanded = this.isNodeExpanded(node);

    let expandedNodes;

    if (key === LEFT) {
      if (
        !node.$previousNode &&
        node.$parent &&
        this.isNodeExpanded(node.$parent) &&
        !isExpanded
      ) {
        this.selectNewNode(node.$parent);
      } else if (isExpanded) {
        expandedNodes = this.updateExpandedNodes(node, false);
      }
    } else if (key === RIGHT && node.children) {
      if (!isExpanded) {
        expandedNodes = this.updateExpandedNodes(node, true);
      } else {
        this.selectNewNode(node.children[0]);
      }
    } else if (node.children) {
      // if click event
      expandedNodes = this.updateExpandedNodes(node, !isExpanded);
    }

    if (expandedNodes) {
      if (this.shouldAutoExpandNodes()) {
        this.setState({ expandedNodes });
      }

      if (this.props.onExpandNode) {
        this.props.onExpandNode(expandedNodes);
      }
    }
  }

  shouldAutoSelectNodes() {
    return !this.props.selectedNodes;
  }

  shouldAutoExpandNodes() {
    return !this.props.expandedNodes;
  }

  static getDerivedStateFromProps(props, state) {
    // if parents isn't sending these values explicitly
    // the component becomes controlled
    let selectedNodes = props.selectedNodes || state.selectedNodes;
    let expandedNodes = props.expandedNodes || state.expandedNodes;
    return { selectedNodes, expandedNodes };
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
          handleToggle={this.handleToggle}
          style={style}
          expandedNodes={expandedNodes}
          indentValue={1}
        />
      </ul>
    );
  }
}

TreeKey.propTypes = {
  tree: PropTypes.object,
  onSelectNode: PropTypes.func,
  onExpandNode: PropTypes.func,
  selectedNodes: PropTypes.arrayOf(PropTypes.object),
  expandedNodes: PropTypes.arrayOf(PropTypes.object),
  templates: PropTypes.objectOf(PropTypes.func),
  multiSelection: PropTypes.bool,
};
