import React from "react";
import { treeA } from "./data";
import { TreeKey } from "../../src";

function Link({ href }) {
  return (
    <a
      target={"_blank"}
      href={href}
      className={"btn btn-sm btn-outline-secondary"}
    >
      <i className={"fas fa-code"} />
    </a>
  );
}

export class BasicTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // if selectedNodes prop isn't used, the selected will be the root by default
      selectedNodeName: treeA.name,
    };

    this.onSelectNode = this.onSelectNode.bind(this);
  }

  onSelectNode(node) {
    console.log(node);
    this.setState({ selectedNodeName: node.name });
  }

  render() {
    return (
      <div className="row mt-3 mb-3">
      <div className='col-5'>
        <h6>
            No Config - Default Templates, Single Selection&nbsp;
            <Link
              href={
                "https://github.com/PEsteves8/react-treekey/blob/master/examples/src/BasicTree.js"
              }
            />
          </h6>
        <div style={{ marginBottom: '10px'  }}>Selected Node: {this.state.selectedNodeName}</div>
        <TreeKey tree={treeA} onSelectNode={this.onSelectNode} />
      </div>
      </div>
    );
  }
}
