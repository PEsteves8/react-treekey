import React from 'react';

import { treeA } from './data';

import styles from './styles';

import { TreeKey } from '../../src';

export class CustomSelectedTree extends React.Component {
    constructor(props) {
        super(props);

        this.onSelectNode = this.onSelectNode.bind(this);
        this.selectedNodes = this.selectedNodes.bind(this);

        this.selectedNodesList = [treeA];
    }

    onSelectNode(node, e) {

        console.log(node.$nextNode);
        if (e.ctrlKey) {
            if (!this.selectedNodesList.includes(node)) {
                this.selectedNodesList.push(node);
            } else {
                this.selectedNodesList = this.selectedNodesList.filter(item => item !== node);
            }

        } else if (e.shiftKey) {
            let breakCycle = false;
            let stepThroughNodes = nextNode => {
                if(breakCycle) return;
                if (nextNode) {
                    if (nextNode === node) {
                        this.selectedNodesList.push(node);
                        breakCycle = true;
                    } else if (this.selectedNodesList.indexOf(nextNode) === -1) {
                        this.selectedNodesList.push(nextNode);
                        if(nextNode.$children && nextNode.$expanded) {
                            stepThroughNodes(nextNode.$children[0]);
                        }
                        stepThroughNodes(nextNode.$nextNode);
                    }
                };
            }
            if(this.lastSelectedNode.$children && this.lastSelectedNode.$expanded) {
                stepThroughNodes(this.lastSelectedNode.$children[0]);
            } else {
                stepThroughNodes(this.lastSelectedNode.$nextNode);
            }
            

        } else {
           
            this.selectedNodesList = [node];
        }
        this.lastSelectedNode = node;

    }

    selectedNodes(node) {
        return this.selectedNodesList.includes(node);
    }

    render() {
        return (
            <div style={styles.treeWrapper}>
                <TreeKey
                    tree={treeA}
                    onSelectNode={this.onSelectNode}
                    selectedNodes={this.selectedNodes}
                />
            </div>
        );
    }
}