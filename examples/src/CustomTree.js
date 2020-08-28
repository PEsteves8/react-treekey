import React from "react";
import { treeB } from "./data";
import { TreeKey } from "../../src";
import AddNode from "./AddNode";
import Link from "./Link";
import { recoverNodeListsUsingIds } from './treeResetHelpers';

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
      tree: treeB,
      key: 0,
      lastNodeId: 23,
    };

    this.onSelectNode = this.onSelectNode.bind(this);
    this.onExpandNode = this.onExpandNode.bind(this);
    this.deleteSelectedNodes = this.deleteSelectedNodes.bind(this);
    this.addNode = this.addNode.bind(this);

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

   /*
  * CRUD operations aren't natively supported by the component
  * This is one somewhat hacky way (not particularly efficient) of attaining the same effect
  * First filter/push/edit the nodes from the parent's children prop
  * Then reset the tree references by stringifying and parsing it back
  * Since, the references were lost, we run an helper to recover the new ones using the nodes' unique ids
  * Increase the key property in setState, restarting the treekey component so it remaps the node relationships with this new tree
  * If adding, increment the last node id, so we make sure every new added node is associated with a unique id
  */
  addNode(name, type) {
    event.preventDefault();
    let selectedNode = this.state.selectedNodes[0];
    let newNodeId = this.state.lastNodeId + 1;
    let newNode = { name, type, id: newNodeId };

    let fileExt = newNode.name.match(/\.[^.]*/)[0].slice(1);

    let classNames = {
      js: "fab fa-js text-warning",
      html: "fab fa-html5 text-danger",
      test: "fas fa-flask text-warning",
      md: "far fa-info-circle text-info",
      folder: "fas fa-folder",
      git: "fab fa-git-alt text-warning",
      other: "fas fa-file",
    };

    if (type === "folder") {
      newNode.children = [];
      newNode.className = classNames.folder;
    } else if (newNode.name.startsWith('.git')) {
      newNode.className = classNames.git;
    } else {
      newNode.className = classNames[fileExt] || classNames.other;
    }

    if (selectedNode.children) {
      selectedNode.children.push(newNode);
    } else {
      selectedNode.$parent.children.push(newNode);
    }

    let resetTree = JSON.parse(JSON.stringify(this.state.tree));

    let [selectedNodes, expandedNodes] = recoverNodeListsUsingIds(
      resetTree,
      this.state.selectedNodes,
      this.state.expandedNodes
    );

    this.setState({
      tree: resetTree,
      selectedNodes,
      expandedNodes,
      key: this.state.key + 1,
      lastNodeId: newNodeId,
    });
  }
 
  deleteSelectedNodes() {
    this.state.selectedNodes.forEach((node) => {
      if (node.$parent) {
      node.$parent.children = node.$parent.children.filter(
        (child) => child !== node
      );
    }
    });

    let resetTree = JSON.parse(JSON.stringify(this.state.tree));

    let [selectedNodes, expandedNodes] = recoverNodeListsUsingIds(
      resetTree,
      this.state.selectedNodes,
      this.state.expandedNodes
    );

    this.setState({
      tree: resetTree,
      selectedNodes: [resetTree],
      expandedNodes: expandedNodes,
      key: this.state.key + 1,
    });
  }

  render() {
    return (
      <div className="row mt-3 mb-3">
        <div className="col-6">
          <h6>
            Manual Config - Custom Templates, Multi Selection with shift/ctrl
            keys
            <Link
              href={
                "https://github.com/PEsteves8/react-treekey/blob/master/examples/src/CustomTree.js"
              }
            />
          </h6>
          <div style={{ height: "400px", overflowY: "auto" }}>
            <TreeKey
              tree={this.state.tree}
              onSelectNode={this.onSelectNode}
              onExpandNode={this.onExpandNode}
              selectedNodes={this.state.selectedNodes}
              expandedNodes={this.state.expandedNodes}
              templates={this.templates}
              multiSelection={true}
              key={this.state.key}
            />
          </div>
        </div>

        <div className="col-6">
          <div>Name: {this.state.selectedNodes[0].name}</div>
          <div>Type: {this.state.selectedNodes[0].type}</div>

          <div className="row mt-3">
            <AddNode addNode={this.addNode} />
          </div>

          <div className="row">
            <button
              className="btn btn-sm btn-danger"
              onClick={this.deleteSelectedNodes}
            >
              Delete Selected Nodes
            </button>
          </div>

          <div className="row mt-3">
            <button
              className="btn btn-sm btn-light"
              onClick={() => {
                console.log(JSON.parse(JSON.stringify(treeB)));
              }}
            >
              console.log current tree state
            </button>
          </div>
        </div>
      </div>
    );
  }
}
