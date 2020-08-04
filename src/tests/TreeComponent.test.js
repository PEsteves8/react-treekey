import React, { useState } from "react";
import { TreeKey } from "../TreeComponent";
import { treeA } from "../../examples/src/data";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

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
      expandedNodes: new Set([treeA]),
      multiSelection: true,
    };
    act(() => {
      render(<TreeKeyTestComponent {...props} />, container);
    });
    expect(container.innerHTML).toMatchSnapshot();
  });

  describe("handleKeyDown", () => {
    describe("when pressing up or down arrow keys", () => {
      test.each([
        ["ArrowUp", treeA.$children[0], treeA],
        ["ArrowUp", treeA.$children[1], treeA.$children[0]],
        ["ArrowUp", treeA.$children[0], treeA],
        // if previous sibling has children and is expanded
        [
          "ArrowUp",
          treeA.$children[3],
          treeA.$children[2].$children[4],
          new Set([treeA, treeA.$children[2]]),
        ],
        // if previous sibling has children but it's collapsed
        ["ArrowUp", treeA.$children[3], treeA.$children[2], new Set([treeA])],

        ["ArrowDown", treeA, treeA.$children[0], new Set([treeA])],
        ["ArrowDown", treeA.$children[0], treeA.$children[1], new Set([treeA])],
        [
          "ArrowDown",
          treeA.$children[2].$children[4],
          treeA.$children[3],
          new Set([treeA, treeA.$children[2]]),
        ],
        // if current node has children and is expanded
        [
          "ArrowDown",
          treeA.$children[2],
          treeA.$children[2].$children[0],
          new Set([treeA, treeA.$children[2]]),
        ],
        // if current node has children but is not expanded
        ["ArrowDown", treeA.$children[2], treeA.$children[3]],
      ])(
        "by pressing key %s, if starting node is %s next node is %s",
        (key, startNode, endNode, expandedNodes = new Set([treeA])) => {
          const props = {
            selectedNodes: [startNode],
            expandedNodes,
            multiSelection: true,
          };

          act(() => {
            render(<TreeKeyTestComponent {...props} />, container);
          });

          const treeEl = container.querySelector("ul");
          act(() => {
            treeEl.dispatchEvent(
              new KeyboardEvent("keydown", { bubbles: true, key })
            );
          });

          const selectedElements = document.querySelectorAll(
            ".treeview-selected-node > div > span"
          );
          expect(selectedElements.length).toBe(1);
          expect(selectedElements[0].innerHTML).toBe(endNode.name);
        }
      );

      test.each([
        ["ArrowUp", treeA],
        ["ArrowDown", treeA.$children[4]],
      ])(
        "if nodes are on the edges, by pressing key %s, if starting node is nothing changes",
        (key, startNode) => {
          const props = {
            selectedNodes: [startNode],
            expandedNodes: new Set([treeA]),
            multiSelection: true,
          };

          act(() => {
            render(<TreeKeyTestComponent {...props} />, container);
          });

          const selectedElements = document.querySelectorAll(
            ".treeview-selected-node > div > span"
          );

          expect(selectedElements.length).toBe(1);
          expect(selectedElements[0].innerHTML).toBe(startNode.name);

          const treeEl = container.querySelector("ul");
          act(() => {
            treeEl.dispatchEvent(
              new KeyboardEvent("keydown", { bubbles: true, key })
            );
          });

          expect(selectedElements.length).toBe(1);
          expect(selectedElements[0].innerHTML).toBe(startNode.name);
        }
      );

      test("when SHIFT modifier is true, the new node will be added to the previous instead of replacing it", () => {
        const props = {
          selectedNodes: [treeA.$children[0]],
          expandedNodes: new Set([treeA, treeA.$children[2]]),
          multiSelection: true,
        };

        act(() => {
          render(<TreeKeyTestComponent {...props} />, container);
        });
        let selectedElements = document.querySelectorAll(
          ".treeview-selected-node > div > span"
        );

        expect(selectedElements.length).toBe(1);
        expect(selectedElements[0].innerHTML).toBe("child1");

        function testKeyPress(key, expectedNames) {
          let treeEl = container.querySelector("ul");
          
          act(() => {
            treeEl.dispatchEvent(
              new KeyboardEvent("keydown", {
                bubbles: true,
                key,
                shiftKey: true,
              })
            );
          });

          let selectedElements = document.querySelectorAll(
            ".treeview-selected-node > div > span"
          );
          
          expect(selectedElements.length).toBe(expectedNames.length);
          for (let i = 0; i < selectedElements.length; i++) {
            expect(expectedNames).toContain(selectedElements[i].innerHTML);
          }
        }

        testKeyPress("ArrowDown", ["child1", "child2"]);
        testKeyPress("ArrowDown", ["child1", "child2", "child3"]);
        testKeyPress("ArrowDown", [
          "child1",
          "child2",
          "child3",
          "grandchild1",
        ]);
        testKeyPress("ArrowDown", [
          "child1",
          "child2",
          "child3",
          "grandchild1",
          "grandchild2"
        ]);
        testKeyPress("ArrowDown", [
          "child1",
          "child2",
          "child3",
          "grandchild1",
          "grandchild2",
          "grandchild3", // grandchild 2 is collapsed, so nextnode isn't a child, but a sibling
        ]);
        testKeyPress("ArrowUp", ["child1", "child2", "child3", "grandchild1", "grandchild2"]);
        testKeyPress("ArrowUp", ["child1", "child2", "child3", "grandchild1"]);

        selectedElements = document.querySelectorAll(".treeview-selected-node > div > span");
        act(() => {
          selectedElements[3].dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        selectedElements = document.querySelectorAll(".treeview-selected-node > div > span");
        expect(selectedElements.length).toBe(1);
        expect(selectedElements[0].innerHTML).toBe("grandchild1");

        testKeyPress("ArrowUp", ["grandchild1", "child3"]);
        testKeyPress("ArrowUp", ["grandchild1", "child3", "child2"]);
      });
    });
  });

  describe("mouse click", () => {
    test("when there is neither CTRL nor SHIFT modifiers, select the clicked node", () => {
      const props = {
        selectedNodes: [treeA.$children[0]],
        expandedNodes: new Set([treeA, treeA.$children[2]]),
        multiSelection: true,
      };

      act(() => {
        render(<TreeKeyTestComponent {...props} />, container);
      });

      act(() => {
        document.querySelector('ul > li > ul > li:nth-child(3) > ul > li:nth-child(2)').dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      let selectedElements = document.querySelectorAll(
        ".treeview-selected-node > div > span"
      );
      expect(selectedElements.length).toBe(1);
      expect(selectedElements[0].innerHTML).toBe(treeA.$children[2].$children[1].name);

      act(() => {
        document.querySelector('ul > li > ul > li:nth-child(2)').dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      selectedElements = document.querySelectorAll(
        ".treeview-selected-node > div > span"
      );
      expect(selectedElements.length).toBe(1);
      expect(selectedElements[0].innerHTML).toBe(treeA.$children[1].name);
    });

    test("when there is CTRL modifier, is node is selected, remove it; otherwise add it", () => {
      const props = {
        selectedNodes: [treeA.$children[0]],
        expandedNodes: new Set([treeA, treeA.$children[2]]),
        multiSelection: true,
      };

      act(() => {
        render(<TreeKeyTestComponent {...props} />, container);
      });

      act(() => {
        document.querySelector('ul > li > ul > li:nth-child(3) > ul > li:nth-child(2)').dispatchEvent(new MouseEvent("click", { bubbles: true, ctrlKey: true }));
      });

      let selectedElements = document.querySelectorAll(
        ".treeview-selected-node > div > span"
      );
      expect(selectedElements.length).toBe(2);
      expect(selectedElements[0].innerHTML).toBe(treeA.$children[0].name);
      expect(selectedElements[1].innerHTML).toBe(treeA.$children[2].$children[1].name);

      act(() => {
        document.querySelector('ul > li > ul > li:nth-child(2)').dispatchEvent(new MouseEvent("click", { bubbles: true, ctrlKey: true }));
      });
      selectedElements = document.querySelectorAll(
        ".treeview-selected-node > div > span"
      );
      expect(selectedElements.length).toBe(3);
      expect(selectedElements[0].innerHTML).toBe(treeA.$children[0].name);
      expect(selectedElements[1].innerHTML).toBe(treeA.$children[1].name);
      expect(selectedElements[2].innerHTML).toBe(treeA.$children[2].$children[1].name);

      // clicking on currently selected node removes it from list
      act(() => {
        document.querySelector('ul > li > ul > li:nth-child(3) > ul > li:nth-child(2)').dispatchEvent(new MouseEvent("click", { bubbles: true, ctrlKey: true }));
      });
      selectedElements = document.querySelectorAll(".treeview-selected-node > div > span");
      expect(selectedElements.length).toBe(2);
      expect(selectedElements[0].innerHTML).toBe(treeA.$children[0].name);
      expect(selectedElements[1].innerHTML).toBe(treeA.$children[1].name);
    });

    test("when there is SHIFT modifier, using last node clicked before SHIFT pressed as anchor, add or remove nodes accordingly", () => {
      const props = {
        selectedNodes: [treeA.$children[2]],
        expandedNodes: new Set([treeA, treeA.$children[2]]),
        multiSelection: true,
      };

      act(() => {
        render(<TreeKeyTestComponent {...props} />, container);
      });

      act(() => {
        document.querySelector('.treeview-root > li > ul > li:nth-child(4)')
          .dispatchEvent(new MouseEvent("click", { bubbles: true, shiftKey: true }));
      });

      let selectedElements = document.querySelectorAll(
        ".treeview-selected-node > div > span"
      );
      let expectedNodes = [treeA.$children[2],
        treeA.$children[2].$children[0], treeA.$children[2].$children[1], treeA.$children[2].$children[2], treeA.$children[2].$children[3], treeA.$children[2].$children[4], treeA.$children[3]
      ];
      let expectedNames = expectedNodes.map(node => node.name);
      expect(selectedElements.length).toBe(expectedNames.length);
      for (let i = 0; i < selectedElements.length; i++) {
        expect(expectedNames).toContain(selectedElements[i].innerHTML);
      }

      
      act(() => {
        document.querySelector('ul > li > ul > li:nth-child(3) > ul > li:nth-child(2)')
          .dispatchEvent(new MouseEvent("click", { bubbles: true, shiftKey: true }));
      });
      selectedElements = document.querySelectorAll(
        ".treeview-selected-node > div > span"
      );
      expectedNodes = [treeA.$children[2],
        treeA.$children[2].$children[0], treeA.$children[2].$children[1]];
      expectedNames = expectedNodes.map(node => node.name);
      expect(selectedElements.length).toBe(expectedNames.length);
      for (let i = 0; i < selectedElements.length; i++) {
        expect(expectedNames).toContain(selectedElements[i].innerHTML);
      }



      act(() => {
        document.querySelector('ul > li')
          .dispatchEvent(new MouseEvent("click", { bubbles: true, shiftKey: true }));
      });
      selectedElements = document.querySelectorAll(
        ".treeview-selected-node > div > span"
      );
      expectedNodes = [treeA.$children[2],
        treeA.$children[1], treeA.$children[0], treeA];
      expectedNames = expectedNodes.map(node => node.name);
      expect(selectedElements.length).toBe(expectedNames.length);
      for (let i = 0; i < selectedElements.length; i++) {
        expect(expectedNames).toContain(selectedElements[i].innerHTML);
      }
    });
  });
});