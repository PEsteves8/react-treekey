import React from "react";

import { treeB } from "./data";

import styles from "./styles";

import { TreeKey } from "../../src";

export class FileExplorerTree extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNode: null
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
    this.setState({ selectedNode: node });
  }

  render() {
    const { selectedNode } = this.state;

    return (
      <div style={styles.treeWrapper}>
        <TreeKey
          tree={treeB}
          selectedNode={selectedNode}
          onSelectNode={this.onSelectNode}
          templates={this.templates}
        />
      </div>
    );
  }
}
