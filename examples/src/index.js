import React from 'react';
import { render } from 'react-dom';
import { TreeComponent } from '../../src';

import { setTreeInternalProperties } from '../../src/TreeViewHelpers';

let tree = {
    name: 'poo',
    $children: [{
        name: 'child1'
    }, {
        name: 'child2'
    }, {
        name: 'child3'
    }, {
        name: 'child4'
    }, {
        name: 'child5',
        $children: [{
            name: 'grandchild1'
        },
        {
            name: 'grandchild2'
        },
        {
            name: 'grandchild3'
        },
        {
            name: 'grandchild4',
            children: [{
                name: 'greatgrandchild1'
            },
            {
                name: 'greatgrandchild2'
            },
            {
                name: 'greatgrandchild3'
            },
            {
                name: 'greatgrandchild4'
            }]

        }]
    }]
}

class App extends React.Component {
    constructor(props) {
        super(props);

        let setupTree = {...tree};
        setTreeInternalProperties(setupTree);

        this.state = {
            tree: setupTree,
            selectedNode: null,
            iconsEnabled: true
        };

        this.onSelectNode = this.onSelectNode.bind(this);
    }

    onSelectNode(node) {
        console.log("clicked to select node");
        let { selectedNode } = this.state;
    
        if(selectedNode) {
          selectedNode.$selected = false;
        }
    
        node.$selected = true;
    
        this.setState({ selectedNode: node});
    }

    componentWillMount() { // Set the root as the selected node
        this.setSelectedNodeToRoot();
     }

    setSelectedNodeToRoot() {
        this.onSelectNode(this.state.tree);
    }

    render() {
        const { tree, selectedNode } = this.state;

        return <div style={{marginLeft: '50px',    height: "70vh",
        overflow: "hidden",
        overflowY: "scroll",
        paddingRight: '0',
        backgroundColor: "#2c323a"}}><TreeComponent 
        tree={tree}
        selectedNode={selectedNode}
        onSelectNode={this.onSelectNode}
        ></TreeComponent></div>
    }
}

render(<App />, document.getElementById('root'));