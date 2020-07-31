let anchorNode;
let lastSelectedNode;

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

  let maxLength = Math.max(nodeHierarchy.length, otherNodeHierarchy.length);

  // Once a different parent is found, return the previous one that was the same
  for (let i = 0; i < maxLength; i++) {
    if (nodeHierarchy[i] !== otherNodeHierarchy[i]) {
      return nodeHierarchy[i - 1];
    }
  }
};

let getRange = (commonParent, firstNode, secondNode, expandedNodes) => {
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
};

export function handleKeyModifiers(node, e, selectedNodes, expandedNodes) {
  if (e && e.ctrlKey) {
    if (e.type === "keydown") return;

    if (e.type === "click") {
      let idx = selectedNodes.indexOf(node);
      if (idx === -1) {
        selectedNodes.push(node);
      } else {
        selectedNodes.splice(idx, 1);
      }
      // anchor node is used as a reference for shift range selections
      anchorNode = node;

      // last selected node is used as the previously clicked node within range selections
      lastSelectedNode = undefined;
    }
  } else if (e && e.shiftKey) {
    // First deselect from lastSelectedNode to node
    // First deselect the nodes that should be deselected
    if (lastSelectedNode) {
      let commonParent = findCommonParent(node, lastSelectedNode);
      let result = getRange(commonParent, node, lastSelectedNode, expandedNodes);

      result.forEach(item => {
        let idx = selectedNodes.indexOf(item);
        if (idx !== -1) {
          selectedNodes.splice(idx, 1);
        }
      });
    }

    // Then select from anchorNode to node
    // Then select the whole range from the anchor node to the clicked node
    {
      let commonParent = findCommonParent(node, anchorNode);
      let result = getRange(commonParent, node, anchorNode, expandedNodes);

      result.forEach(item => {
        if (!selectedNodes.includes(item)) {
          selectedNodes.push(item);
        }
      });
    }

    lastSelectedNode = node;
  } else {
    selectedNodes = [node];
    anchorNode = node;
    lastSelectedNode = undefined;
  }

  return selectedNodes;
}
