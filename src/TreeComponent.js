import React from 'react';

import TreeNode from './TreeNode';
import defaultTreeStyles from './defaultTreeStyles';

import { setTreeInternalProperties } from './TreeViewHelpers';

export class TreeKey extends React.Component {
    constructor(props) {
        super(props);

        this.pristineTree = props.tree;

        this.props.initialExpanded;
        this.props.initalSelected;

        setTreeInternalProperties(props.tree);
        this.state = {
            tree: props.tree
        };
console.log(props.tree);
        this.handleOnKeyDown = this.handleOnKeyDown.bind(this);

        this.setToggling = this.setToggling.bind(this);
        this.selectNewNode = this.selectNewNode.bind(this);

    }
    
    selectNextNode(node) {

        function findLastCollapsedChild(node) {
            if(!node.$lastChild || !node.$expanded) return node;
            else return findLastCollapsedChild(node.$lastChild);
        }

        if(node.$previousNode && node.$previousNode.$expanded && node.$previousNode.$lastChild ) {

            var lastCollapsedChild = findLastCollapsedChild(node.$previousNode);
            this.selectNewNode(lastCollapsedChild);
            
        } else if(node.$previousNode) {
            this.selectNewNode(node.$previousNode);
        } else if (node.$parent) {
            this.selectNewNode(node.$parent);
        } 
    }

    selectPreviousNode(node) {

        function findFirstParentWithNextNode(node) {
            if (!node.$parent) return;
            if(node.$parent && node.$parent.$nextNode) return node.$parent.$nextNode;
            else return findFirstParentWithNextNode(node.$parent);
        }

        if(node.$children && node.$expanded) {
            this.selectNewNode(node.$firstChild);
        } else if (node.$nextNode) {
            this.selectNewNode(node.$nextNode);
        } else if (node.$parent) {
            let firstParentWithNextNode = findFirstParentWithNextNode(node);
            if (firstParentWithNextNode) this.selectNewNode(firstParentWithNextNode);
        } 
    }

    handleOnKeyDown(e) {
        let node = this.props.selectedNode;
        let handlers = {
            ArrowUp: () => this.selectNextNode(node),
            ArrowDown: () => this.selectPreviousNode(node),
            ArrowLeft: () => this.setToggling(node, false),
            ArrowRight: () => this.setToggling(node, true)
        };

        if(handlers[e.key]) {
            e.preventDefault();
            handlers[e.key]();
        }
    }

    selectNewNode(node) {
       this.props.onSelectNode(node, this.selectedNodeEl);
    }

    setToggling(node, shouldExpand) {
        if(typeof shouldExpand === "boolean") {
            node.$expanded = shouldExpand;
        } else {
            node.$expanded = !node.$expanded;
        }
        
        this.setState({ tree: this.state.tree });
    }

    componentWillMount() { // Set the root as the selected node
        this.props.onSelectNode(this.state.tree);
    }

    render() {
        let  style = this.props.styles || defaultTreeStyles;
        let templates = this.props.templates || {};
        let root;
        if(style) {
            root = style.root;
        } 

        return  <ul tabIndex={0}
                    onKeyDown={this.handleOnKeyDown}
                    className="treeview-root"
                    style={root || {}}>
                    <TreeNode selectedNode={this.props.selectedNode} templates={templates} node={this.state.tree} selectNewNode={this.selectNewNode} setToggling={this.setToggling} style={style}/>
                </ul>
    }
}