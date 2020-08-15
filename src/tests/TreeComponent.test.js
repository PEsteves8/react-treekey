import React, { useState } from "react";
import { TreeKey } from "../TreeComponent";
import { treeA } from "../../examples/src/data";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';

const TreeKeyTestComponent = (props) => {
  const { selectedNodes, ...propsRest } = props;
  const [selectedNodesProp, setSelectNodesProp] = useState(selectedNodes);
  const onSelectNode = (nodes) => {
    setSelectNodesProp(nodes);
  };

  return (
    <TreeKey
      tree={treeA}
      onSelectNode={onSelectNode}
      selectedNodes={selectedNodesProp}
      {...propsRest}
    ></TreeKey>
  );
};

let renderTestComponent = (props) => {
  act(() => {
    render(<TreeKeyTestComponent {...props} />, container);
  });
};

let getSelectedElements = (spanOnly = true) =>
  document.querySelectorAll(`.treeview-selected-node ${spanOnly ? '> div > span' : ''}`);

// children position is array of root descendant indices. empty array means it's the root
let getNodeSelectorByPos = nodePos => {
  let selectorParts = nodePos.map(
    pos => `> ul > li:nth-child(${pos + 1})`
  );
  return `.treeview-root > li ${selectorParts.join(" ")}`;
};

let clickNode = (nodePos, ctrlKey, shiftKey) => {
  let selector = getNodeSelectorByPos(nodePos);
  act(() => {
    document
      .querySelector(selector)
      .dispatchEvent(
        new MouseEvent("click", { bubbles: true, shiftKey, ctrlKey })
      );
  });
};

let clickToggle = (nodePos = []) => {
  let toggleSelector = `${getNodeSelectorByPos(nodePos)} > div > div > svg`;
  act(() => {
    document
      .querySelector(toggleSelector)
      .dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
  });
};

let pressKeyOnTree = (key, shiftKey = false) => {
  let treeEl = container.querySelector("ul");
  act(() => {
    treeEl.dispatchEvent(
      new KeyboardEvent("keydown", { bubbles: true, key, shiftKey })
    );
  });
};

// gets node by children indices. If empty array, returns root
let getNodeByPos = (nodePos = []) => {
  let node = treeA;
  nodePos.forEach(pos => {
    node = node.children[pos];
  });
  return node;
};

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("<TreeKey>", () => {
  test("should match snapshot", () => {
    const props = {
      selectedNodes: [treeA],
      expandedNodes: [treeA],
      multiSelection: true,
    };
    renderTestComponent(props);
    expect(container.innerHTML).toMatchSnapshot();
  });

  describe("node selection with handleKeyDown (arrow up and arrow down keys)", () => {
      test.each([
        [ARROW_UP, [0], []],
        [ARROW_UP, [1], [0]],
        [ARROW_UP, [0], []],
        // // if previous sibling has children and is expanded
        [ARROW_UP, [3], [2, 4], [[], [2]]],
        // // if previous sibling has children but it's collapsed
        [ARROW_UP, [3], [2]],
        [ARROW_DOWN, [], [0]],
        [ARROW_DOWN, [0], [1]],
        [ARROW_DOWN, [2, 4], [3], [[], [2]]],
        // // if current node has children and is expanded
        [ARROW_DOWN, [2], [2, 0], [[], [2]]],
        // // if current node has children but is not expanded
        [ARROW_DOWN, [2], [3]],
      ])(
        "by pressing key %s, if starting node is from position %s then next node is in position %s",
        (key, startNodePos, endNodePos, expandedNodesPos = [[]]) => {
          let startNode = getNodeByPos(startNodePos);
          let endNode = getNodeByPos(endNodePos);
          let expandedNodes = expandedNodesPos.map((pos) => getNodeByPos(pos));
          const props = {
            selectedNodes: [startNode],
            expandedNodes,
            multiSelection: true,
          };

          renderTestComponent(props);

          pressKeyOnTree(key, false);
          let selectedElements = getSelectedElements();
          expect(selectedElements.length).toBe(1);
          expect(selectedElements[0].innerHTML).toBe(endNode.name);
        }
      );

      test.each([
        [ARROW_UP, []],
        [ARROW_DOWN, [4]],
      ])(
        "if nodes are on the edges, by pressing key %s, if starting node is nothing changes",
        (key, startNodePos) => {
          let startNode = getNodeByPos(startNodePos);
          const props = {
            selectedNodes: [startNode],
            expandedNodes: [treeA],
            multiSelection: true,
          };

          renderTestComponent(props);

          let selectedElements = getSelectedElements();

          expect(selectedElements.length).toBe(1);
          expect(selectedElements[0].innerHTML).toBe(startNode.name);

          pressKeyOnTree(key, false);
          expect(selectedElements.length).toBe(1);
          expect(selectedElements[0].innerHTML).toBe(startNode.name);
        }
      );

      test("when SHIFT modifier is true, the new node will be added to the previous instead of replacing it", () => {
        const props = {
          selectedNodes: [getNodeByPos([0])],
          expandedNodes: [getNodeByPos([]), getNodeByPos([2])],
          multiSelection: true,
        };

        renderTestComponent(props);
        let selectedElements = getSelectedElements();

        expect(selectedElements.length).toBe(1);
        expect(selectedElements[0].innerHTML).toBe(getNodeByPos([0]).name);

        function testKeyPress(key, expectedNodes) {
          pressKeyOnTree(key, true);
          let selectedElements = getSelectedElements();

          let expectedNames = expectedNodes.map(
            (node) => getNodeByPos(node).name
          );
          expect(selectedElements.length).toBe(expectedNames.length);
          for (let i = 0; i < selectedElements.length; i++) {
            expect(expectedNames).toContain(selectedElements[i].innerHTML);
          }
        }

        testKeyPress(ARROW_DOWN, [[0], [1]]);
        testKeyPress(ARROW_DOWN, [[0], [1], [2]]);
        testKeyPress(ARROW_DOWN, [[0], [1], [2], [2, 0]]);
        testKeyPress(ARROW_DOWN, [[0], [1], [2], [2, 0], [2, 1]]);
        testKeyPress(ARROW_DOWN, [
          [2],
          [0],
          [1],
          [2, 1],
          [2, 0],
          [2, 2], // grandchild 2 is collapsed, so nextnode isn't a child, but a sibling, other wise added node would be [2, 1, 0]
        ]);
        testKeyPress(ARROW_UP, [[0], [1], [2], [2, 0], [2, 1]]);
        testKeyPress(ARROW_UP, [[0], [1], [2], [2, 0]]);

        selectedElements = getSelectedElements();

        clickNode([2, 0], false, false);
        selectedElements = getSelectedElements();
        expect(selectedElements.length).toBe(1);
        expect(selectedElements[0].innerHTML).toBe(getNodeByPos([2, 0]).name);

        testKeyPress(ARROW_UP, [[2, 0], [2]]);
        testKeyPress(ARROW_UP, [[2, 0], [2], [1]]);
      });
  });

  describe("node selection with mouse click", () => {
    test("when there is neither CTRL nor SHIFT modifiers, select the clicked node", () => {
      const props = {
        selectedNodes: [getNodeByPos([0])],
        expandedNodes: [getNodeByPos([]), getNodeByPos([2])],
        multiSelection: true,
      };

      renderTestComponent(props);

      clickNode([2, 1], false, false);
      let selectedElements = getSelectedElements();
      expect(selectedElements.length).toBe(1);
      expect(selectedElements[0].innerHTML).toBe(
        treeA.children[2].children[1].name
      );

      clickNode([1], false, false);
      selectedElements = getSelectedElements();
      expect(selectedElements.length).toBe(1);
      expect(selectedElements[0].innerHTML).toBe(getNodeByPos([1]).name);
    });

    test("when there is CTRL modifier, is node is selected, remove it; otherwise add it", () => {
      const props = {
        selectedNodes: [getNodeByPos([0])],
        expandedNodes: [getNodeByPos([]), getNodeByPos([2])],
        multiSelection: true,
      };

      renderTestComponent(props);

      clickNode([2, 1], true, false);
      let selectedElements = getSelectedElements();
      expect(selectedElements.length).toBe(2);
      expect(selectedElements[0].innerHTML).toBe(getNodeByPos([0]).name);
      expect(selectedElements[1].innerHTML).toBe(getNodeByPos([2, 1]).name);

      clickNode([1], true, false);
      selectedElements = getSelectedElements();
      expect(selectedElements.length).toBe(3);
      expect(selectedElements[0].innerHTML).toBe(getNodeByPos([0]).name);
      expect(selectedElements[1].innerHTML).toBe(getNodeByPos([1]).name);
      expect(selectedElements[2].innerHTML).toBe(getNodeByPos([2, 1]).name);

      // clicking on currently selected node removes it from list
      clickNode([2, 1], true, false);
      selectedElements = getSelectedElements();
      expect(selectedElements.length).toBe(2);
      expect(selectedElements[0].innerHTML).toBe(getNodeByPos([0]).name);
      expect(selectedElements[1].innerHTML).toBe(getNodeByPos([1]).name);
    });

    test("when there is SHIFT modifier, using last node clicked before SHIFT pressed as anchor, add or remove nodes accordingly", () => {
      const props = {
        selectedNodes: [getNodeByPos([2])],
        expandedNodes: [getNodeByPos([]), getNodeByPos([2])],
        multiSelection: true,
      };

      let testClickWithShift = (clickedNodePos, expectedNodesPos) => {
        clickNode(clickedNodePos, false, true);
        let selectedElements = getSelectedElements();
        let expectedNames = expectedNodesPos.map(nodePos => getNodeByPos(nodePos).name);
        expect(selectedElements.length).toBe(expectedNames.length);
        for (let i = 0; i < selectedElements.length; i++) {
          expect(expectedNames).toContain(selectedElements[i].innerHTML);
        }
      };

      renderTestComponent(props);

      // with 2 expanded, range goest from 2, through all children until 3
      testClickWithShift([3], [
        [2],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [2, 4],
        [3],
      ]);

      testClickWithShift([2, 1], [
        [2],
        [2, 0],
        [2, 1],
      ]);

      // by pressing root, range inverts direction from 2 towards root
      testClickWithShift([], [
        [2],
        [1],
        [0],
        [],
      ]);
    });
  });

  describe('expansion toggle', () => {
    const COLLAPSED_STYLE = 'rotate(0)';
    const EXPANDED_STYLE = 'rotate(90deg)';

    // get transform style for selectednode or by pos if specified
    let getNodeToggleStatus = (nodePos) => {
      let nodeEl = nodePos ? document.querySelector(getNodeSelectorByPos(nodePos)) : getSelectedElements(false)[0];
      let rotation = nodeEl.querySelector('polygon').style.transform;
      let hasChildren = !!nodeEl.querySelector('ul');
      return { rotation, hasChildren };
    }

    let testNodeRotationStatus = (isExpanded, nodePos) => {
      let status = getNodeToggleStatus(nodePos);
      let style = isExpanded ? EXPANDED_STYLE : COLLAPSED_STYLE;
      expect(status.rotation).toBe(style);
      expect(status.hasChildren).toBe(isExpanded);
    };

    test('by pressing left and arrow keys collapse and expand respectively', () => {
      
        let startNode = getNodeByPos([2]);
        const props = {
          selectedNodes: [startNode],
          expandedNodes: [treeA],
          multiSelection: true,
        };
        
        renderTestComponent(props);

        // node of pos [2] is not in expandedNodes, so result is isExpanded is false
        testNodeRotationStatus(false);

        pressKeyOnTree(ARROW_RIGHT);
        testNodeRotationStatus(true);

        pressKeyOnTree(ARROW_RIGHT);
        testNodeRotationStatus(true);

        pressKeyOnTree(ARROW_LEFT);
        testNodeRotationStatus(false);

        pressKeyOnTree(ARROW_LEFT);
        testNodeRotationStatus(false);
    });

    test('by clicking on the toggle it either collapses or expands depending on previous state', () => {
      let rootChild3Pos = [2];
      let rootNode = getNodeByPos();
      let rootChild3 = getNodeByPos(rootChild3Pos);
      const props = {
          selectedNodes: [rootNode],
          expandedNodes: [rootNode, rootChild3],
          multiSelection: true,
        };

        renderTestComponent(props);
        testNodeRotationStatus(true, rootChild3Pos);

        clickToggle(rootChild3Pos);
        testNodeRotationStatus(false, rootChild3Pos);

        clickToggle(rootChild3Pos);
        testNodeRotationStatus(true, rootChild3Pos);
    });
  });
});
