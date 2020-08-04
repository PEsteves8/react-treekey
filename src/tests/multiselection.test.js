import { multiselection } from "../multiselection";
import { treeA } from "../../examples/src/data";
import { setTreeInternalProperties } from '../TreeViewHelpers';

/*
* Technically these are implementation details of TreeComponent, but given this module's complexity
* it's better for it to have its own testing to make debugging easier in case something accidentally breaks.
*/
setTreeInternalProperties(treeA);
let tree;
let getNodesUsingKeyModifiers = multiselection().getNodesUsingKeyModifiers;
beforeEach(() => {
    tree = require("../../examples/src/data").treeA;
    jest.resetModules();
  });
describe("multiselection", () => {
  describe("when neither CTRL nor SHIFT keys are being pressed", () => {
    test("returns a list with only the selectedNode, whether or not the node is already present", () => {
      let event = {};

      let selectedNodes = [];
      let expandedNodes = [];

      let result;
      let expected;

      result = getNodesUsingKeyModifiers(
        tree.$children[0],
        event,
        selectedNodes,
        expandedNodes
      );
      expected = [tree.$children[0]];
      expect(result).toEqual(expected);

      result = getNodesUsingKeyModifiers(
        tree.$children[0],
        event,
        selectedNodes,
        expandedNodes
      );
      expect(result).toEqual([tree.$children[0]]);

      result = getNodesUsingKeyModifiers(
        tree.$children[1],
        event,
        selectedNodes,
        expandedNodes
      );
      expected = [tree.$children[1]];
      expect(result).toEqual(expected);
    });
  });

  describe("when the CTRL key is being pressed", () => {
    test("if the event type is 'click', removes or adds the node to the list, depending on whether it was already present", () => {
      let event = {
        ctrlKey: true,
        type: "click",
      };

      let selectedNodes = [];
      let expandedNodes = [];

      let result;
      let expected;
      result = getNodesUsingKeyModifiers(
        tree.$children[0],
        event,
        selectedNodes,
        expandedNodes
      );
      expected = [tree.$children[0]];
      expect(result).toEqual(expected);

      selectedNodes = result;
      result = getNodesUsingKeyModifiers(
        tree.$children[0],
        event,
        selectedNodes,
        expandedNodes
      );
      expected = [];
      expect(result).toEqual(expected);

      selectedNodes = result;
      result = getNodesUsingKeyModifiers(
        tree.$children[1],
        event,
        selectedNodes,
        expandedNodes
      );
      expected = [tree.$children[1]];
      expect(result).toEqual(expected);

      selectedNodes = result;
      result = getNodesUsingKeyModifiers(
        tree.$children[0],
        event,
        selectedNodes,
        expandedNodes
      );

      selectedNodes = result;
      result = getNodesUsingKeyModifiers(
        tree.$children[2].$children[1],
        event,
        selectedNodes,
        expandedNodes
      );
      expected = [
        tree.$children[1],
        tree.$children[0],
        tree.$children[2].$children[1],
      ];
      expect(result).toEqual(expected);
    });
  });

  describe("when the SHIFT key is being pressed", () => {
    test("if selectedNodes is empty, return empty array", () => {
     
      let event = {
        shiftKey: true,
      };

      let selectedNodes = [];
      let expandedNodes = new Set();

      let result;
      let expected;
      
      result = getNodesUsingKeyModifiers(
        tree.$children[0],
        event,
        selectedNodes,
        expandedNodes
      );
      expected = [];
      expect(result).toEqual(expected);
    });

    test("select all next, previous, parent or parent sibling nodes accordingly if their parent is expanded", () => {
      let result;
      let expected;

      // select first node as root (setting anchor node)
      let event = { };
      let selectedNodes = [];
      let expandedNodes = new Set();
      result = getNodesUsingKeyModifiers(
        treeA,
        event,
        selectedNodes,
        expandedNodes
      );

      // expand root and one of children
      // selected nodes include range from root to new node and only include visible nodes (parent's expanded)
      event = {
        shiftKey: true,
      };
      expandedNodes = new Set([treeA, treeA.$children[2]]);
      selectedNodes = result;
      result = getNodesUsingKeyModifiers(
        treeA.$children[2].$children[3],
        event,
        selectedNodes,
        expandedNodes
      );
      expected = [
        treeA,
        treeA.$children[0],
        treeA.$children[1],
        treeA.$children[2],
        treeA.$children[2].$children[0],
        treeA.$children[2].$children[1],
        treeA.$children[2].$children[2],
        treeA.$children[2].$children[3],
      ];
      expect(result).toEqual(expected);

      // reset to only one selected node
      event = {};
      selectedNodes = result;
      result = getNodesUsingKeyModifiers(
        treeA.$children[2].$children[1],
        event,
        selectedNodes,
        expandedNodes
      );
      expected = [treeA.$children[2].$children[1]];
      expect(result).toEqual(expected);

      // select range above including ancestors up to root
      event = {
        shiftKey: true,
      };
      selectedNodes = result;
      result = getNodesUsingKeyModifiers(
        treeA,
        event,
        selectedNodes,
        expandedNodes
      );
      expected = [
        treeA.$children[2].$children[1],
        treeA,
        treeA.$children[0],
        treeA.$children[1],
        treeA.$children[2],
        treeA.$children[2].$children[0],
      ];
      expect(result).toEqual(expected);

      // select range below the previous first solo node
      // removes nodes from root to anchor and adds from anchor to new nodes
      event = {
        shiftKey: true,
      };
      selectedNodes = result;
      result = getNodesUsingKeyModifiers(
        treeA.$children[4],
        event,
        selectedNodes,
        expandedNodes
      );
      expected = [
        treeA.$children[2].$children[1],
        treeA.$children[2].$children[2],
        treeA.$children[2].$children[3],
        treeA.$children[2].$children[4],
        treeA.$children[3],
        treeA.$children[4],
      ];
      expect(result).toEqual(expected);
    });
  });
});
