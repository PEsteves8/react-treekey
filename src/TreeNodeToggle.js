import React from 'react';

import styles from './defaultTreeStyles';
import PropTypes from 'prop-types';
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
        let { template, isExpanded } = this.props;
        return template ? template(isExpanded) : defaultToggle(isExpanded);
    }

    render() {
        return <div onClick={this.onClick} style={styles.nodeToggleWrapper}>
                    {this.renderToggle()}
                </div>
     }
}

TreeNodeToggle.propTypes = {
    template: PropTypes.func,
    setToggling: PropTypes.func,
    node: PropTypes.object,
    isExpanded: PropTypes.bool,
};

export default TreeNodeToggle;