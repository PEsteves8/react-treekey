import { defaultHeader, defaultToggle } from "../TreeViewDefaultTemplates";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

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

describe("<TreeViewDefaultTemplates>", () => {
  test("should match default snapshot", () => {
    act(() => {
      render(defaultHeader(mockNode), container);
    });

    expect(container.innerHTML).toMatchSnapshot();
  });

  test("should match default snapshot", () => {
    act(() => {
      render(defaultToggle(true), container);
    });

    expect(container.innerHTML).toMatchSnapshot();

    act(() => {
      render(defaultToggle(false), container);
    });

    expect(container.innerHTML).toMatchSnapshot();
  });
});
