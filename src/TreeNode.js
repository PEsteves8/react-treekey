import React from "react";

import TreeNodeContent from "./TreeNodeContent";
import TreeNodeToggle from "./TreeNodeToggle";

class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  onClick(e) {
    this.props.selectNewNode(this.props.node, e);

    if (!e.shiftKey && !e.ctrlKey) {
      this.props.handleToggle(this.props.node);
    }
  }

  onMouseDown(event) {
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
      // Prevent text selection
      event.preventDefault();
    }
  }

  render() {
    const { style } = this.props;
    const isSelectedNode = this.props.selectedNodes.includes(this.props.node);

    let nodeTextStyles = {};

    if (style) {
      let paddingLeft = 10 * this.props.indentValue;
      if (!this.props.node.children) {
        paddingLeft = paddingLeft + 15;
      }

      nodeTextStyles = { ...style.node.default, paddingLeft: paddingLeft + 'px' };

      if (isSelectedNode) {
        nodeTextStyles = { ...nodeTextStyles, ...style.node.selected  };
      }
    }
    const isExpanded = this.props.expandedNodes.includes(this.props.node);
    const templates = this.props.templates || {};

    return (
      <li className={`${isSelectedNode ? "treeview-selected-node" : ""}`}>
        <div
          style={nodeTextStyles}
          onClick={this.onClick}
          onMouseDown={this.onMouseDown}
        >
          {this.props.node.children && (
            <TreeNodeToggle
              template={templates.toggle}
              node={this.props.node}
              isExpanded={isExpanded}
            />
          )}
          <TreeNodeContent
            template={templates.header}
            node={this.props.node}
            iconsEnabled={this.props.iconsEnabled}
          />
        </div>

        {this.props.node.children && isExpanded && (
          <ul style={this.props.style.nestedList}>
            {this.props.node.children.map((item, idx) => {
              return (
                <TreeNode
                  style={this.props.style}
                  node={item}
                  key={idx}
                  selectNewNode={this.props.selectNewNode}
                  handleToggle={this.props.handleToggle}
                  iconsEnabled={this.props.iconsEnabled}
                  templates={templates}
                  selectedNode={this.props.selectedNode}
                  selectedNodes={this.props.selectedNodes}
                  expandedNodes={this.props.expandedNodes}
                  indentValue={this.props.indentValue + 1}
                />
              );
            })}
          </ul>
        )}
      </li>
    );
  }
}

export default TreeNode;
