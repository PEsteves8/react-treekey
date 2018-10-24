import React from 'react';
import { render } from 'react-dom';
import { TreeKey } from '../../src';

import { setTreeInternalProperties } from '../../src/TreeViewHelpers';
import { treeA } from './data';

class App extends React.Component {
    constructor(props) {
        super(props);

        let setupTree = {...treeA};
        setTreeInternalProperties(setupTree);

        this.state = {
            tree: setupTree,
            selectedNode: null,
            iconsEnabled: true
        };

        this.onSelectNode = this.onSelectNode.bind(this);
    }

    onSelectNode(node) {
        
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
        backgroundColor: "#2c323a"}}><TreeKey 
        tree={tree}
        selectedNode={selectedNode}
        onSelectNode={this.onSelectNode}
        ></TreeKey></div>
    }
}

render(<App />, document.getElementById('root'));