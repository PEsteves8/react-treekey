export function recoverNodeListsUsingIds(
  newTree,
  previousSelected,
  previousExpanded
) {
  let selectedIds = previousSelected.map((node) => node.id);
  let expandedIds = previousExpanded.map((node) => node.id);
  let newSelectedRefs = [];
  let newExpandedRefs = [];

  let resetLists = (node) => {
    if (selectedIds.includes(node.id) && !newSelectedRefs.includes(node.id)) {
      newSelectedRefs.push(node);
    }
    if (expandedIds.includes(node.id) && !newExpandedRefs.includes(node.id)) {
      newExpandedRefs.push(node);
    }
    if (node.children) {
      node.children.forEach((child) => {
        resetLists(child);
      });
    }
  };

  resetLists(newTree);

  return [newSelectedRefs, newExpandedRefs];
}
