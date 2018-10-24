import React from 'react';

import TreeNode from './TreeNode';
import defaultTreeStyles from './defaultTreeStyles';

export class TreeKey extends React.Component {
    constructor(props) {
        super(props);

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
        
        this.setState({ tree: this.props.tree });
    }

    
   
    render() {
        let  style = this.props.styles || defaultTreeStyles;
        let root;
        if(style) {
            root = style.root;
        } 
        
        return  <ul tabIndex={0}
                    onKeyDown={this.handleOnKeyDown}
                    className="treeview-root"
                    style={root || {}}>
                    <TreeNode templates={this.props.templates || {}} node={this.props.tree} iconsEnabled={this.props.iconsEnabled} selectNewNode={this.selectNewNode} setToggling={this.setToggling} style={style}/>
                </ul>
                              
    }
}