export function multiselection() {
  let anchorNode;
  let lastSelectedNode;

  function findCommonParent(firstNode, secondNode) {
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

    let maxLength = Math.max(nodeHierarchy.length, otherNodeHierarchy.length);

    // Once a different parent is found, return the previous one that was the same
    for (let i = 0; i < maxLength; i++) {
      if (nodeHierarchy[i] !== otherNodeHierarchy[i]) {
        return nodeHierarchy[i - 1];
      }
    }
  }

  function getRange(commonParent, firstNode, secondNode, expandedNodes) {
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

      if (currentNode.$children && expandedNodes.has(currentNode)) {
        currentNode = currentNode.$firstChild;
      } else if (currentNode.$nextNode) {
        currentNode = currentNode.$nextNode;
      } else {
        currentNode = currentNode.$parent.$nextNode;
      }
    }

    return result;
  }

  function removeNodeFromSelectedNodes(selectedNodes, nodesToRemove) {
    return selectedNodes.reduce((result, node) => {
      if (!nodesToRemove.includes(node)) {
        result.push(node);
      }
      return result;
    }, []);
  }

  function addNodeToSelectedNodes(selectedNodes, nodesToAdd) {
    return nodesToAdd.reduce(
      (result, node) => {
        if (!selectedNodes.includes(node)) {
          result.push(node);
        }
        return result;
      },
      [...selectedNodes]
    );
  }

  function getNodesUsingKeyModifiers(
    node,
    e,
    selectedNodes,
    expandedNodes
  ) {
    if (e && e.ctrlKey) {
      if (e.type === "click") {
        const result = !selectedNodes.includes(node)
          ? addNodeToSelectedNodes(selectedNodes, [node])
          : removeNodeFromSelectedNodes(selectedNodes, [node]);

        // anchor node is used as a reference for shift range selections
        anchorNode = result.length > 0 ? node : undefined;

        // last selected node is used as the previously clicked node within range selections
        lastSelectedNode = undefined;

        return result;
      }
    } else if (e && e.shiftKey) {
      let result = [...selectedNodes];

      // First deselect the nodes that should be deselected if any
      if (lastSelectedNode) {
        let commonParent = findCommonParent(node, lastSelectedNode);

        let nodeRange = getRange(
          commonParent,
          node,
          lastSelectedNode,
          expandedNodes
        );

        result = removeNodeFromSelectedNodes(result, nodeRange);
      }

      // Then select the whole range from the anchor node to the clicked node
      anchorNode = anchorNode || selectedNodes[0];
      {
        let commonParent = findCommonParent(node, anchorNode);
        let nodeRange = getRange(commonParent, node, anchorNode, expandedNodes);
        result = addNodeToSelectedNodes(result, nodeRange);
      }

      lastSelectedNode = node;
      return result;
    } else {
      let result = [node];
      anchorNode = node;
      lastSelectedNode = undefined;
      return result;
    }
  };

  return {
    getNodesUsingKeyModifiers,
  }
}
