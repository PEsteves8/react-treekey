import React from "react";
import { treeB } from "./data";
import { TreeKey } from "../../src";

function Link({ href }) {
  return (
    <a
      target={"_blank"}
      href={href}
      className={"btn btn-sm btn-outline-secondary ml-2"}
    >
      <i className={"fas fa-code"} />
    </a>
  );
}

export class CustomTree extends React.Component {
  constructor(props) {
    super(props);
    let rootNode = treeB;
    let srcFolder = rootNode.children[0];
    let indexFile = srcFolder.children[4];
    let nodeFolder = rootNode.children[1];
    this.state = {
      selectedNodes: [indexFile],
      expandedNodes: [rootNode, srcFolder, nodeFolder],
    };

    this.onSelectNode = this.onSelectNode.bind(this);
    this.onExpandNode = this.onExpandNode.bind(this);

    this.templates = {
      header(node) {
        return (
          <span style={{ paddingLeft: "7px" }}>
            <i className={node.className} />
            &nbsp;{node.name}
          </span>
        );
      },
    };
  }

  onSelectNode(selectedNodes) {
    this.setState({ selectedNodes });
  }

  onExpandNode(expandedNodes) {
    this.setState({ expandedNodes });
  }

  render() {
    return (
      <div className="row mt-3 mb-3">
        <div className="col-5">
          <h6>
            Manual Config - Custom Templates, Multi Selection
            <Link
              href={
                "https://github.com/PEsteves8/react-treekey/blob/master/examples/src/CustomTree.js"
              }
            />
          </h6>
          <div style={{ height: "350px", overflowY: "auto" }}>
            <TreeKey
              tree={treeB}
              onSelectNode={this.onSelectNode}
              onExpandNode={this.onExpandNode}
              selectedNodes={this.state.selectedNodes}
              expandedNodes={this.state.expandedNodes}
              templates={this.templates}
              multiSelection={true}
            />
          </div>
        </div>

        <div className="col-7">
          <div>Name: {this.state.selectedNodes[0].name}</div>
          <div>Type: {this.state.selectedNodes[0].type}</div>
          <button
            className="btn btn-sm btn-light mb-1 mt-3"
            onClick={() => {
              console.log(JSON.parse(JSON.stringify(treeB)));
            }}
          >
            Log Tree JSON
          </button>
        </div>
      </div>
    );
  }
}
