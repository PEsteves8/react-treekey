import React from 'react';
import { render } from 'react-dom';
import { TreeKey } from '../../src';

import { setTreeInternalProperties } from '../../src/TreeViewHelpers';
import { treeA, treeB } from './data';

import styles from './styles';

class App extends React.Component {
    constructor(props) {
        super(props);

        let setupTreeA = {...treeA};
        setTreeInternalProperties(setupTreeA);

        let setupTreeB = {...treeB};
        setTreeInternalProperties(setupTreeB);



        this.state = {
            treeA: setupTreeA,
            treeB: setupTreeB,
            selectedNodeA: null,
            selectedNodeB: null
        };

        this.onSelectNodeA = this.onSelectNodeA.bind(this);
        this.onSelectNodeB = this.onSelectNodeB.bind(this);


        this.templates = {
            header(node)  {
                return <span><i className={node.className}></i>&nbsp;{node.name}</span>
            }
        }
    }

    onSelectNodeA(node) {
        
        let { selectedNodeA } = this.state;
    
        if(selectedNodeA) {
          selectedNodeA.$selected = false;
        }
    
        node.$selected = true;
    
        this.setState({ selectedNodeA: node});
    }

    onSelectNodeB(node) {
        
        let { selectedNodeB } = this.state;
    
        if(selectedNodeB) {
          selectedNodeB.$selected = false;
        }
    
        node.$selected = true;
    
        this.setState({ selectedNodeB: node});
    }

    componentWillMount() { // Set the root as the selected node
        this.onSelectNodeA(this.state.treeA); 
        this.onSelectNodeB(this.state.treeB);
    }



    render() {
        const { treeA, treeB, selectedNodeA, selectedNodeB } = this.state;

        return (
            <div>
                <div style={{width: '300px', marginTop: '20px'}}>
                    <h5 style={{textAlign: 'center', marginBottom: 0}}>Standard Example</h5>
                    <br />
                    <div style={styles.treeWrapper}>
                        <TreeKey tree={treeA} selectedNode={selectedNodeA} onSelectNode={this.onSelectNodeA} />
                    </div>
                </div>

                <div style={{width: '300px', marginTop: '20px'}}>
                    <h5 style={{textAlign: 'center', marginBottom: 0}}>File Explorer Example</h5>
                    <br />
                    <div style={styles.treeWrapper}>
                        <TreeKey templates={this.templates} tree={treeB} selectedNode={selectedNodeB} onSelectNode={this.onSelectNodeB} />
                    </div>
                </div>
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));