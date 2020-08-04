import { setTreeInternalProperties } from "../TreeViewHelpers";
import { treeA } from "../../examples/src/data";

describe("TreeViewHelpers", () => {
  test("setTreeInternalProperties sets a tree with its internal meta properties", () => {
    setTreeInternalProperties(treeA);

    expect(treeA.name).toBe('root');
    expect(treeA.$firstChild).toBe(treeA.$children[0]);
    expect(treeA.$lastChild).toBe(treeA.$children[4]);

    expect(treeA.$children[0].name).toBe('child1');
    expect(treeA.$children[0].$nextNode).toBe(treeA.$children[1]);
    expect(treeA.$children[0].$parent).toBe(treeA);
    expect(treeA.$children[0].$previousNode).toBeNull();
    expect(treeA.$children[0].$children).toBeUndefined();

    expect(treeA.$children[2].name).toBe('child3');
    expect(treeA.$children[2].$previousNode).toBe(treeA.$children[1]);
    expect(treeA.$children[2].$children[0].name).toBe('grandchild1');
    expect(treeA.$children[2].$children[0].$parent).toBe(treeA.$children[2]);
    expect(treeA.$children[2].$children[0].$previousNode).toBeNull();
    expect(treeA.$children[2].$children[4].$nextNode).toBeNull();

    expect(treeA.$children[4].name).toBe('child5');
    expect(treeA.$children[4].$previousNode).toBe(treeA.$children[3]);
    expect(treeA.$children[4].$nextNode).toBeNull();
  });
});
