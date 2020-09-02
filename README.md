# react-treekey

[![npm package](https://img.shields.io/npm/v/react-treekey/latest.svg)](https://www.npmjs.com/package/react-treekey)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

A [React](https://reactjs.org/) Tree View Component with Keyboard Navigation. Intuitive and Customisable.

### Installation

```
npm install react-treekey --save
```

### [Example](http://pesteves8.github.io/react-treekey/)

The [example page](http://pesteves8.github.io/react-treekey/) includes both a basic no config usage of the component as well as another one with customized elements and manual management of current selected and expanded nodes.

The [code](https://github.com/PEsteves8/react-treekey/tree/master/examples/src) for the examples can be found here:

[No Config Example](https://github.com/PEsteves8/react-treekey/blob/master/examples/src/BasicTree.js)

[Customized Example](https://github.com/PEsteves8/react-treekey/blob/master/examples/src/CustomTree.js)

### Usage

Here is the minimum code required, **it's all you need**:

(The examples page include a few extra details to help with styling)

```jsx
import React from "react";
import { TreeKey } from "../../src";

let treeA = {
  name: "root",
  children: [
    {
      name: "child1",
    },
    {
      name: "child2",
    },
    {
      name: "child3",
      children: [
        {
          name: "grandchild1",
        },
        {
          name: "grandchild2",
          children: [
            {
              name: "greatgrandchild1",
            },
            {
              name: "greatgrandchild2",
            },
          ],
        },
        {
          name: "grandchild3",
        },
        {
          name: "grandchild4",
        },
        {
          name: "grandchild5",
        },
      ],
    },
    {
      name: "child4",
    },
  ],
};

export class BasicTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // the tree's default starting selected node is the root if we don't pass it manually
      // this prop is here only to keep track of the current selected node, so we're initing it as the root
      selectedNode: treeA,
    };

    this.onSelectNode = this.onSelectNode.bind(this);
  }

  onSelectNode(node) {
    console.log(node);
    this.setState({ selectedNode: node });
  }

  render() {
    return (
        <TreeKey tree={treeA} onSelectNode={this.onSelectNode} />
        <pre>{JSON.stringify(this.state.selectedNode, undefined, 2)}</pre>
    );
  }
}
```

### Props

#### data
`PropTypes.oneOfType([PropTypes.object]).isRequired`

The tree structure that gets passed down to the component. It can include any properties you like, as long as a given property's children are contained in an array called 'children' (see data example above).

This structure gets mutated with non-enumerable properties prepended with a dollar sign ($) that contain references to each properties' siblings, parents, and children. They get automatically stripped out if you deserialize the structure back to a JSON string, so you can mutate and save the tree state without worrying about that. You can also use these properties for the sake of other advanced operations you might want to make, including CRUD operations. ([see customized examples](https://github.com/PEsteves8/react-treekey/blob/master/examples/src/CustomTree.js)). These properties are `$parent`, `$firstChild`, `$lastChild`, `$previousNode` and `$nextNode`.

**NOTE:** The component was built mostly for read-only use cases. A couple of CRUD operations were added in the customized example for fun, but they're not as efficient as if they were built natively (with a flat map based data structure the process wouldn't require full tree traversals like in the example). Currently, following a CRUD operation, it's necessary to perform a serialization followed by deserialization (to strip the metadata props), as well as an increment to the 'key' prop in the TreeKey component to force the constructor to rerun the metadata attribution. Unless the data tree is huge, the approach from the example should work just fine.

### multiSelection
`multiSelection: PropTypes.bool`
Indicates whether selecting multiple nodes is allowed. If `false`, SHIFT and CTRL keys have no effect and `onSelectNode` gets called with only the selected node. Otherwise, multiselection works as normal and `onSelectedNode` gets called with an array of selected nodes.

### onSelectNode
`onSelectNode: PropTypes.func`
Gets called every time a node gets selected (whether by mouse click or keyboard control). If you're passing the selected nodes list manually, you need to use this function to keep the state updated. If the `multiselection` prop is `false`, it gets called with the single selected node, otherwise it gets called with the array of selected nodes (even if it's just one).

### onExpandNode
`onSelectNode: PropTypes.func`
Gets called every time a node gets expanded/collapsed (whether by mouse click or keyboard control). Like with the selected nodes, if you're passing the expanded nodes list manually, you need to use this function to keep the state updated.

### selectedNodes
`PropTypes.arrayOf(PropTypes.object)`
The list of selected nodes. This allows you to manually decide which nodes should be displayed as selected. If omitted, the component automatically selects the root on initialization and handles the selection by itself. This is always an array, whether or not `multiselection` is `true`.

### expandedNodes
`PropTypes.arrayOf(PropTypes.object)`
The list of expanded nodes. This allows you to manually decide which nodes should be expanded. If omitted, the component automatically expands the root on initialization and handles the expansion automatically by itself.

### style
```
PropTypes.shape({ 
    root: PropTypes.object,
    node: PropTypes.object,
    listItem: PropTypes.object,
    nodeToggleWrapper: PropTypes.object,
    nodeToggleSvg: PropTypes.object,
    nestedList: PropTypes.object
    })
```
   
An object with the styling for each of the main components. Any property that isn't set will be set to the default found [here](https://github.com/PEsteves8/react-treekey/blob/master/src/defaultTreeStyles.js).

### templates
`PropTypes.shape({ header: PropTypes.func, toggle: PropTypes.func })`
If you want to override the components for the header or the toggle, to include specific styles or behaviors, use this object to override one or both components.

The default templates are [here](https://github.com/PEsteves8/react-treekey/blob/master/src/TreeViewDefaultTemplates.js).

Example:

```jsx
let templates = {
  toggle(isExpanded) {
    // this actually gets called with the node argument as well
    // it's omitted, because the default template doesn't make use of it
    const svgStyles = {
      fill: "white",
      strokeWidth: 0,
      transformOrigin: "center",
      transform: `rotate(${isExpanded ? "90deg" : "0"})`,
    };

    let { height, width, points } = styles.nodeToggleSvg;

    return (
      <svg height={height} width={width}>
        <polygon points={points} style={svgStyles} />
      </svg>
    );
  },

  header(node) {
    return <span style={{ paddingLeft: "7px" }}>{node.name}</span>;
  },
};
```
