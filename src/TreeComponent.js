import React from "react";

import TreeNode from "./TreeNode";
import defaultTreeStyles from "./defaultTreeStyles";

import { setTreeInternalProperties } from "./TreeViewHelpers";

import { handleKeyModifiers } from "./multiselection";

export class TreeKey extends React.Component {
  constructor(props) {
    super(props);

    this.pristineTree = props.tree;

    setTreeInternalProperties(props.tree);

    this.state = {
      tree: props.tree,
      selectedNode: null,
      selectedNodes: [],
      expandedNodes: new Set(),
    };

    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);

    this.setToggling = this.setToggling.bind(this);
    this.selectNewNode = this.selectNewNode.bind(this);
  }

  findLastCollapsedChild(node) {
    let lastCollapsedChild = node
    while (lastCollapsedChild.$lastChild && this.isNodeExpanded(lastCollapsedChild)) {
      lastCollapsedChild = lastCollapsedChild.$lastChild
    }
    return lastCollapsedChild
  }

  isNodeExpanded(node) {
    return this.state.expandedNodes.has(node)
  }

  selectNextNode(node, e) {
    if (
      node.$previousNode &&
      this.isNodeExpanded(node.$previousNode) &&
      node.$previousNode.$lastChild
    ) {
      var lastCollapsedChild = this.findLastCollapsedChild(node.$previousNode);
      this.selectNewNode(lastCollapsedChild, e);
    } else if (node.$previousNode) {
      this.selectNewNode(node.$previousNode, e);
    } else if (node.$parent) {
      this.selectNewNode(node.$parent, e);
    }
  }

  selectPreviousNode(node, e) {
    function findFirstParentWithNextNode(node) {
      if (!node.$parent) return;
      if (node.$parent && node.$parent.$nextNode) return node.$parent.$nextNode;
      else return findFirstParentWithNextNode(node.$parent);
    }

    if (node.$children && this.isNodeExpanded(node)) {
      this.selectNewNode(node.$firstChild, e);
    } else if (node.$nextNode) {
      this.selectNewNode(node.$nextNode, e);
    } else if (node.$parent) {
      let firstParentWithNextNode = findFirstParentWithNextNode(node);
      if (firstParentWithNextNode)
        this.selectNewNode(firstParentWithNextNode, e);
    }
  }

  handleOnKeyDown(e) {
    let node = this.props.selectedNode || this.state.selectedNode;
    let handlers = {
      ArrowUp: () => this.selectNextNode(node, e),
      ArrowDown: () => this.selectPreviousNode(node, e),
      ArrowLeft: () => this.setToggling(node, false),
      ArrowRight: () => this.setToggling(node, true)
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
      let selectedNodes = handleKeyModifiers(node, e, this.props.selectedNodes, this.state.expandedNodes);
      this.props.onSelectNode(selectedNodes);
    } else {
      this.props.onSelectNode(node, e);
    }
  }

  setToggling(node, shouldExpand = !this.state.expandedNodes.has(node)) {
    // if no value is provided, then simply invert the previous one
    // the value is provided when using the arrow keys
    let expandedNodes = this.state.expandedNodes
    if (shouldExpand) {
      expandedNodes.add(node)
    } else {
      expandedNodes.delete(node)
    }
    this.setState({ expandedNodes: new Set(expandedNodes) });
  }

  componentDidMount() {
    if (!this.isStartingSelectedNodeSet()) {
      // Set the root as the selected node
      this.selectNewNode(this.props.tree);
    }

    if(this.state.expandedNodes.size === 0){
      let expandedNodes = this.state.expandedNodes
      expandedNodes.add(this.props.tree)
      this.setState({ expandedNodes })
    }
  }

  isStartingSelectedNodeSet() {
    return this.props.selectedNode || (this.props.selectedNodes && this.props.selectedNodes.length > 0);
  }

  render() {
    let style = this.props.styles || defaultTreeStyles;
    let templates = this.props.templates || {};

    let selectedNode = this.props.selectedNode || this.state.selectedNode;
    let selectedNodes = this.props.selectedNodes;

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
