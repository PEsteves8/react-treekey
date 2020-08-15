import React from "react";

import TreeNodeContent from "./TreeNodeContent";
import TreeNodeToggle from "./TreeNodeToggle";

class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.stopPropagation();
    this.props.selectNewNode(this.props.node, e);
  }

  render() {
    const { style } = this.props;
    const isSelectedNode = this.props.selectedNodes.includes(this.props.node);

    let nodeTextStyles = {};

    if (style) {
      nodeTextStyles = { ...style.node.default };

      if (isSelectedNode) {
        nodeTextStyles = { ...nodeTextStyles, ...style.node.selected };
      }
    }
    const isExpanded = this.props.expandedNodes.includes(this.props.node);
    const templates = this.props.templates || {};

    return (
      <li
        onClick={this.onClick}
        className={`${isSelectedNode ? "treeview-selected-node" : ""}`}
      >
        <div style={nodeTextStyles}>
          {this.props.node.children && (
            <TreeNodeToggle
              template={templates.toggle}
              setToggling={this.props.setToggling}
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
                  setToggling={this.props.setToggling}
                  iconsEnabled={this.props.iconsEnabled}
                  templates={templates}
                  selectedNode={this.props.selectedNode}
                  selectedNodes={this.props.selectedNodes}
                  expandedNodes={this.props.expandedNodes}
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
