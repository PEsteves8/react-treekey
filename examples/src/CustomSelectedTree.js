import React from "react";

import { treeA } from "./data";

import styles from "./styles";

import { TreeKey } from "../../src";

export class CustomSelectedTree extends React.Component {
  constructor(props) {
    super(props);

    this.onSelectNode = this.onSelectNode.bind(this);
    this.selectedNodes = this.selectedNodes.bind(this);

    this.selectedNodesList = [treeA];
  }

  onSelectNode(node, e) {
    if (e.ctrlKey) {
      if (e.type === "click") {
        let idx = this.selectedNodesList.indexOf(node);
        if (idx === -1) {
          this.selectedNodesList.push(node);
        } else {
          this.selectedNodesList.splice(idx, 1);
        }
        // anchor node is used as a reference for shift range selections
        this.anchorNode = node;

        // last selected node is used as the previously clicked node within range selections
        this.lastSelectedNode = undefined;
      }
    } else if (e.shiftKey) {
      let findCommonParent = (firstNode, secondNode) => {
        if (firstNode === secondNode) {
          return [firstNode.$parent];
        }

        let nodeHierarchy = [firstNode];
        let otherNodeHierarchy = [secondNode];
        let currentNode;

        currentNode = firstNode;
        while (currentNode.$parent) {
          nodeHierarchy.push(currentNode.$parent);
          currentNode = currentNode.$parent;
        }

        currentNode = secondNode;
        while (currentNode.$parent) {
          otherNodeHierarchy.push(currentNode.$parent);
          currentNode = currentNode.$parent;
        }

        nodeHierarchy = nodeHierarchy.reverse();
        otherNodeHierarchy = otherNodeHierarchy.reverse();

        let maxLength = Math.max(
          nodeHierarchy.length,
          otherNodeHierarchy.length
        );

        // Once a different parent is found, return the previous one that was the same
        for (let i = 0; i < maxLength; i++) {
          if (nodeHierarchy[i] !== otherNodeHierarchy[i]) {
            return nodeHierarchy[i - 1];
          }
        }
      };

      let getRange = (commonParent, firstNode, secondNode) => {
        if (firstNode === secondNode) {
          return [firstNode];
        }

        let currentNode = commonParent;

        let firstIndex = null;
        let secondIndex = null;
        let result = [];
        while (currentNode && (firstIndex === null || secondIndex === null)) {
          if (currentNode === firstNode) {
            firstIndex = 1;
          }

          if (currentNode === secondNode) {
            secondIndex = 1;
          }

          if (firstIndex || secondIndex) {
            result.push(currentNode);
          }

          if (currentNode.$children && currentNode.$expanded) {
            currentNode = currentNode.$firstChild;
          } else if (currentNode.$nextNode) {
            currentNode = currentNode.$nextNode;
          } else {
            currentNode = currentNode.$parent.$nextNode;
          }
        }

        return result;
      };

      // First deselect from lastSelectedNode to node
      // Then select from anchorNode to node

      // First deselect the nodes that should be deselected
      if (this.lastSelectedNode) {
        let commonParent = findCommonParent(node, this.lastSelectedNode);
        let result = getRange(commonParent, node, this.lastSelectedNode);
        result.forEach(item => {
          let idx = this.selectedNodesList.indexOf(item);
          if (idx !== -1) {
            this.selectedNodesList.splice(idx, 1);
          }
        });
      }

      // Then select the whole range from the anchor node to the clicked node
      {
        let commonParent = findCommonParent(node, this.anchorNode);
        let result = getRange(commonParent, node, this.anchorNode);
        result.forEach(item => {
          if (!this.selectedNodesList.includes(item)) {
            this.selectedNodesList.push(item);
          }
        });
      }

      this.lastSelectedNode = node;
    } else {
      this.selectedNodesList = [node];
      this.anchorNode = node;
      this.lastSelectedNode = undefined;
    }
  }

  selectedNodes(node) {
    return this.selectedNodesList.includes(node);
  }

  render() {
    return (
      <div style={styles.treeWrapper}>
        <TreeKey
          tree={treeA}
          onSelectNode={this.onSelectNode}
          selectedNodes={this.selectedNodes}
        />
      </div>
    );
  }
}
