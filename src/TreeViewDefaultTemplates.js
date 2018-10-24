import React from 'react';
import styles from './defaultTreeStyles';

export let defaultToggle = node => {
        const svgStyles = {
             fill: 'white',
             strokeWidth: 0,
             transformOrigin: 'center',
             transform: `rotate(${node.$expanded ? '90deg' : '0'})`
         }

     let { height, width, points } = styles.nodeToggleSvg;

     return <svg height={height} width={width}>
                <polygon points={points} style={svgStyles} />
            </svg>
    }

export let defaultHeader = node => {
    return <span>{node.name}</span>
}