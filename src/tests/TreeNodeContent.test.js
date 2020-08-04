import React from "react";
import TreeNodeContent from "../TreeNodeContent";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import * as templates from "../TreeViewDefaultTemplates";

const mockNode = {
  name: "some node",
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

describe("<TreeNode>", () => {
  test("should match snapshot calling correct template", () => {
    let template = jest.fn();
    template.mockImplementation(() => <span>some node</span>);

    act(() => {
      render(
        <TreeNodeContent template={template} node={mockNode}></TreeNodeContent>,
        container
      );
    });

    expect(container.innerHTML).toMatchSnapshot();
    expect(template).toHaveBeenCalledTimes(1);
    expect(template).toHaveBeenCalledWith(mockNode);
  });

  test("calls default template if no template is given", () => {
    const spy = jest.spyOn(templates, "defaultHeader");

    act(() => {
      render(<TreeNodeContent node={mockNode}></TreeNodeContent>, container);
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockNode);
    spy.mockRestore();
  });
});
