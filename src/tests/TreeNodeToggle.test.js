import React from "react";
import TreeNodeToggle from "../TreeNodeToggle";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import * as templates from "../TreeViewDefaultTemplates";

const mockNode = {
  name: "some node",
};
const isExpanded = true;
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

describe("<TreeNodeToggle>", () => {
  test("should match snapshot with correct template", () => {
    let template = jest.fn();
    template.mockImplementation(() => <span>some node</span>);

    act(() => {
      render(
        <TreeNodeToggle
          template={template}
          isExpanded={isExpanded}
          node={mockNode}
          expandedNodes={expandedNodes}
        ></TreeNodeToggle>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(template).toHaveBeenCalledTimes(1);
    expect(template).toHaveBeenCalledWith(isExpanded, mockNode);
  });

  test("calls default toggle if no template is given", () => {
    const spy = jest.spyOn(templates, "defaultToggle");

    act(() => {
      render(
        <TreeNodeToggle
          node={mockNode}
          isExpanded={isExpanded}
          expandedNodes={expandedNodes}
        ></TreeNodeToggle>,
        container
      );
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(isExpanded);
    spy.mockRestore();
  });
});
