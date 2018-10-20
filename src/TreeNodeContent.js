import React from 'react';

import { defaultHeader } from './TreeViewDefaultTemplates';

export default class TreeListItemContent extends React.Component {

    renderNodeContent() {
        let { template, node } = this.props;
        return template ? template(node) : defaultHeader(node);
    }

    render() {
        return this.renderNodeContent();
    }
}