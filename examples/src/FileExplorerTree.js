import React from "react";

import { treeB } from "./data";

import { TreeKey } from "../../src";

export class FileExplorerTree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNodes: [],
    };

    this.onSelectNode = this.onSelectNode.bind(this);

    this.templates = {
      header(node) {
        return (
          <span>
            <i className={node.className} />
            &nbsp;{node.name}
          </span>
        );
      }
    };
  }

  onSelectNode(node) {
    this.setState({ selectedNodes: [node] });
  }

  render() {
    const { selectedNodes } = this.state;

    return (
      <div>
        <TreeKey
          tree={treeB}
          selectedNodes={selectedNodes}
          onSelectNode={this.onSelectNode}
          templates={this.templates}
        />
      </div>
    );
  }
}
