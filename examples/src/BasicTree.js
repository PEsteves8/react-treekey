import React from 'react';

import { treeA } from './data';

import styles from './styles';

import { TreeKey } from '../../src';

export class BasicTree extends React.Component {
    constructor(props) {
        super(props);

        this.onSelectNode = this.onSelectNode.bind(this);
    }

    onSelectNode(node) {
        console.log(node);
        console.log(treeA);
    }

    render() {
       return  (
                <div style={styles.treeWrapper}>
                    <TreeKey 
                        tree={treeA}
                        onSelectNode={this.onSelectNode} />
                </div>
       );
    }
}