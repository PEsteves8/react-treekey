import React from "react";
import { treeB } from "./data";
import { TreeKey } from "../../src";
import AddNode from './AddNode';

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

  addNode(name, type) {
    event.preventDefault();
    let node = this.state.selectedNodes[0];
    let newNodeId = this.state.lastNodeId + 1
    let newNode = { name, type, id: newNodeId };
    
    let classNames = {
      folder: 'fas fa-folder',
      js: 'fab fa-js text-warning',
      html: 'fab fa-html5 text-danger',
      test: 'fas fa-flask text-warning',
      md: 'far fa-info-circle text-info',
      git: 'fab fa-git-alt text-warning',
      other: 'fas fa-file'
    }

    if (type === 'folder') {
      newNode.children = [];
      newNode.className = classNames.folder;
    } else if (name.includes('.test.')) {
      newNode.className = classNames.test;
    } else if (name.endsWith('.js')) {
      newNode.className = classNames.js;
    } else if  (name.endsWith('.html')) {
      newNode.className = classNames.html;
    } else if (name.endsWith('.md')) {
      newNode.className = classNames.md;
    } else if (name.includes('.git')) {
      newNode.className = classNames.git
    }else {
      newNode.className = classNames.other;
    }
    
    if (node.children) {
      node.children.push(newNode);
    } else {
      node.$parent.children.push(newNode);
    }
    
    let resetTree = JSON.parse(JSON.stringify(this.state.tree));

    let selectedIds = this.state.selectedNodes.map((node) => node.id);
    let expandedIds = this.state.expandedNodes.map((node) => node.id);
    let newSelected = [];
    let newExpanded = [];

    let resetLists = (node) => {
      if (
        selectedIds.includes(node.id) &&
        !newSelected.includes(node.id)
      ) {
        newSelected.push(node);
      }
      if (
        expandedIds.includes(node.id) &&
        !newExpanded.includes(node.id)
      ) {
        newExpanded.push(node);
      }
      if (node.children) {
        node.children.forEach((child) => {
          resetLists(child);
        });
      }
    };

    resetLists(resetTree);

    this.setState({
      tree: resetTree,
      selectedNodes: newSelected,
      expandedNodes: newExpanded,
      // the key forces the component to restart
      // so that the nodes metadata can be rebuilt with the new tree state
      key: this.state.key + 1,
      lastNodeId: newNodeId
    });
  }

  deleteSelectedNodes() {
    this.state.selectedNodes.forEach((node) => {
      node.$parent.children = node.$parent.children.filter(
        (child) => child !== node
      );
    });

    let resetTree = JSON.parse(JSON.stringify(this.state.tree));

    let stringifiedSelected = this.state.selectedNodes.map((node) =>
      JSON.stringify(node)
    );
    let stringifiedExpanded = this.state.expandedNodes.map((node) =>
      JSON.stringify(node)
    );
    let newSelected = [];
    let newExpanded = [];

    let resetLists = (node) => {
      let stringNode = JSON.stringify(node);
      if (
        stringifiedSelected.includes(stringNode) &&
        !newSelected.includes(stringNode)
      ) {
        newSelected.push(node);
      }
      if (
        stringifiedExpanded.includes(stringNode) &&
        !newExpanded.includes(stringNode)
      ) {
        newExpanded.push(node);
      }
      if (node.children) {
        node.children.forEach((child) => {
          resetLists(child);
        });
      }
    };

    resetLists(resetTree);

    this.setState({
      tree: resetTree,
      selectedNodes: [resetTree],
      expandedNodes: newExpanded,
      // the key forces the component to restart
      // so that the nodes metadata can be rebuilt with the new tree state
      key: this.state.key + 1
    });
  }

  render() {
    return (
      <div className="row mt-3 mb-3">
        <div className="col-6">
          <h6>
            Manual Config - Custom Templates, Multi Selection with shift/ctrl keys
            <Link
              href={
                "https://github.com/PEsteves8/react-treekey/blob/master/examples/src/CustomTree.js"
              }
            />
          </h6>
          <div style={{ height: "350px", overflowY: "auto" }}>
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
