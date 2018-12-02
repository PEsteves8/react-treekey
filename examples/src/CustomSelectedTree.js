import React from "react";

import { treeA } from "./data";

import styles from "./styles";

import { TreeKey } from "../../src";

export class CustomSelectedTree extends React.Component {
  constructor(props) {
    super(props);

    this.onSelectNode = this.onSelectNode.bind(this);

    this.state = {
      selectedNodes: [treeA]
    }
  }

  onSelectNode(nodes) {
    this.setState({
      selectedNodes: nodes
    });
  }

  render() {
    return (
      <div style={styles.treeWrapper}>
        <TreeKey
          tree={treeA}
          onSelectNode={this.onSelectNode}
          selectedNodes={this.state.selectedNodes}
          multiSelection={true}
        />
      </div>
    );
  }
}
