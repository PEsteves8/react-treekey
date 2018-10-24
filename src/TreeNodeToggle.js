import React from 'react';

import styles from './defaultTreeStyles';

import { defaultToggle } from './TreeViewDefaultTemplates';

class TreeNodeToggle extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.stopPropagation();
        this.props.setToggling(this.props.node);
    }

    renderToggle() {
        let { template, node } = this.props;
        return template ? template(node) : defaultToggle(node);
    }

    render() {
        return <div onClick={this.onClick} style={styles.nodeToggleWrapper}>
                    {this.renderToggle()}
                </div>
     }
}

export default TreeNodeToggle;