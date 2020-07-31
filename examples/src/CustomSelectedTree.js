import React from "react";

import { treeA } from "./data";

import styles from "./styles";

import { TreeKey } from "../../src";

export class CustomSelectedTree extends React.Component {
  constructor(props) {
    super(props);

    this.onSelectNode = this.onSelectNode.bind(this);

    this.state = {
      selectedNode: [treeA.$children[0]]
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
          <button onClick={() => {console.log(JSON.parse(JSON.stringify(treeA)))}}>log json tree</button>
      </div>

      
    );
  }
}
