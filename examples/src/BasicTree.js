import React from "react";
import { treeA } from "./data";
import { TreeKey } from "../../src";
import Link from "./Link";

export class BasicTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // the tree's default starting selected node is the root if we don't pass it manually
      // this prop is here only to keep track of the current selected node, so we're initing it as the root
      selectedNode: treeA,
    };

    this.onSelectNode = this.onSelectNode.bind(this);
  }

  onSelectNode(node) {
    console.log(node);
    this.setState({ selectedNode: node });
  }

  render() {
    return (
      <div className="row mt-3 mb-3" style={{ height: "500px" }}>
        <div className="col-6">
          <div style={{ height: "500px", overflowY: "auto" }}>
            <TreeKey tree={treeA} onSelectNode={this.onSelectNode} />
          </div>
        </div>
        <div className="col-6">
          <pre style={{ color: "white" }}>
            {JSON.stringify(this.state.selectedNode, undefined, 2)}
          </pre>
        </div>
      </div>
    );
  }
}
