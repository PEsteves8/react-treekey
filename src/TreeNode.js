import React from 'react';

import TreeNodeContent from './TreeNodeContent';
import TreeNodeToggle from './TreeNodeToggle';

class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.stopPropagation();
        this.props.selectNewNode(this.props.node, e);
    }

    isSelectedNode() {
        if (this.props.selectedNodes) {
            return this.props.selectedNodes(this.props.node);
        } else if (this.props.selectedNode) {
            return this.props.selectedNode === this.props.node;
        }
        
    }

    render() {

        let { style } = this.props;

        let nodeTextStyles;

        let isSelectedNode = this.isSelectedNode();

        if(style) {
            nodeTextStyles = { ...style.node.default };

            if(isSelectedNode) {
                nodeTextStyles = { ...style.node.default, ...style.node.selected };
            }
        }

        return <li onClick={this.onClick}
               className={ `${isSelectedNode ? "treeview-selected-node" : ''}` } >

                <div style={nodeTextStyles || {}}>
                    {this.props.node.$children &&
                        <TreeNodeToggle template={this.props.templates.toggle} setToggling={this.props.setToggling} node={this.props.node} />
                    }
                    <TreeNodeContent template={this.props.templates.header} node={this.props.node} iconsEnabled={this.props.iconsEnabled} />
                </div>

                {this.props.node.$children && this.props.node.$expanded && <ul style={this.props.style.nestedList}> 
                    {this.props.node.$children.map((item, idx) => {
                        return <TreeNode
                                style={this.props.style}
                                node={item}
                                key={idx}
                                selectNewNode={this.props.selectNewNode}
                                setToggling={this.props.setToggling}
                                iconsEnabled={this.props.iconsEnabled}
                                templates={this.props.templates}
                                selectedNode={this.props.selectedNode}
                                selectedNodes={this.props.selectedNodes}
                                />
                    })}
                </ul> }
            </li>
    }
}

export default TreeNode;