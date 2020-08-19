import React from "react";
import TreeNode from "../TreeNode";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

const mockNode = {
  name: "some node",
};

const expandedNodes = [];

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

describe("<TreeNode>", () => {
  test("should match snapshots", () => {
    act(() => {
      render(
        <TreeNode
          node={mockNode}
          expandedNodes={expandedNodes}
          selectedNodes={[]}
          handleToggle={jest.fn()}
        ></TreeNode>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();

    act(() => {
      render(
        <TreeNode
          node={mockNode}
          expandedNodes={expandedNodes}
          selectedNodes={[mockNode]}
          handleToggle={jest.fn()}
        ></TreeNode>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
  });

  test("calls onSelectNode when clicked", () => {
    const selectNewNode = jest.fn();

    act(() => {
      render(
        <TreeNode
          selectNewNode={selectNewNode}
          node={mockNode}
          expandedNodes={expandedNodes}
          selectedNodes={[]}
          handleToggle={jest.fn()}
        ></TreeNode>,
        container
      );
    });

    const el = container.querySelector("li");
    act(() => {
      el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(selectNewNode).toHaveBeenCalledTimes(1);
  });
});
